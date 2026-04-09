'use client'

import { useState } from 'react'
import { Card, Form, Input, Button, message, Typography } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const { Title } = Typography

export default function RegisterPage() {
  const [form] = Form.useForm()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values: {
    name: string
    email: string
    password: string
    confirmPassword: string
  }) => {
    if (values.password !== values.confirmPassword) {
      message.error('两次输入的密码不一致')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || '注册失败')
      }

      message.success('注册成功，请登录')
      router.push('/login')
    } catch (error) {
      message.error(error instanceof Error ? error.message : '注册失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '64px auto' }}>
      <Card>
        <Title level={3} style={{ textAlign: 'center', marginBottom: '32px' }}>
          用户注册
        </Title>
        <Form
          form={form}
          name="register"
          onFinish={handleSubmit}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: '请输入昵称' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="昵称"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '邮箱格式不正确' },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="邮箱"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码至少6位' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            rules={[{ required: true, message: '请确认密码' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="确认密码"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
            >
              注册
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            已有账号？ <Link href="/login">立即登录</Link>
          </div>
        </Form>
      </Card>
    </div>
  )
}
