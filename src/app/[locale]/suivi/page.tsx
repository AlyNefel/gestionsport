"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, X, Search, FileSignature } from "lucide-react";

interface Eleve {
  _id: string;
  nom: string;
  prenom: string;
  classe: string;
}

export default function SuiviPage() {
  const t = useTranslations("suivi");
  const tCommon = useTranslations("common");
  
  const [eleves, setEleves] = useState<Eleve[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedClasse, setSelectedClasse] = useState("Toutes");
  const [classes, setClasses] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/eleves")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEleves(data.data);
          const uniqueClasses = Array.from(new Set(data.data.map((e: Eleve) => e.classe))) as string[];
          setClasses(["Toutes", ...uniqueClasses]);
        }
        setLoading(false);
      });
  }, []);

  const filteredEleves = eleves.filter(e => 
    (selectedClasse === "Toutes" || e.classe === selectedClasse) &&
    (e.nom.toLowerCase().includes(search.toLowerCase()) || 
     e.prenom.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Suivi et Évaluation Globale</h1>
        <Button><FileSignature className="mr-2 h-4 w-4" /> Bilan Trimestriel</Button>
      </div>
      
      <Card className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder={tCommon("search")} 
              className="pl-8" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select 
            value={selectedClasse}
            onChange={(e) => setSelectedClasse(e.target.value)}
            className="flex h-10 w-full sm:w-48 rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            {classes.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="py-8 text-center">{tCommon("loading")}</div>
        ) : (
          <div className="rounded-md border overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 font-medium">{t("eleve")}</th>
                  <th className="p-3 font-medium">{t("classe")}</th>
                  <th className="p-3 font-medium text-center">Présence/Dispense</th>
                  <th className="p-3 font-medium text-center">Perf/Tech (/15)</th>
                  <th className="p-3 font-medium text-center">Effort (/3)</th>
                  <th className="p-3 font-medium text-center">Comportement (/2)</th>
                  <th className="p-3 font-medium text-center font-bold text-blue-600">Note Globale</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredEleves.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-4 text-center text-muted-foreground">
                      {tCommon("noData")}
                    </td>
                  </tr>
                ) : (
                  filteredEleves.map(eleve => (
                    <tr key={eleve._id} className="hover:bg-muted/50 transition-colors">
                      <td className="p-3 font-medium">{eleve.nom} {eleve.prenom}</td>
                      <td className="p-3 text-muted-foreground">{eleve.classe}</td>
                      <td className="p-3 text-center">
                        <span className="inline-flex items-center text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs">
                          <Check className="w-3 h-3 mr-1" /> Présent
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <Input type="number" min="0" max="15" className="w-20 mx-auto text-center" defaultValue="12" />
                      </td>
                      <td className="p-3 text-center">
                        <Input type="number" min="0" max="3" className="w-16 mx-auto text-center" defaultValue="2" />
                      </td>
                      <td className="p-3 text-center">
                        <Input type="number" min="0" max="2" className="w-16 mx-auto text-center" defaultValue="2" />
                      </td>
                      <td className="p-3 text-center font-bold text-lg text-blue-600">
                        16
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
