import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { query } from '@/lib/db';
import { LoginRequest, User } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const body: LoginRequest = await req.json();
    const { email, password } = body;

    if (!email?.trim() || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user
    const result = await query<User>(
      'SELECT id, username, email, password, birthdate, created_at, updated_at FROM users WHERE email = $1',
      [email.trim()]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      message: "Login successful",
      data: userWithoutPassword
    });

  } catch (error: unknown) {
    console.error("Login error:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    return NextResponse.json(
      { error: `Login failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}