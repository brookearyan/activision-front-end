import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import withAuth from '../hocs/withAuth';
import { fetchUserData } from '../actions'

class UserProfile extends Component {
  componentDidMount() {
    // console.log(this.props.match.params.id)
      this.props.fetchUserData(this.props.match.params.id)
  }

  render() {
    return (
      <div>
        {this.props.profile ? <h1>Username: {this.props.profile.username}</h1> : <h1>LOADING...</h1>}
        <div>
          <div>
            {this.props.profile ? <img src={this.props.profile.picture}/> : <h1>LOADING...</h1>}
          </div>
        {this.props.profile ? <h5>{this.props.profile.first_name}</h5> : <h1>LOADING...</h1>}
        {this.props.profile ? <h5>{this.props.profile.last_name}</h5> : <h1>LOADING...</h1>}
        {this.props.profile ? <h1>Email: {this.props.profile.email}</h1> : <h1>LOADING...</h1>}
      </div>
    <div>
      {this.props.profile ? <p>Bio: {this.props.profile.bio}</p> : <h1>LOADING...</h1>}
    </div>
      </div>
    )
  }
}

// function mapStateToProps({ auth }, ownProps) {
//   return { profile: auth }
// }

function mapStateToProps(state) {
  return {
    profile: state.auth.userProfile
  }
}

export default withAuth(connect(mapStateToProps, {fetchUserData}) (UserProfile))