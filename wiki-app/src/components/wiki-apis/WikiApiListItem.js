import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon, Accordion, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { fetchPage } from '../../actions/pageActions'

class WikiApiListItem extends Component {
  state = { active: false }

  toggleVisibility = () => this.setState(prevState => ({ active: !prevState.active }))

  render() {
    const { active } = this.state
    const { page, username } = this.props
    const hasSubPages = !!Object.keys(page.subPages).length
    let icon
    let subPages = null
    if(hasSubPages) {
      subPages = Object.keys(page.subPages).map( key => (
        <WikiApiListItem
          key={page.subPages[key].relative_path}
          page={page.subPages[key]}
        />
      ))
      if(active) {
        icon = (
          <Icon onClick={this.toggleVisibility} name='folder open'/>
        )
      } else {
        icon = (
          <Icon onClick={this.toggleVisibility} name='folder'/>
        )
      }
    } else {
      icon = (
        <Icon name='file'/>
      )
    }

    return (
      <Accordion>
        <Accordion.Title>
          {icon}
          <List.Content>
            <List.Header>
              {page.name}
            </List.Header>
            <List.Description as={Link} to={`/${username}/${page.relative_path}`}>
              <Icon name='linkify'/>{' /' + page.relative_path}
            </List.Description>
          </List.Content>
        </Accordion.Title>
        { hasSubPages
          ?
            <Accordion.Content active={active}>
              {subPages}
            </Accordion.Content>
          :
          <Accordion.Content active={false} />
        }
      </Accordion>
    )
  }
}

function mapStateToProps(state) {
  return {
    username: state.account.userInfo.username
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPage: relativePath => dispatch(fetchPage(relativePath))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WikiApiListItem)
