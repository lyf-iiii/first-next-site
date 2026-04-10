'use client'

import React, { useState, useEffect } from 'react'
import { Card, Table, Image, Button, Space, Popconfirm, message, Typography, Tag } from 'antd'
import { DeleteOutlined, EyeOutlined, ReloadOutlined, FileOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

interface FileItem {
  name: string
  url: string
  size: number
  createdAt: string
  updatedAt: string
}

const { Title } = Typography

export default function FilesPage() {
  const [files, setFiles] = useState<FileItem[]>([])
  const [loading, setLoading] = useState(false)

  const fetchFiles = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/files')
      const result = await response.json()
      if (result.success) {
        setFiles(result.data)
      } else {
        message.error(result.error)
      }
    } catch (error) {
      message.error('获取文件列表失败')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (filename: string) => {
    try {
      const response = await fetch(`/api/files?name=${encodeURIComponent(filename)}`, {
        method: 'DELETE',
      })
      const result = await response.json()
      if (result.success) {
        message.success('删除成功')
        fetchFiles()
      } else {
        message.error(result.error)
      }
    } catch (error) {
      message.error('删除失败')
    }
  }

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const isImage = (filename: string) => {
    return /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(filename)
  }

  useEffect(() => {
    fetchFiles()
  }, [])

  const columns = [
    {
      title: '预览',
      dataIndex: 'url',
      key: 'preview',
      width: 100,
      render: (url: string, record: FileItem) =>
        isImage(record.name) ? (
          <Image
            src={url}
            alt={record.name}
            style={{ width: 60, height: 60, objectFit: 'cover' }}
            preview={{ src: url }}
          />
        ) : (
          <div
            style={{
              width: 60,
              height: 60,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#f0f0f0',
              borderRadius: 4,
            }}
          >
            <FileOutlined style={{ fontSize: 24, color: '#999' }} />
          </div>
        ),
    },
    {
      title: '文件名',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      render: (name: string, record: FileItem) => (
        <a href={record.url} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      ),
    },
    {
      title: '类型',
      key: 'type',
      width: 100,
      render: (_: any, record: FileItem) => {
        const ext = record.name.split('.').pop()?.toUpperCase()
        return <Tag color="blue">{ext || '未知'}</Tag>
      },
    },
    {
      title: '大小',
      dataIndex: 'size',
      key: 'size',
      width: 100,
      render: (size: number) => formatSize(size),
    },
    {
      title: '上传时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      fixed: 'right',
      render: (_: any, record: FileItem) => (
        <Space size="small">
          <Button
            type="text"
            size="small"
            icon={<EyeOutlined />}
            href={record.url}
            target="_blank"
            title="查看"
          />
          <Popconfirm
            title="确认删除"
            description={`确定要删除 ${record.name} 吗？`}
            onConfirm={() => handleDelete(record.name)}
            okText="删除"
            cancelText="取消"
            okButtonProps={{ danger: true }}
          >
            <Button type="text" danger size="small" icon={<DeleteOutlined />} title="删除" />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card
        title={<Title level={3}>文件管理</Title>}
        extra={
          <Space>
            <Button icon={<ReloadOutlined />} onClick={fetchFiles} loading={loading}>
              刷新
            </Button>
            <Button type="primary" href="/upload">
              上传新文件
            </Button>
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={files}
          rowKey="name"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 个文件`,
          }}
        />
      </Card>
    </div>
  )
}
