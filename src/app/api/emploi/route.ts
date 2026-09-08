import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Emploi from "@/lib/models/Emploi";

export async function GET() {
  try {
    await dbConnect();
    const emplois = await Emploi.find({}).populate("seanceId");
    return NextResponse.json({ success: true, data: emplois });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch timetable" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const emploi = await Emploi.create(body);
    return NextResponse.json({ success: true, data: emploi });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to add timetable entry" }, { status: 500 });
  }
}
