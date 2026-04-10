import { NextResponse } from 'next/server'
import { readdir, stat, unlink } from 'fs/promises'
import { join } from 'path'

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads')

// 获取文件列表
export async function GET() {
  try {
    const files = await readdir(UPLOAD_DIR)
    const fileList = await Promise.all(
      files
        .filter(file => file !== '.gitkeep')
        .map(async (filename) => {
          const filepath = join(UPLOAD_DIR, filename)
          const stats = await stat(filepath)
          return {
            name: filename,
            url: `/uploads/${filename}`,
            size: stats.size,
            createdAt: stats.birthtime,
            updatedAt: stats.mtime,
          }
        })
    )

    // 按时间倒序排列
    fileList.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

    return NextResponse.json({
      success: true,
      data: fileList,
    })
  } catch (error) {
    console.error('Get files error:', error)
    return NextResponse.json(
      { success: false, error: '获取文件列表失败' },
      { status: 500 }
    )
  }
}

// 删除文件
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const filename = searchParams.get('name')

    if (!filename) {
      return NextResponse.json(
        { success: false, error: '请提供文件名' },
        { status: 400 }
      )
    }

    // 防止目录遍历攻击
    if (filename.includes('..') || filename.includes('/')) {
      return NextResponse.json(
        { success: false, error: '非法文件名' },
        { status: 400 }
      )
    }

    const filepath = join(UPLOAD_DIR, filename)
    await unlink(filepath)

    return NextResponse.json({
      success: true,
      message: '文件删除成功',
    })
  } catch (error) {
    console.error('Delete file error:', error)
    return NextResponse.json(
      { success: false, error: '删除文件失败' },
      { status: 500 }
    )
  }
}
