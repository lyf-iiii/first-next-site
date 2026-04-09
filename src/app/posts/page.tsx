'use client'

import { useEffect } from 'react'
import { Card, List, Tag, Button, Space, Skeleton, Empty, Pagination } from 'antd'
import { EyeOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { usePostStore } from '@/stores'
import { formatDate } from '@/lib/utils'
import '@/styles/custom.css'

const categoryColors: Record<string, string> = {
  TECH: 'blue',
  LIFE: 'green',
  TRAVEL: 'orange',
  FOOD: 'red',
  OTHER: 'default',
}

const categoryLabels: Record<string, string> = {
  TECH: '技术',
  LIFE: '生活',
  TRAVEL: '旅行',
  FOOD: '美食',
  OTHER: '其他',
}

export default function PostsPage() {
  const { posts, total, isLoading, fetchPosts } = usePostStore()

  useEffect(() => {
    fetchPosts({ page: 1, pageSize: 10 })
  }, [fetchPosts])

  return (
    <div className="page-fade-in">
      <div className="flex-between mb-24">
        <h1>文章列表</h1>
        <Link href="/posts/create">
          <Button type="primary">写文章</Button>
        </Link>
      </div>

      {isLoading ? (
        <Card>
          <Skeleton active paragraph={{ rows: 4 }} />
        </Card>
      ) : posts.length === 0 ? (
        <Empty description="暂无文章" />
      ) : (
        <>
          <List
            grid={{ gutter: 16, xs: 1 }}
            dataSource={posts}
            renderItem={(post) => (
              <List.Item>
                <Card
                  hoverable
                  className="card-hover"
                  title={
                    <Link href={`/posts/${post.id}`} style={{ color: '#1890ff' }}>
                      {post.title}
                    </Link>
                  }
                  extra={<Tag color={categoryColors[post.category]}>{categoryLabels[post.category]}</Tag>}
                >
                  <p style={{ color: '#666', minHeight: '44px' }}>
                    {post.content?.slice(0, 100) || '暂无内容'}...
                  </p>
                  <Space style={{ marginTop: '16px', color: '#999', fontSize: '13px' }}>
                    <span><UserOutlined /> {post.author?.name || '匿名'}</span>
                    <span><ClockCircleOutlined /> {formatDate(post.createdAt)}</span>
                    <span><EyeOutlined /> {post.viewCount}</span>
                  </Space>
                </Card>
              </List.Item>
            )}
          />
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Pagination
              total={total}
              pageSize={10}
              showSizeChanger
              showQuickJumper
              showTotal={(total) => `共 ${total} 条`}
            />
          </div>
        </>
      )}
    </div>
  )
}
