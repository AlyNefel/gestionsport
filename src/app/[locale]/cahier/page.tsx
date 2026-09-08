"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Printer, BookOpen } from "lucide-react";

export default function CahierClassePage() {
  const t = useTranslations("common");

  const [header, setHeader] = useState({
    annee: "2026 / 2027",
    classe: "9ème Année de Base",
    activite: "Handball / 1er Trimestre"
  });

  const [students, setStudents] = useState<string[]>(Array(35).fill(""));

  const updateStudent = (index: number, name: string) => {
    const newStudents = [...students];
    newStudents[index] = name;
    setStudents(newStudents);
  };

  const handlePrint = () => {
    window.print();
  };

  // Generate 12 columns for sessions/dates
  const sessionCols = Array.from({ length: 12 });

  return (
    <div className="space-y-6 p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl border border-orange-100 dark:border-orange-800 print:hidden">
        <div className="flex items-center gap-3">
          <div className="bg-orange-500 p-2 rounded-lg text-white">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-orange-900 dark:text-orange-100">Cahier de Classe Imprimable</h1>
            <p className="text-sm text-orange-700 dark:text-orange-300">Remplissez en ligne ou imprimez vierge (feuille d'appel & évaluation)</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={handlePrint} className="bg-orange-600 hover:bg-orange-700 text-white shadow-md">
            <Printer className="mr-2 h-4 w-4" />
            Imprimer / PDF
          </Button>
        </div>
      </div>

      <div className="text-sm text-muted-foreground print:hidden mb-4 italic">
        Astuce : Vous pouvez taper directement dans les cases ci-dessous (noms des élèves, classe, etc.) avant d'imprimer. 
        Pour une meilleure impression, choisissez l'orientation "Paysage" et marges "Minimum".
      </div>

      {/* Zone imprimable (A4 Paysage recommandé) */}
      <div className="bg-white mx-auto shadow-xl print:shadow-none text-black" style={{ width: "29.7cm", minHeight: "21cm", padding: "1cm" }} id="print-area">
        
        <div className="flex justify-between items-end border-b-2 border-black pb-2 mb-4">
          <div>
            <h2 className="font-bold text-xl uppercase tracking-wide">Cahier d'Évaluation Continue et d'Appel</h2>
            <h3 className="font-semibold text-sm">Éducation Physique et Sportive</h3>
          </div>
          <div className="text-right text-sm space-y-1">
            <div className="flex justify-end gap-2 items-center">
              <strong>Année Scolaire :</strong>
              <input value={header.annee} onChange={(e) => setHeader({ ...header, annee: e.target.value })} className="border-b border-dashed border-slate-400 outline-none w-32 text-right bg-transparent" />
            </div>
            <div className="flex justify-end gap-2 items-center">
              <strong>Classe :</strong>
              <input value={header.classe} onChange={(e) => setHeader({ ...header, classe: e.target.value })} className="border-b border-dashed border-slate-400 outline-none w-48 text-right bg-transparent" />
            </div>
            <div className="flex justify-end gap-2 items-center">
              <strong>Activité / Trimestre :</strong>
              <input value={header.activite} onChange={(e) => setHeader({ ...header, activite: e.target.value })} className="border-b border-dashed border-slate-400 outline-none w-48 text-right bg-transparent" />
            </div>
          </div>
        </div>

        <table className="w-full border-collapse border border-black text-xs">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-black p-1 w-8 text-center" rowSpan={2}>N°</th>
              <th className="border border-black p-1 w-56 text-left" rowSpan={2}>Nom et Prénom</th>
              <th className="border border-black p-1 text-center" colSpan={sessionCols.length}>Appel (A: Absent / P: Présent / D: Dispensé / T: Tenue)</th>
              <th className="border border-black p-1 text-center bg-slate-200" colSpan={3}>Évaluation Continue</th>
            </tr>
            <tr className="bg-slate-50">
              {sessionCols.map((_, i) => (
                <th key={i} className="border border-black p-1 w-8 h-8 text-center font-normal text-[10px]" title={`Séance ${i+1}`}>
                  <input placeholder={`S${i+1}`} className="w-full text-center bg-transparent outline-none border-none" />
                </th>
              ))}
              <th className="border border-black p-1 w-12 text-center text-[10px]">Perf (15)</th>
              <th className="border border-black p-1 w-12 text-center text-[10px]">Effort (3)</th>
              <th className="border border-black p-1 w-12 text-center text-[10px]">Comp. (2)</th>
            </tr>
          </thead>
          <tbody>
            {students.map((name, rowIndex) => (
              <tr key={rowIndex}>
                <td className="border border-black p-0 text-center text-slate-500">{rowIndex + 1}</td>
                <td className="border border-black p-0">
                  <input 
                    value={name} 
                    onChange={(e) => updateStudent(rowIndex, e.target.value)}
                    className="w-full h-full p-1 bg-transparent outline-none border-none font-medium"
                    placeholder=".........................................."
                  />
                </td>
                {sessionCols.map((_, colIndex) => (
                  <td key={colIndex} className="border border-black p-1 text-center"></td>
                ))}
                <td className="border border-black p-1 bg-slate-50"></td>
                <td className="border border-black p-1 bg-slate-50"></td>
                <td className="border border-black p-1 bg-slate-50"></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex justify-between text-xs">
          <div>
            <p><strong>Rappels du barème :</strong> Performance et Technique (/15), Effort et Participation (/3), Comportement (/2).</p>
          </div>
          <div className="font-bold">
            Signature du Professeur : 
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { background: white; }
          .print\\:hidden { display: none !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          @page { size: landscape; margin: 0.5cm; }
          input::placeholder { color: transparent; }
        }
      `}} />
    </div>
  );
}
