import { connect } from 'react-redux'
import TweetFeed from '../../components/tweet-feed'

const mapStateToProps = (state, ownProps) => ({
  tweets: state.entities.tweets.reverse()
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleReaction: (id, type, polarity) => {
      dispatch({
        type: 'TOGGLE_REACTION',
        payload: { id, type, polarity }
      })
  }
})

const TweetFeedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TweetFeed)

export default TweetFeedContainer
