import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import withAuth from '../hocs/withAuth';
import UserEvents from './UserEvents'
import UserPieData from './UserDataChart'
import UserBarData from './UserDataBar'
import UserFollowers from './UserFollowers'
import UserFollowings from './UserFollowings'
import { fetchUserData, followUser, removeFollow, fetchCategoryList} from '../actions'
import { Grid, Segment, Image, Header } from 'semantic-ui-react'

class UserProfile extends Component {

  state = {
    id: null
  }

  componentDidMount() {
    // console.log(this.props.match.params.id)
    const id =this.props.match.params.id
    this.setState({id})
    this.getUserPageData()
    // console.log("NOW", this.props)
  }

  componentWillReceiveProps(nextP) {
    // console.log(this.props.match.params.id)

    const id =nextP.id
    if (this.state.id != id) {
      this.setState({id},this.getUserPageData)
    }
      // console.log("NOW", this.props)
  }

  getUserPageData = () =>{
    this.props.fetchUserData(this.props.match.params.id)
    this.props.fetchCategoryList()
  }

  hideButtons = () => {
    const currentUser = this.props.user
    // console.log("BEFORE ARIEL", this.props.match.params.id)
    // console.log("ARIEL", currentUser.id)
    if (this.props.match.params.id == currentUser.id) {
      return (
      null
      )
    } else {
      return (
        <Segment>
            <button onClick={this.addFollow}>follow</button>
            <button onClick={this.removeUserFollow}>unfollow</button>
          </Segment>
        )
    }
  }

  addFollow = () => {
    console.log(this.props)
    const followingUser = this.props.profile
    const currentUser = this.props.user
    console.log("followerId", followingUser.id, "userId", currentUser.id)
    this.props.followUser(followingUser.id, currentUser.id)
  }

  removeUserFollow = () => {
    console.log(this.props)
    const otherUser = this.props.profile
    const thisUser = this.props.user
    console.log("followerId", otherUser.id, "userId", thisUser.id)
    this.props.removeFollow(otherUser.id, thisUser.id)
  }

  render() {
    if (!this.props.profile){
      return(
        <div>loading</div>
      )
    }
    console.log("FOLLOW DATA", this.props.profile)
    console.log("ALMOST DONE", this.props.profile)
    console.log(this.props.categories)
    // debugger
    return (
      <Grid textAlign='center' columns={3} divided>
        <Grid.Row stretched>
          <Grid.Column>
            <Segment>
            <Image src={this.props.profile.picture} circular size='medium' centered />
          </Segment>
          <Segment>
          <h3 size="huge" textAlign='center'>
          {this.props.profile.username}
        </h3>
          <p>{this.props.profile.bio}</p>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment >
            {this.props.categories ?
              <UserPieData categoryArray={this.props.categories} userInfo={this.props.profile}/> :
            <h1>LOADING...</h1>}
          </Segment>
          <Segment >
            {this.props.categories ?
              <UserBarData categoryArray={this.props.categories} userInfo={this.props.profile}/> :
            <h1>LOADING...</h1>}
          </Segment>
        </Grid.Column>
          <Grid.Column>
            <Segment>
              <h3>
                {this.props.profile.first_name.toLowerCase()} {this.props.profile.last_name.toLowerCase()+"'"}s profile
              </h3>
              <p>email: {this.props.profile.email}</p>
              <br />
              <p>--</p>
              <br />
              {this.props.profile ?
              <Link to={`/profile/${this.props.profile.id}/followers`}>
                <p>followers: {this.props.profile.followers.length}</p>
              </Link> : <p>LOADING...</p>}
            {this.props.profile ?
              <Link to={`/profile/${this.props.profile.id}/following`}>
                <p> following: {this.props.profile.following.length}</p>
              </Link> : <h3>LOADING...</h3>}
            </Segment>
          <Segment>
            <p>
              <UserEvents userEvents={this.props.profile}/>
            </p>
          </Segment>
        </Grid.Column>
    </Grid.Row>
  </Grid>
    )
  }
}

// function mapStateToProps({ auth }, ownProps) {
//   return { profile: auth }
// }

function mapStateToProps(state) {
  return {
    profile: state.auth.userProfile,
    categories: state.categories,
    loggedIn: !!state.auth.currentUser.id
  }
}

export default withAuth(connect(mapStateToProps, {fetchUserData, followUser, removeFollow, fetchCategoryList}) (UserProfile))
