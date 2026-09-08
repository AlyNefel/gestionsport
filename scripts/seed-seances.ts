import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Schema definitions directly in script to avoid next.js module resolution issues
const seanceSchema = new mongoose.Schema({
  date: { type: Date },
  classe: { type: String },
  niveau: { type: String },
  sport: { type: String },
  trimestre: { type: Number },
  oti: { type: String },
  objectifCycle: { type: String },
  objectifs: [{ type: String }],
  materiel: [{ type: String }],
  echauffement: { type: String },
  corpsSeance: { type: String },
  retourCalme: { type: String },
  evaluation: { type: String },
  duree: { type: Number },
  lieu: { type: String }
});

const Seance = mongoose.models.Seance || mongoose.model('Seance', seanceSchema);

const sampleSeances = [
  {
    date: new Date(),
    classe: "7ème Année de Base",
    niveau: "Collège",
    sport: "Gymnastique au sol",
    trimestre: 1,
    oti: "L'élève doit être capable de construire un enchaînement gymnique fluide composé de 4 à 5 éléments de familles différentes.",
    objectifCycle: "Apprentissage et enchaînement des éléments gymniques de base (roulades, ATR, équilibre).",
    objectifs: ["Découverte de l'enroulement avant", "Maîtrise de la roulade avant groupée"],
    materiel: ["Tapis de gymnastique", "Plinths", "Sifflet"],
    echauffement: "Échauffement général : Trotinement, mobilisation articulaire (cervicales, poignets, chevilles, dos). Échauffement spécifique : Petits sauts, gainage léger, étirements du dos.",
    corpsSeance: "Situation 1 (Atelier) : Roulade avant sur plan incliné (Plinth + Tapis). \nSituation 2 : Roulade avant sur sol plat avec parade. \nCritère de réussite : Menton collé à la poitrine, poussée simultanée des jambes, arrivée sur les deux pieds.",
    retourCalme: "Étirements passifs au sol, relaxation, bilan de la séance et ramassage du matériel.",
    evaluation: "Observation de l'engagement moteur et du respect des consignes de sécurité.",
    duree: 60,
    lieu: "Salle de Gymnastique"
  },
  {
    date: new Date(new Date().getTime() - 86400000 * 2), // 2 days ago
    classe: "8ème Année de Base",
    niveau: "Collège",
    sport: "Athlétisme (Vitesse)",
    trimestre: 1,
    oti: "Gérer ses ressources pour réaliser la meilleure performance possible sur une distance de 60 mètres.",
    objectifCycle: "Développement de la vitesse de réaction, de la fréquence d'appui et de la coordination.",
    objectifs: ["Amélioration du temps de réaction", "Coordination bras/jambes pendant la course"],
    materiel: ["Jalons", "Sifflet", "Chronomètre", "Dossards"],
    echauffement: "Course continue légère (3 min). Gammes athlétiques : montées de genoux, talons-fesses, pas chassés, foulées bondissantes. Accélérations progressives sur 10m, 20m.",
    corpsSeance: "Situation 1 : Départ à différentes positions (assis, couché, dos) au signal sonore. \nSituation 2 : Course en binôme, poursuite avec handicap. \nSituation 3 : Sprint chronométré sur 30m. \nCritères de réussite : Réactivité au signal, cycle de jambe rapide, buste légèrement incliné au départ.",
    retourCalme: "Marche lente sur 1 tour de piste. Étirements ciblés (quadriceps, ischio-jambiers, mollets).",
    evaluation: "Prise des temps sur 30m pour évaluer le niveau initial.",
    duree: 60,
    lieu: "Piste d'Athlétisme"
  },
  {
    date: new Date(new Date().getTime() - 86400000 * 5),
    classe: "9ème Année de Base",
    niveau: "Collège",
    sport: "Handball",
    trimestre: 2,
    oti: "L'élève doit être capable de s'intégrer dans une équipe pour attaquer et défendre collectivement avec efficacité.",
    objectifCycle: "Apprentissage du jeu de transition, passe et va, et tir en suspension.",
    objectifs: ["Maîtrise de la passe en mouvement", "Tir en course (3 pas)"],
    materiel: ["Ballons de handball", "Cônes", "Dossards (2 couleurs)"],
    echauffement: "Jeu du béret. Échauffement avec ballon par deux (passes variées, en déplacement). Échauffement des gardiens.",
    corpsSeance: "Situation 1 : Parcours dribble + 3 pas + tir (sans opposition). \nSituation 2 : 2 contre 1 face au gardien avec repli défensif. \nSituation 3 : Jeu dirigé 6 vs 6 sur demi-terrain. \nCritère de réussite : Respect de la règle des 3 pas, tir cadré.",
    retourCalme: "Tirs aux 9 mètres sans saut (ludique). Bilan sur les règles d'arbitrage apprises (marcher, reprise de dribble).",
    evaluation: "Observation de l'entraide et de l'intégration des règles du jeu.",
    duree: 60,
    lieu: "Terrain de Handball"
  },
  {
    date: new Date(new Date().getTime() + 86400000 * 1), // Tomorrow
    classe: "7ème Année de Base",
    niveau: "Collège",
    sport: "Saut en Longueur",
    trimestre: 3,
    oti: "L'élève doit enchaîner course d'élan, appel, suspension et réception pour maximiser la distance.",
    objectifCycle: "Liaison entre la course d'élan et l'appel (ne pas mordre la planche).",
    objectifs: ["Découverte de l'appel sur un pied", "Sécurisation de la réception dans la fosse"],
    materiel: ["Fosse à sable", "Râteau", "Cerceaux", "Décamètre"],
    echauffement: "Course lente. Gammes spécifiques saut : cloche-pied, foulées bondissantes, sauts successifs dans cerceaux.",
    corpsSeance: "Situation 1 : Franchissement d'un obstacle bas après 3 pas d'élan. \nSituation 2 : Saut en longueur depuis une zone d'appel élargie (1m). \nCritère de réussite : Appel puissant sur le pied fort, atterrissage sur les deux pieds sans déséquilibre arrière.",
    retourCalme: "Rangement du matériel, lissage de la fosse. Retour d'expérience sur les sensations de vol.",
    evaluation: "Évaluation formative : validation de l'appel sur la planche.",
    duree: 60,
    lieu: "Fosse de Saut"
  },
  {
    date: new Date(new Date().getTime() + 86400000 * 3),
    classe: "9ème Année de Base",
    niveau: "Collège",
    sport: "Volleyball",
    trimestre: 2,
    oti: "Coopérer pour construire une attaque et s'opposer aux attaques adverses.",
    objectifCycle: "Maîtrise de la passe à dix doigts et de la manchette.",
    objectifs: ["Positionnement de base", "Touché de balle en manchette"],
    materiel: ["Ballons de volleyball", "Filet central", "Plots"],
    echauffement: "Déplacement spécifiques (pas chassés avant/arrière/latéral). Échauffement des doigts et des poignets. Jeu de relais.",
    corpsSeance: "Situation 1 : Lancer par deux, réception en manchette (ballon bloqué puis renvoyé). \nSituation 2 : Échange continu en manchette au-dessus d'une ligne. \nSituation 3 : Match 4 vs 4 sur terrain réduit avec règles adaptées (autorisation de bloquer la balle).",
    retourCalme: "Étirements des épaules et des mollets. Débriefing de la séance.",
    evaluation: "Évaluation des postures de flexion des jambes lors de la réception.",
    duree: 60,
    lieu: "Terrain de Volleyball"
  }
];

async function seed() {
  if (!process.env.MONGODB_URI) {
    console.error("No MONGODB_URI found");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Seance.deleteMany({});
    await Seance.insertMany(sampleSeances);
    console.log("✅ 5 séances du programme tunisien (7ème, 8ème, 9ème) ont été générées avec succès !");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erreur:", error);
    process.exit(1);
  }
}

seed();
