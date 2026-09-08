"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SetupPage() {
  const t = useTranslations("setup");
  const tCommon = useTranslations("common");
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    etablissement: "",
    grade: "",
    anneeScol: "2026/2027",
  });

  useEffect(() => {
    fetch("/api/setup")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setFormData({
            nom: data.data.nom || "",
            prenom: data.data.prenom || "",
            etablissement: data.data.etablissement || "",
            grade: data.data.grade || "",
            anneeScol: data.data.anneeScol || "2026/2027",
          });
        }
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Configuration sauvegardée !");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur de sauvegarde");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2 mb-4">{t("prof")}</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("nom")}</label>
              <Input name="nom" value={formData.nom} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("prenom")}</label>
              <Input name="prenom" value={formData.prenom} onChange={handleChange} required />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">{t("etablissement")}</label>
            <Input name="etablissement" value={formData.etablissement} onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("grade")}</label>
              <Input name="grade" value={formData.grade} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("anneeScol")}</label>
              <Input name="anneeScol" value={formData.anneeScol} onChange={handleChange} required />
            </div>
          </div>

          <Button type="submit" className="w-full mt-6" disabled={loading}>
            {loading ? tCommon("loading") : tCommon("save")}
          </Button>
        </form>
      </Card>
    </div>
  );
}
