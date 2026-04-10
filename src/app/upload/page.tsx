'use client'

import React, { useState } from 'react'
import { Card, Form, Button, message, Space, Divider } from 'antd'
import FileUpload from '../components/Upload/FileUpload'
import MultiFileUpload from '../components/Upload/MultiFileUpload'

export default function UploadPage() {
  const [singleFile, setSingleFile] = useState('')
  const [multiFiles, setMultiFiles] = useState<string[]>([])
  const [form] = Form.useForm()

  const handleSubmit = (values: any) => {
    console.log('表单数据:', values)
    message.success('提交成功！查看控制台输出')
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1>文件上传示例</h1>

      <Card title="单文件上传" className="mb-6">
        <FileUpload
          value={singleFile}
          onChange={setSingleFile}
          accept="image/*,.pdf"
          maxSize={5}
        />
        {singleFile && (
          <div className="mt-4">
            <strong>上传结果：</strong>
            <a href={singleFile} target="_blank" rel="noopener noreferrer">
              {singleFile}
            </a>
          </div>
        )}
      </Card>

      <Card title="多文件上传" className="mb-6">
        <MultiFileUpload
          value={multiFiles}
          onChange={setMultiFiles}
          accept="image/*"
          maxSize={5}
          maxCount={5}
        />
      </Card>

      <Card title="表单中使用上传组件">
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="头像"
            name="avatar"
            rules={[{ required: true, message: '请上传头像' }]}
          >
            <FileUpload accept="image/*" maxSize={2} />
          </Form.Item>

          <Form.Item
            label="相册"
            name="gallery"
            initialValue={[]}
          >
            <MultiFileUpload accept="image/*" maxSize={5} maxCount={9} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
