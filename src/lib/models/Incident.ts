import mongoose, { Schema, Document } from "mongoose";

export interface IIncident extends Document {
  date: Date;
  eleveNom: string;
  elevePrenom: string;
  classe: string;
  type: string;
  description: string;
  mesuresPrises: string;
  gravite: "faible" | "moyen" | "grave";
}

const IncidentSchema = new Schema<IIncident>(
  {
    date: { type: Date, required: true, default: Date.now },
    eleveNom: { type: String, required: true },
    elevePrenom: { type: String, required: true },
    classe: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    mesuresPrises: { type: String, default: "" },
    gravite: { type: String, enum: ["faible", "moyen", "grave"], default: "faible" },
  },
  { timestamps: true }
);

export default mongoose.models.Incident || mongoose.model<IIncident>("Incident", IncidentSchema);
