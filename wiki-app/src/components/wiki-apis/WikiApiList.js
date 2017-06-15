import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Grid, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { fetchWikiApis } from '../../actions/wikiApiActions'

// function constructObject(relative_path, collector) {
//     let a = relative_path.split('/')
//     a = a.filter(n => n)
//     const slug = a.pop()
//     const val=a.shift()
//     if (a.length === 1) {
//       collector[val] = {[a[0]]: slug}
//     }
//     return collector
// }

class WikiApiList extends Component {

  componentDidMount() {
    this.props.fetchWikiApis()
  }

  // const paths = props.wikiApis.map(wikiApi => wikiApi.pages.map( page => page.relative_path ))
  // let collector = [{}, {}]
  // const nestedPaths = paths.map( (wiki, i) => wiki.map( (path) => constructObject(path, collector[i]) ) )
  render() {
    const apis = this.props.wikiApis.map( wikiApi => (
      <Grid.Column key={wikiApi.slug}>
        <Link to={`/${wikiApi.slug}`}>
          {wikiApi.name}
        </Link>
        <List>
          {wikiApi.pages.map( page => (

            <List.Item key={page.relative_path}>
              <List.Icon name='folder' />
              <List.Content>
                <List.Header>{page.name}</List.Header>
                <List.Description>{page.relative_path}</List.Description>
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Grid.Column>
    ))
    return (
      <div>
        <Header as="h2" content="Your APIs"/>
        <Grid columns='two' divided>
          <Grid.Row>
            {apis}
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    wikiApis: state.wikiApi.wikiApis,
    areLoading: state.wikiApi.areFetching
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchWikiApis: () => dispatch(fetchWikiApis())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WikiApiList)
