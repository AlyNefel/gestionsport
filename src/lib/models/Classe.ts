import mongoose, { Schema, Document } from "mongoose";

export interface IClasse extends Document {
  nom: string;
  niveau: string;
  section: string;
  effectif: number;
  anneeScol: string;
}

const ClasseSchema = new Schema<IClasse>(
  {
    nom: { type: String, required: true },
    niveau: { type: String, required: true },
    section: { type: String, default: "" },
    effectif: { type: Number, default: 30 },
    anneeScol: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Classe || mongoose.model<IClasse>("Classe", ClasseSchema);
