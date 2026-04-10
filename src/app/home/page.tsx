'use client'

import { Card, Row, Col, Statistic, Button, Typography, Space, List, Tag, Alert } from 'antd'
import { ArrowUpOutlined, UserOutlined, FileTextOutlined, EyeOutlined, UploadOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useAuthStore } from '@/stores/useAuthStore'
import '@/styles/custom.css'

const { Title, Paragraph } = Typography

const features = [
  {
    title: 'Next.js 14',
    desc: '使用最新的 App Router 和 Server Components',
    color: 'blue',
  },
  {
    title: 'Prisma ORM',
    desc: '类型安全的数据库访问和迁移管理',
    color: 'green',
  },
  {
    title: 'Ant Design',
    desc: '企业级 UI 组件库，美观易用',
    color: 'red',
  },
  {
    title: 'Zustand',
    desc: '轻量级状态管理，简单高效',
    color: 'orange',
  },
]

export default function HomePage() {
  const { isAuthenticated, user } = useAuthStore()

  return (
    <div className="page-fade-in">
      <Card className="mb-24 text-center py-12">
        <Title level={1}>Next.js 全栈项目111</Title>
        <Paragraph className="text-base text-gray-600">
          使用 Next.js 14 + Prisma + Ant Design + Zustand 构建的现代化全栈应用
        </Paragraph>
        <Space className="mt-6">
          <Link href="/posts">
            <Button type="primary" size="large">浏览文章</Button>
          </Link>
          <Link href="/about">
            <Button size="large">了解更多</Button>
          </Link>
          {isAuthenticated && (
            <Link href="/upload">
              <Button type="dashed" size="large" icon={<UploadOutlined />}>文件上传</Button>
            </Link>
          )}
        </Space>
      </Card>

      {isAuthenticated && (
        <Alert
          message={`欢迎回来，${user?.name || user?.email || '用户'}！`}
          description="您已登录，可以使用文件上传功能。"
          type="success"
          showIcon
          className="mb-6"
          action={
            <Link href="/upload">
              <Button size="small" type="primary" icon={<UploadOutlined />}>
                去上传
              </Button>
            </Link>
          }
        />
      )}

      <Row gutter={[16, 16]} className="mb-24">
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="活跃用户"
              value={1128}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="文章总数"
              value={93}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="总阅读量"
              value={12580}
              prefix={<EyeOutlined />}
              suffix={<ArrowUpOutlined style={{ color: '#cf1322' }} />}
            />
          </Card>
        </Col>
      </Row>

      <Card title="技术栈特性">
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, lg: 4 }}
          dataSource={features}
          renderItem={(item) => (
            <List.Item>
              <Card size="small" className="card-hover">
                <Tag color={item.color} className="mb-2">
                  {item.title}
                </Tag>
                <Paragraph className="m-0 text-sm">
                  {item.desc}
                </Paragraph>
              </Card>
            </List.Item>
          )}
        />
      </Card>
    </div>
  )
}
