import React from 'react'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../api/users.js'
import { useAuth } from '../context/AuthContext.jsx'

export function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const [, setToken] = useAuth()

  const loginMutation = useMutation({
    mutationFn: () => login({ username, password }),
    onSuccess: (data) => {
      setToken(data.token)
      navigate('/')
    },
    onError: () => alert('failed to Login!'),
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    loginMutation.mutate()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Link to='/'>Back to main page</Link>
      <hr />
      <br />
      <div>
        <label htmlFor='create-username'>User Name</label>
        <input
          type='text'
          name='create-username'
          value={username}
          id='create-username'
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='create-password'>Password</label>
        <input
          type='password'
          name='create-password'
          value={password}
          id='create-password'
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <input
        type='submit'
        value={loginMutation.isPending ? 'Logging in...' : 'Log In'}
        disabled={!username || !password || loginMutation.isPending}
      />
    </form>
  )
}
