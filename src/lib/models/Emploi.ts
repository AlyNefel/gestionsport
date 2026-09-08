import mongoose, { Schema, Document } from "mongoose";

export interface IEmploi extends Document {
  jour: string; // Lundi, Mardi, etc.
  heureDebut: string; // 08:00
  heureFin: string; // 10:00
  classe: string; // 9ème Base 1
  seanceId?: mongoose.Types.ObjectId; // Reference to the actual Seance if assigned
}

const EmploiSchema = new Schema<IEmploi>(
  {
    jour: { type: String, required: true },
    heureDebut: { type: String, required: true },
    heureFin: { type: String, required: true },
    classe: { type: String, required: true },
    seanceId: { type: Schema.Types.ObjectId, ref: "Seance" },
  },
  { timestamps: true }
);

export default mongoose.models.Emploi || mongoose.model<IEmploi>("Emploi", EmploiSchema);
