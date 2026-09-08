"use client";

import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PreviewSeancePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/seances/${id}`)
      .then(res => res.json())
      .then(res => {
        if (res.success) setData(res.data);
      });
  }, [id]);

  if (!data) return <div className="p-12 text-center">Chargement de l'aperçu...</div>;

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      {/* Barre d'outils (cachée à l'impression) */}
      <div className="flex justify-between items-center max-w-[21cm] mx-auto mb-6 print:hidden">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Retour
        </Button>
        <Button onClick={() => window.print()} className="bg-blue-600 hover:bg-blue-700">
          <Printer className="w-4 h-4 mr-2" /> Imprimer / Sauvegarder PDF
        </Button>
      </div>

      {/* Feuille A4 */}
      <div className="bg-white mx-auto shadow-xl print:shadow-none" style={{ width: "21cm", minHeight: "29.7cm", padding: "1.5cm" }}>
        
        {/* En-tête */}
        <div className="text-center border-b-2 border-black pb-4 mb-6">
          <h1 className="text-xl font-bold uppercase tracking-widest">Fiche de Préparation Pédagogique</h1>
          <h2 className="text-sm font-semibold uppercase text-slate-700 mt-1">Ministère de l'Éducation - Tunisie</h2>
        </div>

        {/* Infos Globales */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm border p-4 rounded-sm">
          <div><span className="font-bold">Professeur :</span> .........................</div>
          <div><span className="font-bold">Établissement :</span> .........................</div>
          <div><span className="font-bold">Activité Sportive :</span> {data.sport}</div>
          <div><span className="font-bold">Classe :</span> {data.classe}</div>
          <div><span className="font-bold">Date :</span> {new Date(data.date).toLocaleDateString('fr-FR')}</div>
          <div><span className="font-bold">Durée :</span> {data.duree} min</div>
          <div className="col-span-2"><span className="font-bold">Matériel :</span> {data.materiel?.join(", ")}</div>
        </div>

        {/* Orientations */}
        <div className="mb-6">
          <div className="border border-black">
            <div className="bg-slate-100 p-2 border-b border-black font-bold text-sm text-center">Orientations Pédagogiques</div>
            <div className="p-3 text-sm space-y-3">
              <p><span className="font-bold underline">Objectif Terminal d'Intégration (OTI) :</span> {data.oti}</p>
              <p><span className="font-bold underline">Objectif du cycle :</span> {data.objectifCycle}</p>
              <p><span className="font-bold underline">Objectif de la séance :</span> {data.objectifs?.join(", ")}</p>
            </div>
          </div>
        </div>

        {/* Déroulement */}
        <div className="mb-6">
          <table className="w-full border-collapse border border-black text-sm">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-black p-2 w-1/4">Phases / Durée</th>
                <th className="border border-black p-2">Situations et Déroulement</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black p-3 font-bold text-center align-top">
                  Partie Préparatoire<br/><span className="text-xs font-normal">(10-15 min)</span>
                </td>
                <td className="border border-black p-3 whitespace-pre-wrap">{data.echauffement}</td>
              </tr>
              <tr>
                <td className="border border-black p-3 font-bold text-center align-top">
                  Partie Principale<br/><span className="text-xs font-normal">(40 min)</span>
                </td>
                <td className="border border-black p-3 whitespace-pre-wrap">{data.corpsSeance}</td>
              </tr>
              <tr>
                <td className="border border-black p-3 font-bold text-center align-top">
                  Partie Finale<br/><span className="text-xs font-normal">(5 min)</span>
                </td>
                <td className="border border-black p-3 whitespace-pre-wrap">{data.retourCalme}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Evaluation / Bilan */}
        <div className="mb-8 border border-black p-3 text-sm">
          <span className="font-bold">Évaluation / Bilan de la séance :</span>
          <p className="mt-2 min-h-[40px] italic">{data.evaluation || "......................................................................................................"}</p>
        </div>

        {/* Signatures */}
        <div className="flex justify-between mt-12 text-sm px-10">
          <div className="text-center font-bold">L'Inspecteur Pédagogique</div>
          <div className="text-center font-bold">Le Professeur</div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { background: white; }
          .print\\:hidden { display: none !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          @page { margin: 0; }
        }
      `}} />
    </div>
  );
}
