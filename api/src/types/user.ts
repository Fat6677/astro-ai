export interface User {
  id: number
  name: string
  email: string
  password: string
  tanggalLahir: Date
  createdAt: Date
  updatedAt: Date
}

export interface CreateUserRequest {
  name: string
  email: string
  password: string
  tanggalLahir: string
}

export interface UpdateUserRequest {
  name?: string
  email?: string
  tanggalLahir?: string
}

export interface UserResponse {
  id: number
  name: string
  email: string
  tanggalLahir: Date
  createdAt: Date
}

export interface ApiResponse<T> {
  message?: string
  data?: T
  error?: string
}