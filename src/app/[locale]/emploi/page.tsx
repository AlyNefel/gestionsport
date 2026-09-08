"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { toast } from "sonner";
import { Plus, X, Printer, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const JOURS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const HEURES = [
  "07:00", "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
];

const CLASSES_TUNISIE = [
  "7ème Année de Base", "8ème Année de Base", "9ème Année de Base",
  "1ère Année Secondaire", "2ème Année Secondaire", "3ème Année Secondaire", "4ème Année Secondaire",
  "2ème Sciences Exp.", "3ème Math", "4ème Lettres",
];

const COULEURS: Record<string, string> = {
  "7ème Année de Base": "bg-blue-100 border-blue-400 text-blue-800",
  "8ème Année de Base": "bg-green-100 border-green-400 text-green-800",
  "9ème Année de Base": "bg-purple-100 border-purple-400 text-purple-800",
  "1ère Année Secondaire": "bg-orange-100 border-orange-400 text-orange-800",
  "2ème Année Secondaire": "bg-rose-100 border-rose-400 text-rose-800",
  "3ème Année Secondaire": "bg-teal-100 border-teal-400 text-teal-800",
  "4ème Année Secondaire": "bg-indigo-100 border-indigo-400 text-indigo-800",
};

function getColor(classe: string) {
  return COULEURS[classe] || "bg-slate-100 border-slate-400 text-slate-800";
}

interface EmploiEntry {
  _id: string;
  jour: string;
  heureDebut: string;
  heureFin: string;
  classe: string;
  seanceId?: { sport: string; objectifs: string[] } | null;
}

interface Seance {
  _id: string;
  sport: string;
  classe: string;
  objectifs: string[];
}

interface ModalState {
  open: boolean;
  jour: string;
  heureDebut: string;
  heureFin: string;
  classe: string;
  seanceId: string;
}

export default function EmploiPage() {
  const locale = useLocale();
  const [emplois, setEmplois] = useState<EmploiEntry[]>([]);
  const [seances, setSeances] = useState<Seance[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<ModalState>({
    open: false, jour: "Lundi", heureDebut: "08:00",
    heureFin: "10:00", classe: CLASSES_TUNISIE[0], seanceId: ""
  });

  useEffect(() => {
    Promise.all([
      fetch("/api/emploi").then(r => r.json()),
      fetch("/api/seances").then(r => r.json())
    ]).then(([e, s]) => {
      if (e.success) setEmplois(e.data);
      if (s.success) setSeances(s.data);
      setLoading(false);
    });
  }, []);

  const getEmploiForCell = (jour: string, heure: string) =>
    emplois.filter(e => e.jour === jour && e.heureDebut === heure);

  const handleAdd = async () => {
    try {
      const res = await fetch("/api/emploi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jour: modal.jour,
          heureDebut: modal.heureDebut,
          heureFin: modal.heureFin,
          classe: modal.classe,
          seanceId: modal.seanceId || undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        // Reload all to get populated seanceId
        const fresh = await fetch("/api/emploi").then(r => r.json());
        if (fresh.success) setEmplois(fresh.data);
        toast.success("Séance ajoutée à l'emploi du temps !");
        setModal(m => ({ ...m, open: false }));
      }
    } catch {
      toast.error("Erreur lors de l'ajout");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/emploi/${id}`, { method: "DELETE" });
      setEmplois(emplois.filter(e => e._id !== id));
      toast.success("Supprimé");
    } catch {
      toast.error("Erreur de suppression");
    }
  };

  const openModal = (jour: string, heure: string) => {
    const nextHeure = HEURES[HEURES.indexOf(heure) + 2] || "10:00";
    setModal({ open: true, jour, heureDebut: heure, heureFin: nextHeure, classe: CLASSES_TUNISIE[0], seanceId: "" });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white print:hidden shrink-0">
        <div>
          <h1 className="text-2xl font-bold">📅 Emploi du Temps</h1>
          <p className="text-blue-100 text-sm mt-0.5">Gérez vos créneaux par classe et par jour</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => window.print()}
            variant="outline"
            className="border-white text-white hover:bg-white/20 hover:text-white bg-transparent"
          >
            <Printer className="mr-2 h-4 w-4" /> Imprimer
          </Button>
          <Button
            onClick={() => setModal(m => ({ ...m, open: true }))}
            className="bg-white text-blue-700 hover:bg-blue-50 font-bold"
          >
            <Plus className="mr-2 h-4 w-4" /> Ajouter un créneau
          </Button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-2 px-5 py-2 overflow-x-auto shrink-0 border-b bg-white dark:bg-slate-900 print:hidden">
        {CLASSES_TUNISIE.slice(0,6).map(c => (
          <span key={c} className={`text-xs px-2 py-1 rounded-full border font-medium whitespace-nowrap ${getColor(c)}`}>{c}</span>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center text-slate-400 text-lg">Chargement...</div>
      ) : (
        <div className="flex-1 overflow-auto p-4">
          <div className="min-w-[900px]">
            {/* Header row */}
            <div className="grid grid-cols-[80px_repeat(6,1fr)] gap-1 mb-1">
              <div className="bg-slate-100 dark:bg-slate-800 rounded p-2 text-center text-xs font-bold text-slate-500"></div>
              {JOURS.map(jour => (
                <div key={jour} className="bg-blue-600 text-white rounded-lg p-2 text-center font-bold text-sm shadow">
                  {jour}
                </div>
              ))}
            </div>

            {/* Time rows */}
            {HEURES.map((heure, hIdx) => (
              <div key={heure} className="grid grid-cols-[80px_repeat(6,1fr)] gap-1 mb-1">
                {/* Time label */}
                <div className="bg-slate-100 dark:bg-slate-800 rounded p-2 text-center text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center justify-center">
                  {heure}
                </div>

                {/* Day cells */}
                {JOURS.map(jour => {
                  const entries = getEmploiForCell(jour, heure);
                  return (
                    <div
                      key={jour}
                      className={`rounded-lg min-h-[70px] transition-all ${
                        entries.length === 0
                          ? "bg-slate-50 dark:bg-slate-800/50 border border-dashed border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:border-blue-300 cursor-pointer group"
                          : "space-y-1"
                      }`}
                      onClick={entries.length === 0 ? () => openModal(jour, heure) : undefined}
                    >
                      {entries.length === 0 ? (
                        <div className="h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Plus className="h-4 w-4 text-blue-400" />
                        </div>
                      ) : (
                        entries.map(entry => (
                          <div
                            key={entry._id}
                            className={`p-2 rounded-lg border-l-4 relative group ${getColor(entry.classe)}`}
                          >
                            <button
                              onClick={() => handleDelete(entry._id)}
                              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs hover:bg-red-600"
                            >
                              <X className="h-2.5 w-2.5" />
                            </button>
                            <div className="font-bold text-xs leading-tight pr-4">{entry.classe}</div>
                            {entry.seanceId && (
                              <div className="text-xs mt-0.5 opacity-80">🏃 {entry.seanceId.sport}</div>
                            )}
                            <div className="text-xs opacity-60 flex items-center gap-0.5 mt-0.5">
                              <Clock className="h-2.5 w-2.5" />
                              {entry.heureDebut} → {entry.heureFin}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 print:hidden">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Nouveau Créneau</h2>
              <button onClick={() => setModal(m => ({ ...m, open: false }))} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-slate-600 block mb-1">Jour</label>
                  <select
                    value={modal.jour}
                    onChange={e => setModal(m => ({ ...m, jour: e.target.value }))}
                    className="w-full rounded-lg border border-slate-200 p-2.5 text-sm bg-white dark:bg-slate-800"
                  >
                    {JOURS.map(j => <option key={j}>{j}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-600 block mb-1">Classe</label>
                  <select
                    value={modal.classe}
                    onChange={e => setModal(m => ({ ...m, classe: e.target.value }))}
                    className="w-full rounded-lg border border-slate-200 p-2.5 text-sm bg-white dark:bg-slate-800"
                  >
                    {CLASSES_TUNISIE.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-slate-600 block mb-1">Heure début</label>
                  <select
                    value={modal.heureDebut}
                    onChange={e => setModal(m => ({ ...m, heureDebut: e.target.value }))}
                    className="w-full rounded-lg border border-slate-200 p-2.5 text-sm bg-white dark:bg-slate-800"
                  >
                    {HEURES.map(h => <option key={h}>{h}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-600 block mb-1">Heure fin</label>
                  <select
                    value={modal.heureFin}
                    onChange={e => setModal(m => ({ ...m, heureFin: e.target.value }))}
                    className="w-full rounded-lg border border-slate-200 p-2.5 text-sm bg-white dark:bg-slate-800"
                  >
                    {HEURES.map(h => <option key={h}>{h}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-600 block mb-1">
                  Associer une fiche de séance (optionnel)
                </label>
                <select
                  value={modal.seanceId}
                  onChange={e => setModal(m => ({ ...m, seanceId: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 p-2.5 text-sm bg-white dark:bg-slate-800"
                >
                  <option value="">-- Aucune séance associée --</option>
                  {seances.map(s => (
                    <option key={s._id} value={s._id}>
                      {s.sport} · {s.classe}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1" onClick={() => setModal(m => ({ ...m, open: false }))}>
                  Annuler
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" onClick={handleAdd}>
                  <Plus className="mr-2 h-4 w-4" /> Ajouter
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * { visibility: hidden; }
          .grid, .grid * { visibility: visible; }
          .grid { position: absolute; top: 0; left: 0; width: 100%; }
          @page { size: landscape; margin: 1cm; }
        }
      `}} />
    </div>
  );
}
