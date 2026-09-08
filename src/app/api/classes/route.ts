import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Classe from "@/lib/models/Classe";

export async function GET() {
  try {
    await dbConnect();
    const classes = await Classe.find({}).sort({ niveau: 1, nom: 1 });
    return NextResponse.json({ success: true, data: classes });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erreur lors de la récupération des classes" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const newClasse = await Classe.create(body);
    return NextResponse.json({ success: true, data: newClasse }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erreur lors de la création de la classe" }, { status: 500 });
  }
}
