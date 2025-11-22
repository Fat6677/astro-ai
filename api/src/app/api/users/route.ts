import { NextRequest, NextResponse } from 'next/server'
import { ApiResponse, UserResponse } from '../../../types/user'

export async function GET(request: NextRequest) {
  // Dynamic import Prisma
  const { PrismaClient } = await import('@prisma/client')
  const prisma = new PrismaClient()

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        tanggalLahir: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const response: ApiResponse<UserResponse[]> = {
      data: users
    }

    return NextResponse.json(response)
  } catch (error: unknown) {
    console.error('Get users error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}