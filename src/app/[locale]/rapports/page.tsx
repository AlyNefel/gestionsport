"use client";

import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown, Printer, ClipboardList, BarChart3 } from "lucide-react";

export default function RapportsPage() {
  const tCommon = useTranslations("common");

  const handlePrint = () => window.print();

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Rapports & Export (Programme Tunisien)</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6 flex flex-col items-center text-center space-y-4 hover:shadow-lg transition-shadow">
          <div className="p-4 bg-blue-100 text-blue-600 rounded-full dark:bg-blue-900/50">
            <FileDown className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-semibold">Daftar Complet</h2>
          <p className="text-muted-foreground text-sm">Cahier pédagogique complet (Jadhouel Awkat, objectifs, progression annuelle).</p>
          <Button onClick={handlePrint} className="w-full">Exporter PDF</Button>
        </Card>
        <Card className="p-6 flex flex-col items-center text-center space-y-4 hover:shadow-lg transition-shadow">
          <div className="p-4 bg-green-100 text-green-600 rounded-full dark:bg-green-900/50">
            <Printer className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-semibold">Fiches de Préparation</h2>
          <p className="text-muted-foreground text-sm">Modèle officiel tunisien : Objectif de cycle, Objectif de séance, Situations pédagogiques.</p>
          <Button variant="secondary" onClick={handlePrint} className="w-full">Imprimer Fiches</Button>
        </Card>
        <Card className="p-6 flex flex-col items-center text-center space-y-4 hover:shadow-lg transition-shadow">
          <div className="p-4 bg-purple-100 text-purple-600 rounded-full dark:bg-purple-900/50">
            <ClipboardList className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-semibold">Feuilles d'Appel & Dispenses</h2>
          <p className="text-muted-foreground text-sm">Suivi des absences (A) et des dispenses médicales (D).</p>
          <Button variant="outline" onClick={handlePrint} className="w-full">Générer PDF</Button>
        </Card>
        <Card className="p-6 flex flex-col items-center text-center space-y-4 hover:shadow-lg transition-shadow">
          <div className="p-4 bg-orange-100 text-orange-600 rounded-full dark:bg-orange-900/50">
            <BarChart3 className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-semibold">Fiche d'Évaluation</h2>
          <p className="text-muted-foreground text-sm">Critères d'évaluation selon le barème officiel : Comportement (2 pts), Effort (3 pts), Perf/Tech (15 pts).</p>
          <Button variant="outline" onClick={handlePrint} className="w-full">Générer PDF</Button>
        </Card>
      </div>
    </div>
  );
}
