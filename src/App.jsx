// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { Blog } from './pages/Blog.jsx'
// import { Signup } from './pages/Signup.jsx'
// import { Login } from './pages/Login.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import PropTypes from 'prop-types'

const queryClient = new QueryClient()
// const router = new createBrowserRouter([
//   {
//     path: '/',
//     element: <Blog />
//   },
//   {
//     path: '/signup',
//     element: <Signup />,
//   },
//   {
//     path: '/login',
//     element: <Login />,
//   }

// ])


export function App({children}) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        {children}
        {/* <RouterProvider router={router} /> */}
      </AuthContextProvider>
    </QueryClientProvider>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired
}

// export default App
