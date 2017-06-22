import React, { Component } from 'react'
import { Header, List, Grid, Button, Modal, Message, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { fetchPage, fetchDeletePage } from '../../actions/pageActions'
import connectedWithRoutes from '../../hocs/connectedWithRoutes'

class PagePage extends Component {
  state = {
    open: false
  }

  showModal = () => this.setState({ open: true })

  closeModal = () => this.setState({ open: false })

  deletePage = () => {
    this.setState({ open: false })
    this.props.deletePage(this.props.relativePath)
    this.props.history.push(`/${this.props.username}/${this.props.relativePath.split('/').slice(0,-1).join('/')}`)
  }

  render() {
    let pages = null
    if(this.props.subPages) {
      pages = this.props.subPages.map( subPage => (
        <List.Item
          key={subPage.slug}
          as={Link}
          to={`/${this.props.username}/${this.props.relativePath}/${subPage.slug}`}
          onClick={() => this.props.fetchPage(`${this.props.relativePath}/${subPage.slug}`)}
        >
          <List.Icon name="file" verticalAlign="middle" />
          <List.Content>
            <List.Header>{subPage.name}</List.Header>
            <List.Description><Icon name='linkify'/>{'/ ' + subPage.slug}</List.Description>
          </List.Content>
        </List.Item>
        ))
      }
      return (
        <Grid inverted divided="vertically" padded>
          <Grid.Row  color="black" verticalAlign="middle" columns="equal">
            <Grid.Column>
              <Header inverted as="h2" content={this.props.name} />
            </Grid.Column>
            <Grid.Column width={3}>
              <Modal
                dimmer="blurring"
                closeIcon="close"
                trigger={
                  <Button
                    color="red"
                    icon="trash"
                    content="Delete"
                    onClick={this.showModal}
                  />
                }
                onClose={this.closeModal}
                open={this.state.open}
                basic
              >
                <Modal.Header>
                  {`Are you sure you want to delete ${this.props.name}?`}
                </Modal.Header>
                <Modal.Content>
                  <Modal.Description>
                    <Message
                      warning
                      header="Deleting this page will also delete all of its sub pages."
                      content={`When you delete ${this.props.name}, all pages that are nested below it will be deleted as well.`}
                    />
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                  <Button
                    basic
                    inverted
                    onClick={this.closeModal}
                    content="Cancel"
                  />
                  <Button
                    inverted
                    color="red"
                    icon="trash"
                    onClick={this.deletePage}
                    content="Delete This Page"
                  />
                </Modal.Actions>
              </Modal>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row color="black">
            <Grid.Column>
              <List inverted animated selection verticalAlign="middle">
                <List.Item as={Link} to={`/${this.props.username}/${this.props.relativePath}/new`}>
                  <List.Icon name='add' />
                  <List.Content>
                    Add a page
                  </List.Content>
                </List.Item>
                {pages}
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    username: state.auth.userInfo.username,
    name: state.page.name,
    subPages: state.page.subPages,
    relativePath: state.page.relativePath

  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPage: relativePath => dispatch(fetchPage(relativePath)),
    deletePage: relativePath => dispatch(fetchDeletePage(relativePath))
  }
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(PagePage)
