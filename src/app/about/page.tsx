'use client'

import { Card, Timeline, Typography, List, Tag, Space } from 'antd'
import {
  RocketOutlined,
  CodeOutlined,
  DatabaseOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import '@/styles/custom.css'

const { Title, Paragraph } = Typography

const techStack = [
  { name: 'Next.js 14', category: 'Frontend', color: 'black' },
  { name: 'React 18', category: 'Frontend', color: 'blue' },
  { name: 'TypeScript', category: 'Language', color: 'blue' },
  { name: 'Ant Design', category: 'UI', color: 'red' },
  { name: 'Tailwind CSS', category: 'CSS', color: 'cyan' },
  { name: 'Zustand', category: 'State', color: 'orange' },
  { name: 'Prisma', category: 'ORM', color: 'green' },
  { name: 'SQLite', category: 'Database', color: 'purple' },
]

const timelineItems = [
  {
    dot: <RocketOutlined />,
    color: 'red',
    children: (
      <>
        <Title level={5}>项目启动</Title>
        <Paragraph>使用 Next.js 14 App Router 初始化项目，配置 TypeScript 和 Tailwind CSS</Paragraph>
      </>
    ),
  },
  {
    dot: <DatabaseOutlined />,
    color: 'blue',
    children: (
      <>
        <Title level={5}>数据库设计</Title>
        <Paragraph>使用 Prisma 定义数据模型，配置 SQLite 数据库和迁移</Paragraph>
      </>
    ),
  },
  {
    dot: <CodeOutlined />,
    color: 'green',
    children: (
      <>
        <Title level={5}>API 开发</Title>
        <Paragraph>实现 RESTful API 接口，包括用户认证、文章 CRUD 等功能</Paragraph>
      </>
    ),
  },
  {
    dot: <ThunderboltOutlined />,
    color: 'orange',
    children: (
      <>
        <Title level={5}>状态管理</Title>
        <Paragraph>集成 Zustand 进行全局状态管理，实现用户认证和文章状态</Paragraph>
      </>
    ),
  },
  {
    dot: <SafetyOutlined />,
    color: 'purple',
    children: (
      <>
        <Title level={5}>权限控制</Title>
        <Paragraph>实现 JWT 认证和路由守卫，保护敏感接口和页面</Paragraph>
      </>
    ),
  },
  {
    dot: <TeamOutlined />,
    color: 'cyan',
    children: (
      <>
        <Title level={5}>持续优化</Title>
        <Paragraph>性能优化、SEO 改进、用户体验提升</Paragraph>
      </>
    ),
  },
]

export default function AboutPage() {
  return (
    <div className="page-fade-in">
      <Title level={2}>关于项目</Title>

      <Card className="mb-24" title="技术栈">
        <List
          grid={{ gutter: 16, xs: 2, sm: 3, lg: 4 }}
          dataSource={techStack}
          renderItem={(item) => (
            <List.Item>
              <Space>
                <Tag color={item.color}>{item.name}</Tag>
                <span style={{ color: '#999', fontSize: '12px' }}>{item.category}</span>
              </Space>
            </List.Item>
          )}
        />
      </Card>

      <Card title="项目历程">
        <Timeline mode="alternate" items={timelineItems} />
      </Card>
    </div>
  )
}
