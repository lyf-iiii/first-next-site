'use client'

import { Card, Row, Col, Statistic, Button, Typography, Space, List, Tag } from 'antd'
import { ArrowUpOutlined, UserOutlined, FileTextOutlined, EyeOutlined } from '@ant-design/icons'
import Link from 'next/link'
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
  return (
    <div className="page-fade-in">
      <Card className="mb-24" style={{ textAlign: 'center', padding: '48px 0' }}>
        <Title level={1}>Next.js 全栈项目</Title>
        <Paragraph style={{ fontSize: '16px', color: '#666' }}>
          使用 Next.js 14 + Prisma + Ant Design + Zustand 构建的现代化全栈应用
        </Paragraph>
        <Space style={{ marginTop: '24px' }}>
          <Link href="/posts">
            <Button type="primary" size="large">浏览文章</Button>
          </Link>
          <Link href="/about">
            <Button size="large">了解更多</Button>
          </Link>
        </Space>
      </Card>

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
                <Tag color={item.color} style={{ marginBottom: '8px' }}>
                  {item.title}
                </Tag>
                <Paragraph style={{ margin: 0, fontSize: '14px' }}>
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
