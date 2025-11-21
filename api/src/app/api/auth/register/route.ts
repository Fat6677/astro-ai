import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { username, email, password, birthdate } = await req.json();

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashed,
        birthdate: new Date(birthdate),
      },
    });

    return Response.json({ message: "User created", user });
  } catch (error) {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
