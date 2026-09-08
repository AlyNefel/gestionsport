"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Printer, Download, Map } from "lucide-react";

export default function ProgrammePage() {
  const handlePrint = () => {
    window.print();
  };

  const [header, setHeader] = useState({
    classe: "9ème Année de Base",
    etablissement: "Lycée / Collège",
    professeur: "Nom du Professeur",
    annee: "2026/2027",
  });

  const [cycles, setCycles] = useState([
    { trimestre: "1er Trimestre", activite: "Athlétisme", duree: "8 Séances", oti: "Gérer l'effort sur des distances variées." },
    { trimestre: "1er Trimestre", activite: "Gymnastique", duree: "8 Séances", oti: "Enchaîner 4 éléments gymniques au sol." },
    { trimestre: "2ème Trimestre", activite: "Handball", duree: "10 Séances", oti: "S'intégrer dans le jeu collectif (passe et va)." },
    { trimestre: "3ème Trimestre", activite: "Saut en longueur", duree: "8 Séances", oti: "Coordonner course d'élan et appel." },
    { trimestre: "3ème Trimestre", activite: "Volleyball", duree: "8 Séances", oti: "Maîtriser la manchette et le placement." },
  ]);

  const updateHeader = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeader({ ...header, [e.target.name]: e.target.value });
  };

  const updateCycle = (index: number, field: string, value: string) => {
    const newCycles = [...cycles];
    newCycles[index] = { ...newCycles[index], [field]: value };
    setCycles(newCycles);
  };

  const addCycle = () => {
    setCycles([...cycles, { trimestre: "", activite: "", duree: "", oti: "" }]);
  };

  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center bg-teal-50 dark:bg-teal-900/20 p-4 rounded-xl border border-teal-100 dark:border-teal-800 print:hidden">
        <div className="flex items-center gap-3">
          <div className="bg-teal-500 p-2 rounded-lg text-white">
            <Map className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-teal-900 dark:text-teal-100">Progression Annuelle (Cahier de Programme)</h1>
            <p className="text-sm text-teal-700 dark:text-teal-300">Modèle officiel tunisien modifiable et imprimable</p>
          </div>
        </div>
        <Button onClick={handlePrint} className="bg-teal-600 hover:bg-teal-700 text-white shadow-md">
          <Printer className="mr-2 h-4 w-4" />
          Imprimer / Télécharger PDF
        </Button>
      </div>

      <div className="grid md:grid-cols-[300px_1fr] gap-6">
        {/* Panneau de modification */}
        <Card className="p-4 print:hidden border-slate-200">
          <h2 className="font-bold mb-4 border-b pb-2">Modifier l'En-tête</h2>
          <div className="space-y-3 mb-6">
            <div>
              <label className="text-xs font-semibold text-slate-500">Classe / Niveau</label>
              <Input name="classe" value={header.classe} onChange={updateHeader} className="h-8" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">Établissement</label>
              <Input name="etablissement" value={header.etablissement} onChange={updateHeader} className="h-8" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">Professeur</label>
              <Input name="professeur" value={header.professeur} onChange={updateHeader} className="h-8" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">Année Scolaire</label>
              <Input name="annee" value={header.annee} onChange={updateHeader} className="h-8" />
            </div>
          </div>

          <h2 className="font-bold mb-4 border-b pb-2">Cycles (Ajout rapide)</h2>
          <Button variant="outline" className="w-full text-xs" onClick={addCycle}>+ Ajouter un cycle</Button>
        </Card>

        {/* Zone Imprimable */}
        <Card className="p-8 border-slate-200 bg-white text-black print:shadow-none print:border-none print:p-0" id="print-area">
          <div className="text-center mb-8 border-b-2 border-black pb-4">
            <h2 className="font-bold text-xl uppercase tracking-wider">République Tunisienne</h2>
            <h3 className="font-semibold text-sm uppercase">Ministère de l'Éducation</h3>
          </div>

          <h1 className="text-center text-2xl font-bold uppercase underline mb-8">Progression Annuelle - Éducation Physique</h1>

          <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
            <p><strong>Établissement :</strong> {header.etablissement}</p>
            <p><strong>Année Scolaire :</strong> {header.annee}</p>
            <p><strong>Classe(s) / Niveau :</strong> {header.classe}</p>
            <p><strong>Professeur(e) :</strong> {header.professeur}</p>
          </div>

          <table className="w-full border-collapse border border-black text-sm">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-black p-2 w-1/5">Trimestre</th>
                <th className="border border-black p-2 w-1/5">Activité (Cycle)</th>
                <th className="border border-black p-2 w-1/6">Durée (Séances)</th>
                <th className="border border-black p-2">Objectif Terminal d'Intégration (OTI)</th>
              </tr>
            </thead>
            <tbody>
              {cycles.map((cycle, i) => (
                <tr key={i}>
                  <td className="border border-black p-0">
                    <input 
                      value={cycle.trimestre} 
                      onChange={(e) => updateCycle(i, "trimestre", e.target.value)}
                      className="w-full h-full p-2 outline-none border-none bg-transparent"
                    />
                  </td>
                  <td className="border border-black p-0">
                    <input 
                      value={cycle.activite} 
                      onChange={(e) => updateCycle(i, "activite", e.target.value)}
                      className="w-full h-full p-2 outline-none border-none bg-transparent"
                    />
                  </td>
                  <td className="border border-black p-0 text-center">
                    <input 
                      value={cycle.duree} 
                      onChange={(e) => updateCycle(i, "duree", e.target.value)}
                      className="w-full h-full p-2 outline-none border-none bg-transparent text-center"
                    />
                  </td>
                  <td className="border border-black p-0">
                    <textarea 
                      value={cycle.oti} 
                      onChange={(e) => updateCycle(i, "oti", e.target.value)}
                      className="w-full h-full p-2 outline-none border-none bg-transparent resize-none overflow-hidden min-h-[60px]"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between mt-16 px-10 text-sm">
            <div className="text-center">
              <p className="font-bold underline mb-10">L'Inspecteur Pédagogique</p>
            </div>
            <div className="text-center">
              <p className="font-bold underline mb-10">Le Professeur</p>
            </div>
          </div>
        </Card>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * { visibility: hidden; }
          #print-area, #print-area * { visibility: visible; }
          #print-area { position: absolute; left: 0; top: 0; width: 100%; margin: 0; padding: 2cm 1cm; }
          @page { margin: 0; size: A4 portrait; }
        }
      `}} />
    </div>
  );
}
