import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('开始填充数据库...')

  // 创建测试用户
  const hashedPassword = await bcrypt.hash('password123', 10)

  const user1 = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: '管理员',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: '普通用户',
      password: hashedPassword,
      role: 'USER',
    },
  })

  console.log('创建用户:', { user1, user2 })

  // 创建测试文章
  const posts = [
    {
      title: '开始使用 Next.js 14',
      content: 'Next.js 14 带来了许多激动人心的新特性，包括更强大的 App Router、Server Components、以及改进的开发体验。本文将介绍如何开始使用 Next.js 14 构建现代化 Web 应用。',
      category: 'TECH' as const,
      published: true,
      authorId: user1.id,
      viewCount: 156,
    },
    {
      title: 'Prisma ORM 入门指南',
      content: 'Prisma 是一个现代化的数据库工具集，提供类型安全的 ORM、数据库迁移和数据管理平台。本文将介绍 Prisma 的核心概念和使用方法。',
      category: 'TECH' as const,
      published: true,
      authorId: user1.id,
      viewCount: 89,
    },
    {
      title: '我的东京之旅',
      content: '上个月去了东京旅行，体验了日本的文化、美食和风景。从浅草寺到涩谷十字路口，每一站都留下了深刻的印象。',
      category: 'TRAVEL' as const,
      published: true,
      authorId: user2.id,
      viewCount: 234,
    },
    {
      title: '周末做的红烧肉',
      content: '今天周末，尝试做了红烧肉。选用五花肉，加入生抽、老抽、冰糖和料酒，小火慢炖一个小时，肉质酥软，入口即化。',
      category: 'FOOD' as const,
      published: true,
      authorId: user2.id,
      viewCount: 67,
    },
  ]

  for (const post of posts) {
    await prisma.post.upsert({
      where: { id: post.title }, // 使用标题作为临时唯一标识
      update: {},
      create: post,
    })
  }

  console.log('创建文章:', posts.length, '篇')
  console.log('数据库填充完成！')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
