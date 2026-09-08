import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Seance from "@/lib/models/Seance";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const seance = await Seance.findById(id);
    if (!seance) {
      return NextResponse.json({ success: false, error: "Seance not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: seance });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch seance" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const seance = await Seance.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!seance) {
      return NextResponse.json({ success: false, error: "Seance not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: seance });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update seance" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const seance = await Seance.findByIdAndDelete(id);
    if (!seance) {
      return NextResponse.json({ success: false, error: "Seance not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete seance" }, { status: 500 });
  }
}
