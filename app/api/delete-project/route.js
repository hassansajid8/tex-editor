import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import JSONBig from 'json-bigint'

export async function POST(request, response) {

  const formData = await request.formData();

  const deleted = await prisma.projects.delete({
    where: {
        id: formData.get('projectId')
    }
  })

  if (deleted) {
    return NextResponse.json(JSONBig.stringify(deleted), { status: 200 })
  }
  else if (!deleted) {
    return NextResponse.json({ error: "Could not fetch..." }, { status: 401 })
  }
  else {
    return NextResponse.json({ error: "Something went wrong..." }, { status: 500 })
  }
}