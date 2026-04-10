'use client'

import React, { useState, useRef } from 'react'
import { Upload, Button, message, Progress, Image } from 'antd'
import { UploadOutlined, LoadingOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons'
import type { UploadFile, UploadProps } from 'antd/es/upload'

interface FileUploadProps {
  value?: string
  onChange?: (url: string) => void
  accept?: string
  maxSize?: number // MB
  disabled?: boolean
}

export default function FileUpload({
  value,
  onChange,
  accept = 'image/*',
  maxSize = 5,
  disabled = false,
}: FileUploadProps) {
  const [loading, setLoading] = useState(false)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>(
    value
      ? [
          {
            uid: '-1',
            name: '已上传文件',
            status: 'done',
            url: value,
          },
        ]
      : []
  )

  const handleUpload = async (file: File) => {
    // 检查文件大小
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
        onChange?.(result.data.url)
        setFileList([
          {
            uid: Date.now().toString(),
            name: file.name,
            status: 'done',
            url: result.data.url,
          },
        ])
      } else {
        message.error(result.error || '上传失败')
      }
    } catch (error) {
      message.error('上传失败，请稍后重试')
    } finally {
      setLoading(false)
    }

    return false // 阻止默认上传行为
  }

  const handleRemove = () => {
    setFileList([])
    onChange?.('')
  }

  const uploadProps: UploadProps = {
    name: 'file',
    listType: 'picture-card',
    fileList,
    accept,
    disabled: disabled || loading,
    beforeUpload: handleUpload,
    onRemove: handleRemove,
    onPreview: () => setPreviewVisible(true),
  }

  return (
    <div>
      <Upload {...uploadProps}>
        {fileList.length === 0 && (
          <div>
            {loading ? <LoadingOutlined /> : <UploadOutlined />}
            <div className="mt-2">{loading ? '上传中...' : '点击上传'}</div>
          </div>
        )}
      </Upload>

      {/* 图片预览 */}
      {value && (
        <Image
          style={{ display: 'none' }}
          src={value}
          preview={{
            visible: previewVisible,
            onVisibleChange: setPreviewVisible,
          }}
        />
      )}

      <div className="mt-2 text-gray-400 text-xs">
        支持格式: JPG, PNG, GIF, WEBP, PDF
        <br />
        最大 {maxSize}MB
      </div>
    </div>
  )
}
