import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Professeur from "@/lib/models/Professeur";

export async function GET() {
  try {
    await dbConnect();
    const profs = await Professeur.find({});
    // On retourne le premier prof trouvé (mono-utilisateur)
    return NextResponse.json({ success: true, data: profs[0] || null });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // S'assurer qu'il n'y a qu'un seul profil (supprimer les anciens si existants)
    await Professeur.deleteMany({});
    
    const prof = await Professeur.create(body);
    return NextResponse.json({ success: true, data: prof }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erreur création" }, { status: 500 });
  }
}
