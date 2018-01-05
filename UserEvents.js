import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const UserEvents = (props) => {
  if (!props.userEvents){
    return <div> loading </div>
  }

  // console.log(props.userEvents.events)
  const events = props.userEvents.events.map((event) => {
      return (
        <p>
        <Link to={`/events/${event.id}`}>
      {event.title.toLowerCase()}
    </Link>
  </p>
  )
  })

  return (
    <div>
    <h3> upcoming events </h3>
    <h3>{events}</h3>
  </div>

  )
}



export default UserEvents
