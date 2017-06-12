import React, { Component } from 'react'
import { Menu, Label, Segment } from 'semantic-ui-react'
import DatasetViewSwitcher from './datset/DatasetViewSwitcher'

class PageFormSidebar extends Component {

  state = { activeItem: 'inbox' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Segment inverted color="black">
        <Menu vertical inverted pointing secondary >
          <Menu.Item name='inbox' active={activeItem === 'inbox'} onClick={this.handleItemClick}>
            <DatasetViewSwitcher />
          </Menu.Item>

          <Menu.Item name='spam' active={activeItem === 'spam'} onClick={this.handleItemClick}>
            <Label>51</Label>
            Spam
          </Menu.Item>

          <Menu.Item name='updates' active={activeItem === 'updates'} onClick={this.handleItemClick}>
            <Label>1</Label>
            Updates
          </Menu.Item>
        </Menu>
      </Segment>
    )
  }
}

export default PageFormSidebar
