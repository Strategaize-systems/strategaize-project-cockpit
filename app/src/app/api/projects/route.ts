import { NextResponse } from "next/server";
import { readProjectsConfig } from "@/lib/projects";

export async function GET() {
  const projects = readProjectsConfig();
  return NextResponse.json({ projects });
}
