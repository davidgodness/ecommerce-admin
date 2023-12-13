import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { name } = await request.json();

    if (!name) {
      return new NextResponse("Name required", { status: 400 });
    }

    const store = await prismadb.store.update({
      where: { id: params.storeId, userId },
      data: { name },
    });

    if (!store) {
      return new NextResponse("No store updated", { status: 404 });
    }

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_PATCH]", error);
    return new NextResponse("Something went wrong!", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const store = await prismadb.store.delete({
      where: { id: params.storeId },
    });

    if (!store) {
      return new NextResponse("Store not found", { status: 404 });
    }

    return new NextResponse("Deleted", { status: 200 });
  } catch (error) {
    console.log("[STORE_DELETE]", error);
    return new NextResponse("Something went wrong!", { status: 500 });
  }
}
