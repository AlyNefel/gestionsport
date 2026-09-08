import mongoose, { Schema, Document } from "mongoose";

export interface IProfesseur extends Document {
  nom: string;
  prenom: string;
  etablissement: string;
  grade: string;
  specialite: string;
  anneeScol: string;
  classes: string[];
  sportsT1: string[];
  sportsT2: string[];
  sportsT3: string[];
  objectifGeneraux: string;
  logo?: string;
}

const ProfesseurSchema = new Schema<IProfesseur>(
  {
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    etablissement: { type: String, required: true },
    grade: { type: String, default: "Professeur principal" },
    specialite: { type: String, default: "Education Physique et Sportive" },
    anneeScol: { type: String, required: true },
    classes: [{ type: String }],
    sportsT1: [{ type: String }],
    sportsT2: [{ type: String }],
    sportsT3: [{ type: String }],
    objectifGeneraux: { type: String, default: "" },
    logo: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Professeur || mongoose.model<IProfesseur>("Professeur", ProfesseurSchema);
