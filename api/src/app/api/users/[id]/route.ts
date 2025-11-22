import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { ApiResponse, UserResponse, UpdateUserRequest } from '../../../../types/user'

const prisma = new PrismaClient()

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    // AWAIT params karena itu Promise
    const { id } = await params
    const userId = parseInt(id)
    
    if (isNaN(userId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, tanggalLahir: true, createdAt: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const response: ApiResponse<UserResponse> = {
      data: user
    }

    return NextResponse.json(response)
  } catch (error: unknown) {
    console.error('Get user error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    // AWAIT params karena itu Promise
    const { id } = await params
    const userId = parseInt(id)
    
    if (isNaN(userId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 })
    }

    const body: UpdateUserRequest = await request.json()
    const { name, email, tanggalLahir } = body

    // Validasi minimal satu field
    if (!name && !email && !tanggalLahir) {
      return NextResponse.json(
        { error: 'At least one field is required to update' },
        { status: 400 }
      )
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name && { name: name.trim() }),
        ...(email && { email: email.toLowerCase().trim() }),
        ...(tanggalLahir && { tanggalLahir: new Date(tanggalLahir) }),
      },
      select: {
        id: true, name: true, email: true, tanggalLahir: true,
        createdAt: true, updatedAt: true
      }
    })

    const response: ApiResponse<UserResponse> = {
      message: 'User updated successfully',
      data: updatedUser
    }

    return NextResponse.json(response)
  } catch (error: unknown) {
    console.error('Update user error:', error)
    
    const prismaError = error as { code?: string }
    
    if (prismaError.code === 'P2025') {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    if (prismaError.code === 'P2002') {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 })
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // AWAIT params karena itu Promise
    const { id } = await params
    const userId = parseInt(id)
    
    if (isNaN(userId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 })
    }

    await prisma.user.delete({
      where: { id: userId }
    })

    const response: ApiResponse<null> = {
      message: 'User deleted successfully'
    }

    return NextResponse.json(response)
  } catch (error: unknown) {
    console.error('Delete user error:', error)
    
    const prismaError = error as { code?: string }
    
    if (prismaError.code === 'P2025') {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}