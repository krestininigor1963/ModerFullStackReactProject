import { useLoaderData } from 'react-router-dom'

import { Blog } from './pages/Blog.jsx'
import { Signup } from './pages/Signup.jsx'
import { Login } from './pages/Login.jsx'
import { getPosts } from './api/posts.js'

export const routes = [
  {
    path: '/',
    loader: getPosts,
    Component() {
      const posts = useLoaderData()
      return <Blog initialData={posts} />
    },
    element: <Blog />
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  }

]
