import { connect } from 'react-redux'
import SearchResultInfo from '../../components/search-result-info'

const mapStateToProps = (state, ownProps) => {
  return {
    terms: state.ui.searchBar.terms.toJS()
  }
}

const SearchResultContainer = connect(
  mapStateToProps
)(SearchResultInfo)

export default SearchResultContainer
