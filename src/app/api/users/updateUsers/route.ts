import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const { name, email, role, status } = body ?? {};

  //   const user = await prisma.user.update({
  //     where: {
  //       id,
  //     },
  //     data: {
  //       name,
  //       email,
  //       role,
  //       status,
  //     },
  //   });

  return user;
}
