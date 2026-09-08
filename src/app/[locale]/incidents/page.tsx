"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { AlertTriangle, Printer, Download, Save } from "lucide-react";

export default function IncidentsPage() {
  const t = useTranslations("common");
  
  // Draft default content (Tunisian standard format)
  const [report, setReport] = useState({
    date: new Date().toISOString().split('T')[0],
    heure: "10:00",
    etablissement: "Lycée / Collège ...",
    professeur: "M. / Mme ...",
    eleve: "Nom et Prénom de l'élève",
    classe: "9ème Année de Base",
    lieu: "Terrain de sport / Cour de l'établissement",
    circonstances: "Pendant l'échauffement / Lors d'un exercice de gymnastique...",
    nature: "Entorse à la cheville droite suite à une mauvaise réception.",
    temoins: "Élève 1, Élève 2",
    mesures: "Arrêt immédiat de l'activité. Application de glace. Appel à la direction et transfert à l'infirmerie / urgences."
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-100 dark:border-red-800">
        <div className="flex items-center gap-3">
          <div className="bg-red-500 p-2 rounded-lg text-white">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-red-900 dark:text-red-100">Rapport d'Accident Scolaire</h1>
            <p className="text-sm text-red-700 dark:text-red-300">Modèle officiel modifiable - Ministère de l'Éducation Tunisien</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={handlePrint} variant="outline" className="bg-white border-red-200 text-red-700 hover:bg-red-50">
            <Printer className="mr-2 h-4 w-4" />
            Imprimer
          </Button>
          <Button onClick={handlePrint} className="bg-red-600 hover:bg-red-700 text-white shadow-md">
            <Download className="mr-2 h-4 w-4" />
            Télécharger PDF
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Formulaire de modification */}
        <Card className="p-6 border-slate-200 shadow-sm print:hidden">
          <h2 className="text-lg font-bold mb-4 flex items-center"><EditIcon className="w-5 h-5 mr-2 text-slate-500"/> Modifier le Brouillon (Draft)</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase">Établissement</label>
                <Input name="etablissement" value={report.etablissement} onChange={handleChange} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase">Professeur</label>
                <Input name="professeur" value={report.professeur} onChange={handleChange} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase">Élève concerné</label>
                <Input name="eleve" value={report.eleve} onChange={handleChange} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase">Classe</label>
                <Input name="classe" value={report.classe} onChange={handleChange} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase">Date</label>
                <Input type="date" name="date" value={report.date} onChange={handleChange} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase">Heure</label>
                <Input type="time" name="heure" value={report.heure} onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase">Lieu exact</label>
              <Input name="lieu" value={report.lieu} onChange={handleChange} />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase">Circonstances de l'accident</label>
              <textarea name="circonstances" value={report.circonstances} onChange={handleChange} className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase">Nature de la blessure / Dégâts</label>
              <textarea name="nature" value={report.nature} onChange={handleChange} className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase">Mesures prises (Secours)</label>
              <textarea name="mesures" value={report.mesures} onChange={handleChange} className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase">Témoins</label>
              <Input name="temoins" value={report.temoins} onChange={handleChange} />
            </div>
            
            <Button className="w-full mt-2" variant="secondary"><Save className="w-4 h-4 mr-2"/> Sauvegarder ce brouillon</Button>
          </div>
        </Card>

        {/* Aperçu pour Impression */}
        <Card className="p-8 border-slate-200 shadow-lg bg-white text-black print:shadow-none print:border-none print:p-0" id="print-area">
          <div className="text-center mb-8 border-b-2 border-black pb-4">
            <h2 className="font-bold text-xl uppercase">République Tunisienne</h2>
            <h3 className="font-semibold text-lg">Ministère de l'Éducation</h3>
            <div className="mt-4 text-left">
              <p><strong>Établissement :</strong> <span className="border-b border-dotted border-slate-400 inline-block w-64">{report.etablissement}</span></p>
            </div>
          </div>

          <h1 className="text-center text-2xl font-bold uppercase underline mb-8 tracking-wide">Rapport d'Accident Scolaire</h1>

          <div className="space-y-6 text-base leading-relaxed">
            <p>
              Je soussigné(e), <strong>{report.professeur}</strong>, professeur d'Éducation Physique et Sportive, déclare que l'élève <strong>{report.eleve}</strong> inscrit(e) en classe de <strong>{report.classe}</strong> a été victime d'un accident lors de la séance d'EPS.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <p><strong>Date de l'accident :</strong> {new Date(report.date).toLocaleDateString('fr-FR')}</p>
              <p><strong>Heure exacte :</strong> {report.heure}</p>
            </div>

            <p><strong>Lieu de l'accident :</strong> {report.lieu}</p>

            <div className="bg-slate-50 p-4 border rounded-md">
              <h4 className="font-bold mb-2">1. Circonstances de l'accident :</h4>
              <p className="min-h-[60px]">{report.circonstances}</p>
            </div>

            <div className="bg-slate-50 p-4 border rounded-md">
              <h4 className="font-bold mb-2">2. Nature apparente de la blessure :</h4>
              <p className="min-h-[40px]">{report.nature}</p>
            </div>

            <div className="bg-slate-50 p-4 border rounded-md">
              <h4 className="font-bold mb-2">3. Premiers soins et mesures prises :</h4>
              <p className="min-h-[40px]">{report.mesures}</p>
            </div>

            <p><strong>Témoins de l'accident :</strong> {report.temoins}</p>

            <div className="mt-12 flex justify-between">
              <div className="text-center">
                <p className="font-bold mb-8">Le Directeur</p>
                <p className="text-sm text-slate-500">(Cachet et signature)</p>
              </div>
              <div className="text-center">
                <p className="font-bold mb-8">Le Professeur (Auteur du rapport)</p>
                <p className="text-sm text-slate-500">(Signature)</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * { visibility: hidden; }
          #print-area, #print-area * { visibility: visible; }
          #print-area { position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}} />
    </div>
  );
}

function EditIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>;
}
