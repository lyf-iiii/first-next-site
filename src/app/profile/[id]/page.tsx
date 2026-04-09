'use client'

import { useParams } from 'next/navigation'
import { Card, Avatar, Descriptions, Tag, Button, Space, Tabs, List } from 'antd'
import { UserOutlined, EditOutlined, MailOutlined, CalendarOutlined } from '@ant-design/icons'
import { useAuthStore } from '@/stores'
import { formatDate } from '@/lib/utils'
import '@/styles/custom.css'

export default function ProfilePage() {
  const { id } = useParams()
  const { user } = useAuthStore()

  const isCurrentUser = user?.id === id

  const userInfo = [
    { label: '用户ID', children: id },
    { label: '邮箱', children: user?.email || '未设置' },
    { label: '角色', children: <Tag color={user?.role === 'ADMIN' ? 'red' : 'blue'}>{user?.role}</Tag> },
    { label: '注册时间', children: user?.createdAt ? formatDate(user.createdAt) : '-' },
  ]

  const tabItems = [
    {
      key: 'info',
      label: '基本信息',
      children: (
        <Card>
          <Descriptions
            column={{ xs: 1, sm: 2 }}
            items={userInfo.map((item) => ({
              label: item.label,
              children: item.children,
            }))}
          />
        </Card>
      ),
    },
    {
      key: 'posts',
      label: '我的文章',
      children: (
        <Card>
          <Empty description="暂无文章" />
        </Card>
      ),
    },
    {
      key: 'settings',
      label: '账号设置',
      children: (
        <Card>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Button icon={<EditOutlined />}>修改资料</Button>
            <Button icon={<MailOutlined />}>修改邮箱</Button>
          </Space>
        </Card>
      ),
    },
  ]

  return (
    <div className="page-fade-in">
      <Card className="mb-24">
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Avatar size={80} icon={<UserOutlined />} src={user?.avatar} />
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: 0, marginBottom: '8px' }}>
              {user?.name || '未设置昵称'}
              {isCurrentUser && <Tag color="blue" style={{ marginLeft: '8px' }}>我</Tag>}
            </h1>
            <Space>
              <span style={{ color: '#666' }}><CalendarOutlined /> 加入于 {user?.createdAt ? formatDate(user.createdAt) : '-'}</span>
            </Space>
          </div>
          {isCurrentUser && (
            <Button type="primary" icon={<EditOutlined />}>
              编辑资料
            </Button>
          )}
        </div>
      </Card>

      <Tabs items={tabItems} defaultActiveKey="info" />
    </div>
  )
}

// 空状态组件
function Empty({ description }: { description: string }) {
  return (
    <div style={{ textAlign: 'center', padding: '48px 0', color: '#999' }}>
      <p>{description}</p>
    </div>
  )
}
