import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import withAuth from '../hocs/withAuth';
import { fetchEvents } from '../actions'
import { Button, Icon, Image as ImageComponent, Item, Label } from 'semantic-ui-react'
import _ from 'lodash'

class EventList extends Component {

  componentDidMount() {
    this.props.fetchEvents()
  }

  renderEvents() {
    console.log(this.props.events)
    return _.map(this.props.events, event => {
      return (
        // <li className="list-group-item">
          <Item>
          <Item.Image size='small' src={event.picture} />
          <Item.Content>
          <Item.Header as='a'>{event.title.toLowerCase()}</Item.Header>

          <Item.Description verticalAlign='middle'>
            <p>location: {event.location.toLowerCase()}</p>
            <p>date: {event.date.toLowerCase()}</p>
        </Item.Description>
        <Item.Extra>
          <Link to={`/events/${event.id}`}>
  <Button primary floated='right'>
    Interested
    <Icon name='right chevron' />
  </Button>
  </Link>
</Item.Extra>
      </Item.Content>
    </Item>
      )
    })
  }


  render() {
    console.log(this.props.events)
    return (
      <div>
        <div className="text-sx-right">
          {/* <Link className="btn btn-primary" to="/events/new">
            Create Event
          </Link> */}
        <h3> upcoming events... </h3>
          <Item.Group divided>
            {this.renderEvents()}
          </Item.Group>
      </div>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    events: state.events
  }
}

export default withAuth(connect(mapStateToProps, {fetchEvents})(EventList))
