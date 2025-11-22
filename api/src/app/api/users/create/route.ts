import { NextRequest, NextResponse } from 'next/server'
import { hashPassword } from '../../../../lib/auth'
import { CreateUserRequest, ApiResponse, UserResponse } from '../../../../types/user'

export async function POST(request: NextRequest) {
  // Dynamic import Prisma
  const { PrismaClient } = await import('@prisma/client')
  const prisma = new PrismaClient()

  try {
    // Parse request body
    let body: CreateUserRequest;
    try {
      body = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      )
    }

    const { name, email, password, tanggalLahir } = body

    console.log('Received data:', { name, email, password: '***', tanggalLahir })

    // Validasi input
    if (!name || !email || !password || !tanggalLahir) {
      return NextResponse.json(
        { 
          error: 'All fields are required',
          missing: {
            name: !name,
            email: !email, 
            password: !password,
            tanggalLahir: !tanggalLahir
          }
        },
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

    // Validasi tanggal lahir
    const birthDate = new Date(tanggalLahir)
    if (isNaN(birthDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid birth date format' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Cek apakah email sudah ada
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      )
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        tanggalLahir: birthDate,
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
    console.error('Create user error details:', error)
    
    // Handle specific Prisma errors
    if ((error as Error & { code?: string }).code === 'P2002') {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      )
    }

    if ((error as Error & { code?: string }).code === 'P2025') {
      return NextResponse.json(
        { error: 'Record not found' },
        { status: 404 }
      )
    }

    // Generic error
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}