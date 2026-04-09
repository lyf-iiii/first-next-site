import { create } from 'zustand'
import { Post, PaginatedResponse, PaginationParams } from '@/types'

interface PostState {
  posts: Post[]
  currentPost: Post | null
  total: number
  isLoading: boolean
  error: string | null
  fetchPosts: (params?: PaginationParams) => Promise<void>
  fetchPost: (id: string) => Promise<void>
  createPost: (data: Partial<Post>) => Promise<void>
  updatePost: (id: string, data: Partial<Post>) => Promise<void>
  deletePost: (id: string) => Promise<void>
  setCurrentPost: (post: Post | null) => void
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  currentPost: null,
  total: 0,
  isLoading: false,
  error: null,

  fetchPosts: async (params = { page: 1, pageSize: 10 }) => {
    set({ isLoading: true, error: null })
    try {
      const queryParams = new URLSearchParams({
        page: String(params.page || 1),
        pageSize: String(params.pageSize || 10),
      })

      const response = await fetch(`/api/posts?${queryParams}`)
      if (!response.ok) throw new Error('获取文章列表失败')

      const data: PaginatedResponse<Post> = await response.json()
      set({ posts: data.data, total: data.total })
    } catch (error) {
      set({ error: error instanceof Error ? error.message : '未知错误' })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchPost: async (id) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`/api/posts/${id}`)
      if (!response.ok) throw new Error('获取文章详情失败')

      const data = await response.json()
      set({ currentPost: data })
    } catch (error) {
      set({ error: error instanceof Error ? error.message : '未知错误' })
    } finally {
      set({ isLoading: false })
    }
  },

  createPost: async (data) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('创建文章失败')

      // 刷新列表
      get().fetchPosts()
    } catch (error) {
      set({ error: error instanceof Error ? error.message : '未知错误' })
    } finally {
      set({ isLoading: false })
    }
  },

  updatePost: async (id, data) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('更新文章失败')

      // 刷新列表和当前文章
      get().fetchPosts()
      if (get().currentPost?.id === id) {
        get().fetchPost(id)
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : '未知错误' })
    } finally {
      set({ isLoading: false })
    }
  },

  deletePost: async (id) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('删除文章失败')

      // 从列表中移除
      set({
        posts: get().posts.filter((post) => post.id !== id),
        currentPost: get().currentPost?.id === id ? null : get().currentPost,
      })
    } catch (error) {
      set({ error: error instanceof Error ? error.message : '未知错误' })
    } finally {
      set({ isLoading: false })
    }
  },

  setCurrentPost: (post) => set({ currentPost: post }),
}))
