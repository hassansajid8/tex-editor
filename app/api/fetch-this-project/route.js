import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request, response) {

  const formData = await request.formData();
  console.log("receieved");

  const project = await prisma.projects.findUnique({
    where: {
        id: formData.get('projectId'),
    },
    select: {
        title: true,
        body: true,
    }
  })

  if (project) {
    return NextResponse.json(JSON.stringify(project), { status: 200 })
  }
  else if (!project) {
    return NextResponse.json({ error: "Could not fetch..." }, { status: 401 })
  }
  else {
    return NextResponse.json({ error: "Something went wrong..." }, { status: 500 })
  }
}