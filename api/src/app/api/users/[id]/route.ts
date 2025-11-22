import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { ApiResponse, UserResponse, UpdateUserRequest } from '../../../../types/user'

interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const userId = parseInt(params.id)
    
    if (isNaN(userId)) {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        tanggalLahir: true,
        createdAt: true,
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const response: ApiResponse<UserResponse> = {
      data: user
    }

    return NextResponse.json(response)
  } catch (error: unknown) {
    console.error('Get user error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const userId = parseInt(params.id)
    
    if (isNaN(userId)) {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      )
    }

    const body: UpdateUserRequest = await request.json()
    const { name, email, tanggalLahir } = body

    // Validasi minimal satu field yang diupdate
    if (!name && !email && !tanggalLahir) {
      return NextResponse.json(
        { error: 'At least one field is required to update' },
        { status: 400 }
      )
    }

    // Validasi email jika diupdate
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Invalid email format' },
          { status: 400 }
        )
      }
    }

    // Validasi tanggal lahir jika diupdate
    if (tanggalLahir) {
      const birthDate = new Date(tanggalLahir)
      if (isNaN(birthDate.getTime())) {
        return NextResponse.json(
          { error: 'Invalid birth date' },
          { status: 400 }
        )
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name && { name: name.trim() }),
        ...(email && { email: email.toLowerCase().trim() }),
        ...(tanggalLahir && { tanggalLahir: new Date(tanggalLahir) }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        tanggalLahir: true,
        createdAt: true,
        updatedAt: true,
      }
    })

    const response: ApiResponse<UserResponse> = {
      message: 'User updated successfully',
      data: updatedUser
    }

    return NextResponse.json(response)
  } catch (error: unknown) {
    console.error('Update user error:', error)
    
    if ((error as Error & { code?: string }).code === 'P2025') {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
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
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const userId = parseInt(params.id)
    
    if (isNaN(userId)) {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      )
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
    
    if ((error as Error & { code?: string }).code === 'P2025') {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}