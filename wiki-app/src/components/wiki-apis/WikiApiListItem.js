import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Item, Icon, Accordion } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { fetchPage } from '../../actions/pageActions'

class WikiApiListItem extends Component {
  state = { active: false }

  toggleVisibility = () => this.setState({ active: !this.state.active })

  render() {
    const { active } = this.state
    const { page, username } = this.props
    let itemHeader
    if(Object.keys(page.subPages).length) {
      if(active) {
        itemHeader = (
          <Item.Header onClick={this.toggleVisibility}>
            <Icon name='folder open'/>
            {page.name}
          </Item.Header>
        )
      } else {
        itemHeader = (
          <Item.Header onClick={this.toggleVisibility}>
            <Icon name='folder'/>
            {page.name}
          </Item.Header>
        )
      }
    } else {
      itemHeader = (
        <Item.Header>
          <Icon name='file'/>
          {page.name}
        </Item.Header>
      )
    }

    return (
      <div>
        <Accordion.Title>
          <Item>
            {itemHeader}
            <Item.Extra>
              <Link
                to={`/${username}/${page.relative_path}`}
                onClick={() => this.props.fetchPage(page.relative_path)}
              >
                {page.relative_path}
              </Link>
            </Item.Extra>
          </Item>
        </Accordion.Title>
        { Object.keys(page.subPages).length
          ?
            <Accordion.Content active={active} style={{marginLeft: '1.75rem'}}>
              <Accordion>
                {Object.keys(page.subPages).map( key => (
                  <WikiApiListItem
                    key={page.subPages[key].relative_path}
                    page={page.subPages[key]}
                  />
                ))}
              </Accordion>
            </Accordion.Content>
          :
            null
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    username: state.auth.username
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPage: relativePath => dispatch(fetchPage(relativePath))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WikiApiListItem)
