import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import MainLayout from './components/layout/MainLayout'
import '@/styles/custom.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next FullStack App',
  description: 'A full-stack application built with Next.js, Prisma, and Ant Design',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <AntdRegistry>
          <MainLayout>{children}</MainLayout>
        </AntdRegistry>
      </body>
    </html>
  )
}
