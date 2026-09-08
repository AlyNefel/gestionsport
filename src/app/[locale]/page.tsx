import { getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/card";
import { Activity, Users, BookOpen, Calendar } from "lucide-react";
import dbConnect from "@/lib/mongodb";
import Seance from "@/lib/models/Seance";
import Eleve from "@/lib/models/Eleve";
import Classe from "@/lib/models/Classe";

export default async function DashboardPage() {
  const t = await getTranslations("dashboard");
  
  let stats = {
    seances: 0,
    eleves: 0,
    classes: 0,
  };

  try {
    await dbConnect();
    stats.seances = await Seance.countDocuments();
    stats.eleves = await Eleve.countDocuments();
    stats.classes = await Classe.countDocuments();
  } catch (error) {
    console.error("DB Error:", error);
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6 flex items-center space-x-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full dark:bg-blue-900/50 dark:text-blue-400">
            <Activity className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{t("totalSeances")}</p>
            <h3 className="text-2xl font-bold">{stats.seances}</h3>
          </div>
        </Card>
        
        <Card className="p-6 flex items-center space-x-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-full dark:bg-green-900/50 dark:text-green-400">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{t("totalEleves")}</p>
            <h3 className="text-2xl font-bold">{stats.eleves}</h3>
          </div>
        </Card>

        <Card className="p-6 flex items-center space-x-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-full dark:bg-purple-900/50 dark:text-purple-400">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{t("totalClasses")}</p>
            <h3 className="text-2xl font-bold">{stats.classes}</h3>
          </div>
        </Card>

        <Card className="p-6 flex items-center space-x-4">
          <div className="p-3 bg-orange-100 text-orange-600 rounded-full dark:bg-orange-900/50 dark:text-orange-400">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{t("seancesThisMonth")}</p>
            <h3 className="text-2xl font-bold">--</h3>
          </div>
        </Card>
      </div>
    </div>
  );
}
