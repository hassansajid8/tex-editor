import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import JSONBig from 'json-bigint'


export async function POST(request, response) {
  const cookieStore = cookies();
  const formData = await request.formData();

  const project = await prisma.projects.create({
    data: {
      title: formData.get('title'),
      createdBy: cookieStore.get('username').value,
    },
  })

  if (project) {
    return NextResponse.json(JSONBig.stringify(project), { status: 200 })
  }
  else if (!project) {
    return NextResponse.json({ error: "Error creating project" }, { status: 401 })
  }
  else {
    return NextResponse.json({ error: "Something went wrong..." }, { status: 500 })
  }
}