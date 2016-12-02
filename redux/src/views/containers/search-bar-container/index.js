import { connect } from 'react-redux'
import SearchBar from '../../components/search-bar'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSearch: (value, option) => {

      dispatch({
        type: 'ROUTER_PUSH',
        payload: '/home/search'
      })

      let termsListArray = value.split(' ')
      let terms = []

      termsListArray.forEach(function(element) {
        let parsed = element
        let term_type = 'STRING'

        if(element.indexOf('#') == 0){
          parsed = element.slice(1)
          term_type = 'HASHTAG'
        } else if (element.indexOf('@') == 0) {
          parsed = element.slice(1)
          term_type = 'MENTION'
        }

        terms.push({
          term: parsed,
          term_type
        });
      });

      dispatch({
        type: 'NEW_SEARCH',
        payload: { terms }
      })
    }
  }
}

const SearchBarContainer = connect(
  null,
  mapDispatchToProps
)(SearchBar)

export default SearchBarContainer
