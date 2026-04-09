import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'

// 获取文章列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '10')
    const category = searchParams.get('category')
    const published = searchParams.get('published')

    const where: any = {}
    
    if (category) {
      where.category = category
    }
    
    if (published !== null) {
      where.published = published === 'true'
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
            },
          },
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.post.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: posts,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    })
  } catch (error) {
    console.error('Get posts error:', error)
    return NextResponse.json(
      { success: false, error: '获取文章列表失败' },
      { status: 500 }
    )
  }
}

// 创建文章
const createPostSchema = z.object({
  title: z.string().min(1, '标题不能为空'),
  content: z.string().optional(),
  category: z.enum(['TECH', 'LIFE', 'TRAVEL', 'FOOD', 'OTHER']).default('OTHER'),
  tags: z.string().optional(),
  published: z.boolean().default(false),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const result = createPostSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.errors[0].message },
        { status: 400 }
      )
    }

    // TODO: 从 JWT token 获取当前用户ID
    const authorId = body.authorId // 临时方案

    if (!authorId) {
      return NextResponse.json(
        { success: false, error: '请先登录' },
        { status: 401 }
      )
    }

    const post = await prisma.post.create({
      data: {
        ...result.data,
        authorId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: post,
      message: '文章创建成功',
    }, { status: 201 })
  } catch (error) {
    console.error('Create post error:', error)
    return NextResponse.json(
      { success: false, error: '创建文章失败' },
      { status: 500 }
    )
  }
}
