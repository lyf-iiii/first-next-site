/**
 * 全局类型定义
 */

// 用户类型
export interface User {
  id: string
  email: string
  name: string | null
  avatar: string | null
  role: 'USER' | 'ADMIN'
  createdAt: Date
  updatedAt: Date
}

// 文章类型
export interface Post {
  id: string
  title: string
  content: string | null
  published: boolean
  category: Category
  tags: string[]
  viewCount: number
  createdAt: Date
  updatedAt: Date
  authorId: string
  author?: User
}

export type Category = 'TECH' | 'LIFE' | 'TRAVEL' | 'FOOD' | 'OTHER'

// API 响应类型
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

// 分页类型
export interface PaginationParams {
  page?: number
  pageSize?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// 表单类型
export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  name: string
  email: string
  password: string
}

export interface CreatePostForm {
  title: string
  content: string
  category: Category
  tags: string[]
  published?: boolean
}
