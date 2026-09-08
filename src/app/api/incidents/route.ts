import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Incident from "@/lib/models/Incident";

export async function GET() {
  try {
    await dbConnect();
    const incidents = await Incident.find({}).sort({ date: -1 });
    return NextResponse.json({ success: true, data: incidents });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erreur lors de la récupération des incidents" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const newIncident = await Incident.create(body);
    return NextResponse.json({ success: true, data: newIncident }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erreur lors de la création de l'incident" }, { status: 500 });
  }
}
