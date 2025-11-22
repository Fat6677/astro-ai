import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // langsung, tanpa helper

export async function GET() {
  const users = await prisma.user.findMany();
  return Response.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { username, email, password, birthdate } = body;

  const user = await prisma.user.create({
    data: { username, email, password, birthdate },
  });

  return Response.json(user);
}
