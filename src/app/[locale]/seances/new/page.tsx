"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewSeancePage() {
  const t = useTranslations("seances");
  const tCommon = useTranslations("common");
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    classe: "",
    niveau: "",
    sport: "",
    trimestre: "1",
    oti: "", // Objectif Terminal d'Intégration
    objectifCycle: "",
    objectifs: "", // Objectif de la séance
    materiel: "",
    echauffement: "", // Partie préparatoire
    corpsSeance: "", // Partie principale
    retourCalme: "", // Partie finale
    evaluation: "",
    duree: "60",
    lieu: "Terrain"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        trimestre: parseInt(formData.trimestre),
        duree: parseInt(formData.duree),
        objectifs: formData.objectifs.split(",").map(s => s.trim()),
        materiel: formData.materiel.split(",").map(s => s.trim()),
      };
      
      const res = await fetch("/api/seances", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        router.push("/seances");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur de sauvegarde");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Nouvelle Fiche de Préparation</h1>
        <Button variant="outline" onClick={() => router.back()}>
          {tCommon("back")}
        </Button>
      </div>
      
      <Card className="p-6 border-blue-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 space-y-4">
            <h3 className="font-semibold text-blue-800">En-tête de la séance</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input type="date" name="date" value={formData.date} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Trimestre</label>
                <select name="trimestre" value={formData.trimestre} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="1">1er Trimestre</option>
                  <option value="2">2ème Trimestre</option>
                  <option value="3">3ème Trimestre</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Classe</label>
                <Input name="classe" value={formData.classe} onChange={handleChange} required placeholder="Ex: 3ème Math 1" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Activité Sportive</label>
                <Input name="sport" value={formData.sport} onChange={handleChange} required placeholder="Ex: Gymnastique / Athlétisme" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Lieu</label>
                <Input name="lieu" value={formData.lieu} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Matériel Pédagogique</label>
                <Input name="materiel" value={formData.materiel} onChange={handleChange} placeholder="Sifflet, chronomètre, jalons..." />
              </div>
            </div>
          </div>

          <div className="bg-purple-50/50 p-4 rounded-lg border border-purple-100 space-y-4">
            <h3 className="font-semibold text-purple-800">Orientations Pédagogiques (Programme Tunisien)</h3>
            <div className="space-y-2">
              <label className="text-sm font-medium">Objectif Terminal d'Intégration (OTI)</label>
              <textarea name="oti" value={formData.oti} onChange={handleChange} className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Ex: L'élève doit être capable de gérer un effort..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Objectif du Cycle</label>
              <textarea name="objectifCycle" value={formData.objectifCycle} onChange={handleChange} className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Ex: Amélioration de l'endurance aérobie" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Objectif de la Séance</label>
              <Input name="objectifs" value={formData.objectifs} onChange={handleChange} placeholder="Ex: Découverte de la prise d'élan" />
            </div>
          </div>

          <div className="bg-green-50/50 p-4 rounded-lg border border-green-100 space-y-4">
            <h3 className="font-semibold text-green-800">Déroulement de la Séance</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-green-700">1. Partie Préparatoire (Échauffement)</label>
              <p className="text-xs text-muted-foreground">Mise en train, échauffement général et spécifique.</p>
              <textarea name="echauffement" value={formData.echauffement} onChange={handleChange} className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-green-700">2. Partie Principale (Corps de séance)</label>
              <p className="text-xs text-muted-foreground">Situations d'apprentissage, consignes, critères de réussite et remédiation.</p>
              <textarea name="corpsSeance" value={formData.corpsSeance} onChange={handleChange} className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-green-700">3. Partie Finale (Retour au calme)</label>
              <p className="text-xs text-muted-foreground">Récupération, bilan avec les élèves, rangement du matériel.</p>
              <textarea name="retourCalme" value={formData.retourCalme} onChange={handleChange} className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </div>
          </div>

          <Button type="submit" className="w-full text-lg h-12" disabled={loading}>
            {loading ? tCommon("loading") : "Enregistrer la fiche de préparation"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
