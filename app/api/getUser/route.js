import prisma from "@/app/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request, response){
    const cookieStore = cookies();
    const userId = cookieStore.get('user').value;

    const user = await prisma.users.findUnique({
        where: {
            id: userId,
        },
        select: {
            name: true,
        }
    })

    if(user){
        return NextResponse.json(JSON.stringify(user), { status: 200 })
    }

}