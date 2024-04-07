import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";


export async function POST(request, response) {
  const cookieStore = cookies();
  cookieStore.delete('user')
  cookieStore.delete('username')

  const formData = await request.formData();
  return NextResponse.json({ status: 200 });
}