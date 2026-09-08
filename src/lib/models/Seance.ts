import mongoose, { Schema, Document } from "mongoose";

export interface ISeance extends Document {
  date: Date;
  classe: string;
  niveau: string;
  sport: string;
  trimestre: number;
  oti: string;
  objectifCycle: string;
  objectifs: string[];
  materiel: string[];
  echauffement: string;
  corpsSeance: string;
  retourCalme: string;
  evaluation: string;
  duree: number;
  lieu: string;
  observations: string;
  createdAt: Date;
  updatedAt: Date;
}

const SeanceSchema = new Schema<ISeance>(
  {
    date: { type: Date, required: true },
    classe: { type: String, required: true },
    niveau: { type: String, default: "" },
    sport: { type: String, required: true },
    trimestre: { type: Number, required: true, enum: [1, 2, 3] },
    oti: { type: String, default: "" },
    objectifCycle: { type: String, default: "" },
    objectifs: [{ type: String }],
    materiel: [{ type: String }],
    echauffement: { type: String, default: "" },
    corpsSeance: { type: String, default: "" },
    retourCalme: { type: String, default: "" },
    evaluation: { type: String, default: "" },
    duree: { type: Number, default: 60 },
    lieu: { type: String, default: "Terrain de sport" },
    observations: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Seance || mongoose.model<ISeance>("Seance", SeanceSchema);
