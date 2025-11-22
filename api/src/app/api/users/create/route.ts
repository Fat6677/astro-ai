import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../../../../lib/auth'
import { CreateUserRequest, ApiResponse, UserResponse } from '../../../../types/user'

export async function POST(request: NextRequest) {
  // Dynamic import Prisma
  const prisma = new PrismaClient()



  try {
    const body: CreateUserRequest = await request.json()
    const { name, email, password, tanggalLahir } = body

    // Validasi input
    if (!name || !email || !password || !tanggalLahir) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        tanggalLahir: new Date(tanggalLahir),
      },
    })

    const userResponse: UserResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      tanggalLahir: user.tanggalLahir,
      createdAt: user.createdAt,
    }

    const response: ApiResponse<UserResponse> = {
      message: 'User created successfully',
      data: userResponse
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error: unknown) {
    console.error('Create user error:', error)
    
    if ((error as Error & { code?: string }).code === 'P2002') {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}