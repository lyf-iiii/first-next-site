'use client'

import React, { useState } from 'react'
import { Upload, Button, message, List, Image } from 'antd'
import { UploadOutlined, LoadingOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import type { UploadFile, UploadProps } from 'antd/es/upload'

interface MultiFileUploadProps {
  value?: string[]
  onChange?: (urls: string[]) => void
  accept?: string
  maxSize?: number // MB
  maxCount?: number
  disabled?: boolean
}

export default function MultiFileUpload({
  value = [],
  onChange,
  accept = 'image/*',
  maxSize = 5,
  maxCount = 10,
  disabled = false,
}: MultiFileUploadProps) {
  const [loading, setLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewVisible, setPreviewVisible] = useState(false)

  const handleUpload = async (file: File) => {
    if (value.length >= maxCount) {
      message.error(`最多只能上传 ${maxCount} 个文件`)
      return false
    }

    if (file.size > maxSize * 1024 * 1024) {
      message.error(`文件大小不能超过 ${maxSize}MB`)
      return false
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        message.success('上传成功')
        const newUrls = [...value, result.data.url]
        onChange?.(newUrls)
      } else {
        message.error(result.error || '上传失败')
      }
    } catch (error) {
      message.error('上传失败，请稍后重试')
    } finally {
      setLoading(false)
    }

    return false
  }

  const handleRemove = (url: string) => {
    const newUrls = value.filter((u) => u !== url)
    onChange?.(newUrls)
  }

  const handlePreview = (url: string) => {
    setPreviewImage(url)
    setPreviewVisible(true)
  }

  const uploadProps: UploadProps = {
    name: 'file',
    accept,
    disabled: disabled || loading || value.length >= maxCount,
    beforeUpload: handleUpload,
    showUploadList: false,
    multiple: true,
  }

  return (
    <div>
      {/* 已上传文件列表 */}
      <List
        grid={{ gutter: 16, xs: 2, sm: 3, md: 4, lg: 6 }}
        dataSource={value}
        renderItem={(url) => (
          <List.Item>
            <div className="relative border border-gray-300 rounded-lg overflow-hidden">
              <Image
                src={url}
                alt="上传的图片"
                className="w-full h-24 object-cover"
                preview={false}
              />
              <div className="absolute top-0 right-0 p-1 bg-black/50 rounded-bl-lg">
                <EyeOutlined
                  className="text-white mr-2 cursor-pointer"
                  onClick={() => handlePreview(url)}
                />
                <DeleteOutlined
                  className="text-white cursor-pointer"
                  onClick={() => handleRemove(url)}
                />
              </div>
            </div>
          </List.Item>
        )}
      />

      {/* 上传按钮 */}
      {value.length < maxCount && (
        <Upload {...uploadProps}>
          <Button icon={loading ? <LoadingOutlined /> : <UploadOutlined />} disabled={disabled || loading}>
            {loading ? '上传中...' : '上传文件'}
          </Button>
        </Upload>
      )}

      <div className="mt-2 text-gray-400 text-xs">
        已上传 {value.length}/{maxCount} 个文件，最大 {maxSize}MB/个
      </div>

      {/* 预览 */}
      <Image
        style={{ display: 'none' }}
        src={previewImage}
        preview={{
          visible: previewVisible,
          onVisibleChange: setPreviewVisible,
          src: previewImage,
        }}
      />
    </div>
  )
}
