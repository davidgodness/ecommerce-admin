import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    const { userId } = auth();

    if (!userId) {
      return Response.json({ error: "UnAuthorized" }, { status: 401 });
    }

    const result = await prisma.store.create({ data: { name, userId } });

    return Response.json(result, { status: 200 });
  } catch (error) {
    console.log("[POST_STORE]", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
