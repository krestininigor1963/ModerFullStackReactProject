import React from 'react'
import { getUserInfo } from '../api/users.js'
import PropTypes from 'prop-types'
import { useQuery } from '@tanstack/react-query'

export function User({ id }) {
  const userInfoQuery = useQuery({
    // Запрос к бэкэнду через библиотеку TanStack
    queryKey: ['users', id],
    queryFn: () => getUserInfo(id),
  })
  const userInfo = userInfoQuery.data ?? {}
  return <strong>{userInfo?.username ?? id}</strong>

  // return (
  //   <>
  //     <strong>{userInfo?.username ?? id}</strong>
  //   </>
  // )
}

User.propTypes = {
  id: PropTypes.string.isRequired,
}
