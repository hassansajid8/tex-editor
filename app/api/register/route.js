import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request, response) {
  const cookieStore = cookies();

  const formData = await request.formData();
  const credentials = {
    password: formData.get("password"),
    username: formData.get("username"),
  };

  const user = await prisma.users.create({
    data: {
        username: credentials.username,
        password: credentials.password,
    }
  })

  if (user) {
    cookieStore.set('user', user.id);
    cookieStore.set('username', user.username)
    return NextResponse.json({ message: 'success' }, { status: 200 })
  }
  else if (!user) {
    return NextResponse.json({ error: "Invalid credentials..." }, { status: 401 })
  }
  else {
    return NextResponse.json({ error: "Something went wrong..." }, { status: 500 })
  }
}