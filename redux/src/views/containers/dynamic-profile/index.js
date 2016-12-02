import { connect } from 'react-redux'
import ProfileBox from '../../components/profile/profile-box'

const mapStateToProps = (state, ownProps) => {
  let auth = state.auth.getIn(["user"])
  let attributes = {}
  let onProfile = false
  let isMine = false

  let userIdParam = state.router.params.userid

  if (userIdParam) {
    // get the profiles info into attribtues

    // We are on a profile
    onProfile = true

    if (auth.getIn(["isSignedIn"])) {
      if (auth.getIn(["attributes"]).id === userIdParam) {
        isMine = true
      }
    }
  } else {
    if (auth.getIn(["isSignedIn"])) {
      attributes = auth.getIn(["attributes"]).toJS()
    }
  }

  return {
    attributes,
    onProfile,
    isMine
  }
}

const DynamicProfile = connect(
  mapStateToProps
)(ProfileBox)

export default DynamicProfile
