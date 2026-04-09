import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'

// 获取单个文章
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
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
    })

    if (!post) {
      return NextResponse.json(
        { success: false, error: '文章不存在' },
        { status: 404 }
      )
    }

    // 增加浏览量
    await prisma.post.update({
      where: { id: params.id },
      data: { viewCount: { increment: 1 } },
    })

    return NextResponse.json({
      success: true,
      data: post,
    })
  } catch (error) {
    console.error('Get post error:', error)
    return NextResponse.json(
      { success: false, error: '获取文章详情失败' },
      { status: 500 }
    )
  }
}

// 更新文章
const updatePostSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().optional(),
  category: z.enum(['TECH', 'LIFE', 'TRAVEL', 'FOOD', 'OTHER']).optional(),
  tags: z.string().optional(),
  published: z.boolean().optional(),
})

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    const result = updatePostSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.errors[0].message },
        { status: 400 }
      )
    }

    // 检查文章是否存在
    const existingPost = await prisma.post.findUnique({
      where: { id: params.id },
    })

    if (!existingPost) {
      return NextResponse.json(
        { success: false, error: '文章不存在' },
        { status: 404 }
      )
    }

    // TODO: 验证当前用户是否有权限修改

    const post = await prisma.post.update({
      where: { id: params.id },
      data: result.data,
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
      message: '文章更新成功',
    })
  } catch (error) {
    console.error('Update post error:', error)
    return NextResponse.json(
      { success: false, error: '更新文章失败' },
      { status: 500 }
    )
  }
}

// 删除文章
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 检查文章是否存在
    const existingPost = await prisma.post.findUnique({
      where: { id: params.id },
    })

    if (!existingPost) {
      return NextResponse.json(
        { success: false, error: '文章不存在' },
        { status: 404 }
      )
    }

    // TODO: 验证当前用户是否有权限删除

    await prisma.post.delete({
      where: { id: params.id },
    })

    return NextResponse.json({
      success: true,
      message: '文章删除成功',
    })
  } catch (error) {
    console.error('Delete post error:', error)
    return NextResponse.json(
      { success: false, error: '删除文章失败' },
      { status: 500 }
    )
  }
}
