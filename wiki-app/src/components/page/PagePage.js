import React, { Component } from 'react'
import { Header, Grid, Button, Modal, Message } from 'semantic-ui-react'

import { fetchPage, fetchDeletePage } from '../../actions/pageActions'
import connectedWithRoutes from '../../hocs/connectedWithRoutes'

import PageList from './PageList'

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
              <PageList />
            </Grid.Column>
          </Grid.Row>
        </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    username: state.account.userInfo.username,
    name: state.page.pageInfo.name,
    relativePath: state.page.pageInfo.relativePath
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPage: relativePath => dispatch(fetchPage(relativePath)),
    deletePage: relativePath => dispatch(fetchDeletePage(relativePath))
  }
}

export default connectedWithRoutes(mapStateToProps, mapDispatchToProps)(PagePage)
