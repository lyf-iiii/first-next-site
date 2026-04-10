# Next.js FullStack App

使用 Next.js 14 + Prisma + Ant Design + Zustand 构建的现代化全栈应用。

## 技术栈

- **Next.js 14** - React 全栈框架，App Router
- **TypeScript** - 类型安全
- **Prisma** - ORM 和数据库迁移
- **PostgreSQL** - 生产数据库（Supabase）
- **SQLite** - 本地开发数据库（可选）
- **Ant Design** - UI 组件库
- **Zustand** - 状态管理
- **Tailwind CSS** - 原子化 CSS
- **NextAuth.js** - 认证（可选）

## 项目结构

```
next-fullstack-app/
├── prisma/
│   ├── schema.prisma      # 数据库模型定义
│   └── seed.ts            # 数据库种子数据
├── src/
│   ├── app/
│   │   ├── api/           # API 路由
│   │   │   ├── auth/      # 认证相关 API
│   │   │   ├── posts/     # 文章 CRUD API
│   │   │   ├── comments/  # 评论系统 API
│   │   │   ├── upload/    # 文件上传 API
│   │   │   ├── files/     # 文件管理 API
│   │   │   └── users/     # 用户相关 API
│   │   ├── components/    # React 组件
│   │   │   └── layout/    # 布局组件
│   │   ├── (pages)/       # 页面路由
│   │   │   ├── home/      # 首页
│   │   │   ├── about/     # 关于页面
│   │   │   ├── posts/     # 文章列表/详情/评论
│   │   │   ├── upload/    # 文件上传页面
│   │   │   ├── files/     # 文件管理页面
│   │   │   └── profile/   # 个人中心
│   │   ├── login/         # 登录页面
│   │   ├── register/      # 注册页面
│   │   ├── layout.tsx     # 根布局
│   │   └── page.tsx       # 根页面（重定向到 home）
│   ├── lib/
│   │   ├── prisma.ts      # Prisma 客户端
│   │   └── utils.ts       # 工具函数
│   ├── stores/
│   │   ├── useAuthStore.ts # 认证状态
│   │   └── usePostStore.ts # 文章状态
│   ├── types/
│   │   └── index.ts       # TypeScript 类型定义
│   └── styles/
│       └── custom.css     # 公共样式
├── .env                   # 环境变量
├── next.config.js
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 快速开始

### 1. 安装依赖

```bash
npm install
# 或
pnpm install
```

### 2. 配置环境变量

```bash
cp .env.local.example .env
# 编辑 .env 文件，配置数据库连接和其他环境变量
```

### 3. 初始化数据库

```bash
# 生成 Prisma 客户端
npm run db:generate

# 执行数据库迁移
npm run db:migrate

# 填充种子数据（可选）
npm run db:seed
```

### 4. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

## 数据库管理

```bash
# 查看数据库
npm run db:studio

# 创建迁移
npx prisma migrate dev --name 迁移名称

# 重置数据库
npx prisma migrate reset
```

## API 接口

### 认证
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录

### 文章
- `GET /api/posts` - 获取文章列表
- `POST /api/posts` - 创建文章
- `GET /api/posts/[id]` - 获取单个文章
- `PUT /api/posts/[id]` - 更新文章
- `DELETE /api/posts/[id]` - 删除文章

### 评论系统
- `GET /api/comments?postId=xxx` - 获取文章评论列表
- `POST /api/comments` - 创建评论
- `DELETE /api/comments/[id]` - 删除评论

### 文件管理
- `POST /api/upload` - 上传文件（支持图片/PDF，最大5MB）
- `GET /api/files` - 获取文件列表
- `DELETE /api/files?name=xxx` - 删除文件

## 页面路由

### 公开页面
- `/` - 首页（重定向到 /home）
- `/home` - 首页
- `/about` - 关于页面
- `/posts` - 文章列表
- `/posts/[id]` - 文章详情（含评论）
- `/login` - 登录
- `/register` - 注册

### 需登录页面
- `/profile/[id]` - 个人中心
- `/upload` - 文件上传
- `/files` - 文件管理（查看/删除）

## 功能特性

### 已实现功能

| 功能 | 描述 | 状态 |
|------|------|------|
| 用户认证 | 注册/登录/登出，JWT Token | ✅ |
| 文章管理 | CRUD 操作，分类标签 | ✅ |
| **评论系统** | 文章评论，支持增删 | ✅ |
| 文件上传 | 单/多文件上传，图片预览 | ✅ |
| 文件管理 | 查看/删除已上传文件 | ✅ |
| 响应式布局 | 适配桌面和移动端 | ✅ |
| Vercel 部署 | 生产环境部署配置 | ✅ |

### 评论系统详情

评论系统支持以下功能：
- 📝 登录用户可对文章发表评论
- 💬 评论实时显示在文章详情页
- 🗑️ 评论作者可删除自己的评论
- 👤 显示评论者头像和名称
- ⏰ 显示评论发布时间

### 文件上传详情

- 📎 支持格式：JPG、PNG、GIF、WEBP、PDF
- 📦 单文件最大 5MB
- 🖼️ 图片预览和缩略图
- 📂 文件管理页面统一查看
- 🗑️ 支持删除已上传文件

## 开发计划

- [x] 项目基础架构
- [x] 数据库设计和 Prisma 配置
- [x] 用户认证 API
- [x] 文章 CRUD API
- [x] 前端页面和组件
- [x] Zustand 状态管理
- [x] 文件上传功能
- [x] **评论系统**
- [ ] 搜索功能
- [x] 部署配置

## 数据库模型

### 核心模型

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  password  String
  avatar    String?
  role      Role     @default(USER)
  posts     Post[]
  comments  Comment[]  // 用户评论关联
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        String   @id @default(uuid())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  comments  Comment[]  // 文章评论关联
  category  Category
  tags      String?
  viewCount Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Comment {
  id        String   @id @default(uuid())
  content   String
  postId    String
  post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
  authorId  String
  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 部署

### Vercel 部署

1. Fork/Clone 项目到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 配置环境变量：
   - `DATABASE_URL` - Supabase 连接池 URL
   - `DIRECT_URL` - Supabase 直接连接 URL
   - `NEXTAUTH_SECRET` - 随机字符串
   - `JWT_SECRET` - 随机字符串
4. 点击 Deploy

## 许可证

MIT
