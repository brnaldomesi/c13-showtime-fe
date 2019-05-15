import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import { jsonToQueryString, parseQueryString } from 'utils/helpers'

const withRouterAndQueryParams = WrappedComponent => {
  class QueryParamsWrapper extends Component {
    static propTypes = {
      location: PropTypes.object.isRequired
    }

    pushWithQuery = ({ location, queryParams }) => {
      const { history } = this.props
  
      history.push({
        ...location,
        search: jsonToQueryString(queryParams)
      })
    }

    render() {
      const queryParams = parseQueryString(location.search)
      return (
        <WrappedComponent
          {...this.props}
          queryParams={queryParams}
          pushWithQuery={this.pushWithQuery}
        />
      )
    }
  }

  return withRouter(QueryParamsWrapper)
}

export default withRouterAndQueryParams
