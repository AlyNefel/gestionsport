import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Eleve from "@/lib/models/Eleve";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const classe = searchParams.get("classe");
  
  try {
    await dbConnect();
    const query = classe ? { classe } : {};
    const eleves = await Eleve.find(query).sort({ nom: 1, prenom: 1 });
    return NextResponse.json({ success: true, data: eleves });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erreur lors de la récupération des élèves" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const newEleve = await Eleve.create(body);
    return NextResponse.json({ success: true, data: newEleve }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erreur lors de la création de l'élève" }, { status: 500 });
  }
}
