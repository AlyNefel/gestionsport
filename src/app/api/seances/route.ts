import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Seance from "@/lib/models/Seance";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const seances = await Seance.find({}).sort({ date: -1 });
    return NextResponse.json({ success: true, data: seances });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch seances" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const seance = await Seance.create(body);
    return NextResponse.json({ success: true, data: seance }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create seance" }, { status: 500 });
  }
}
