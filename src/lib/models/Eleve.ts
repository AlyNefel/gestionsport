import mongoose, { Schema, Document } from "mongoose";

export interface IEleve extends Document {
  nom: string;
  prenom: string;
  classe: string;
  niveau: string;
  dateNaissance?: Date;
  presences: { seanceId: string; present: boolean; date: Date }[];
  notes: { sport: string; type: string; valeur: number; date: Date; trimestre: number }[];
}

const EleveSchema = new Schema<IEleve>(
  {
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    classe: { type: String, required: true },
    niveau: { type: String, required: true },
    dateNaissance: { type: Date },
    presences: [
      {
        seanceId: String,
        present: { type: Boolean, default: true },
        date: Date,
      },
    ],
    notes: [
      {
        sport: String,
        type: String,
        valeur: Number,
        date: Date,
        trimestre: { type: Number, enum: [1, 2, 3] },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Eleve || mongoose.model<IEleve>("Eleve", EleveSchema);
