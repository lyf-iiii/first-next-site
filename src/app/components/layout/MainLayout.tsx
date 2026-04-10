'use client'

import { Layout, Menu, Button, Space, Avatar, Dropdown } from 'antd'
import { UserOutlined, DownOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores'

const { Header, Content, Footer } = Layout

const getMenuItems = (isAuthenticated: boolean) => {
  const items = [
    { key: '/', label: <Link href="/">首页</Link> },
    { key: '/posts', label: <Link href="/posts">文章</Link> },
    { key: '/about', label: <Link href="/about">关于</Link> },
  ]
  
  if (isAuthenticated) {
    items.push({ 
      key: '/files', 
      label: <Link href="/files">📁 文件管理</Link>,
    })
  }
  
  return items
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const userMenuItems = [
    {
      key: 'profile',
      label: <Link href={`/profile/${user?.id}`}>个人中心</Link>,
    },
    {
      key: 'files',
      label: <Link href="/files">📁 文件管理</Link>,
    },
    {
      key: 'upload',
      label: <Link href="/upload">⬆️ 上传文件</Link>,
    },
    {
      key: 'settings',
      label: '设置',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      label: '退出登录',
      onClick: handleLogout,
    },
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', padding: '0 24px' }}>
        <div style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold', marginRight: '48px' }}>
          Next FullStack
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[pathname === '/posts' ? '/posts' : pathname]}
          items={getMenuItems(isAuthenticated)}
          style={{ flex: 1, minWidth: 0 }}
        />
        <Space>
          {isAuthenticated ? (
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Space style={{ cursor: 'pointer', color: '#fff' }}>
                <Avatar icon={<UserOutlined />} src={user?.avatar} />
                <span>{user?.name || user?.email}</span>
                <DownOutlined />
              </Space>
            </Dropdown>
          ) : (
            <Space>
              <Link href="/login">
                <Button type="default">登录</Button>
              </Link>
              <Link href="/register">
                <Button type="primary">注册</Button>
              </Link>
            </Space>
          )}
        </Space>
      </Header>

      <Content style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {children}
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        © 2026 Next FullStack App. Built with Next.js + Prisma + Ant Design
      </Footer>
    </Layout>
  )
}
