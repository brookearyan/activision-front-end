import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const EventUserList = ({userList}) => {
  // if (!props){
  //   return <div> Loading </div>
  // }
  console.log(userList)
  const users = userList.map((user) => {
      return (
        <p>
        <Link to={`/profile/${user.id}`}>
      {user.username}
    </Link>
  </p>
  )
  })

  return (
    <div>
    <h3> current guest list </h3>
    <p>{users}</p>
  </div>

  )
}



export default EventUserList
