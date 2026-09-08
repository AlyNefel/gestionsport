"use client";

import { useTranslations, useLocale } from "next-intl";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Edit, Trash2, FileText } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Seance {
  _id: string;
  date: string;
  classe: string;
  sport: string;
  objectifs: string[];
}

export default function SeancesPage() {
  const t = useTranslations("seances");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  
  const [seances, setSeances] = useState<Seance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/seances")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setSeances(data.data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm(tCommon("confirm"))) return;
    try {
      await fetch(`/api/seances/${id}`, { method: "DELETE" });
      setSeances(seances.filter(s => s._id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
        <div>
          <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-100">Fiches de Préparation</h1>
          <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">Gérez vos séances selon le programme officiel tunisien</p>
        </div>
        <Link href={`/${locale}/seances/new`}>
          <Button size="lg" className="shadow-md">
            <Plus className="mr-2 h-5 w-5" />
            Créer une Fiche
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center p-12 text-muted-foreground">{tCommon("loading")}</div>
      ) : seances.length === 0 ? (
        <Card className="p-16 text-center border-dashed border-2">
          <div className="mx-auto bg-muted w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium mb-2">Aucune fiche de préparation</h3>
          <p className="text-muted-foreground mb-6">Commencez par créer votre première fiche de séance.</p>
          <Link href={`/${locale}/seances/new`}>
            <Button>Créer ma première fiche</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {seances.map((seance) => (
            <Card key={seance._id} className="p-5 flex flex-col justify-between hover:shadow-lg transition-all border-l-4 border-l-blue-500">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg">{seance.sport}</h3>
                  <span className="font-mono text-sm bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md shadow-sm border">
                    {seance.classe}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground mb-4 font-medium flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formatDate(seance.date)}
                </div>
                <div className="text-sm space-y-2 mb-4 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-md border border-slate-100 dark:border-slate-800">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Objectif de séance :</span>
                  <ul className="text-slate-600 dark:text-slate-400">
                    {seance.objectifs?.map((obj, i) => (
                      <li key={i} className="line-clamp-2 leading-relaxed">
                        • {obj}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t mt-2">
                <Link href={`/${locale}/seances/${seance._id}/preview`}>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                    <FileText className="h-4 w-4 mr-2" /> Aperçu PDF
                  </Button>
                </Link>
                <div className="flex gap-1">
                  <Link href={`/${locale}/seances/${seance._id}`}>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4 text-slate-600" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(seance._id)} className="h-8 w-8 p-0 border-red-200 hover:bg-red-50 hover:text-red-600">
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}
