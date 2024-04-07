import prisma from "@/app/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import JSONBig from 'json-bigint'

export async function GET(request, response){
    const cookieStore = cookies();
    const userId = cookieStore.get('user').value;

    let projects = await prisma.projects.findMany({
        where: {
            createdBy: userId,
        },
        select: {
            id: true,
            title: true,
            createdAt: true,
        },
    })

    if(projects){
        return NextResponse.json(JSONBig.stringify(projects), { status: 200 })
    }

}