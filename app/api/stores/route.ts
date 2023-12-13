import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { name } = await request.json();

    if (!name) {
      return new NextResponse("Name required", { status: 400 });
    }

    const newStore = await prismadb.store.create({ data: { name, userId } });

    return NextResponse.json(newStore);
  } catch (error) {
    console.log("[STORES_POST]", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
