import React from 'react'
import { connect } from 'react-redux'
import { Header, Grid, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function WikiApiList(props) {
  const apis = props.wikiApis.map( wikiApi => (
    <Grid.Column key={wikiApi.slug}>
      <Link to={`/wiki-apis/${wikiApi.slug}`}>
        {wikiApi.name}
      </Link>
      <List>
        <List.Item>
          <List.Icon name='folder' />
          <List.Content>
            <List.Header>src</List.Header>
            <List.Description>Source files for project</List.Description>
            <List.List>
              <List.Item>
                <List.Icon name='folder' />
                <List.Content>
                  <List.Header>site</List.Header>
                  <List.Description>Your site's theme</List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='folder' />
                <List.Content>
                  <List.Header>themes</List.Header>
                  <List.Description>Packaged theme files</List.Description>
                  <List.List>
                    <List.Item>
                      <List.Icon name='folder' />
                      <List.Content>
                        <List.Header>default</List.Header>
                        <List.Description>Default packaged theme</List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name='folder' />
                      <List.Content>
                        <List.Header>my_theme</List.Header>
                        <List.Description>Packaged themes are also available in this folder</List.Description>
                      </List.Content>
                    </List.Item>
                  </List.List>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='file' />
                <List.Content>
                  <List.Header>theme.config</List.Header>
                  <List.Description>Config file for setting packaged themes</List.Description>
                </List.Content>
              </List.Item>
            </List.List>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name='folder' />
          <List.Content>
            <List.Header>dist</List.Header>
            <List.Description>Compiled CSS and JS files</List.Description>
            <List.List>
              <List.Item>
                <List.Icon name='folder' />
                <List.Content>
                  <List.Header>components</List.Header>
                  <List.Description>Individual component CSS and JS</List.Description>
                </List.Content>
              </List.Item>
            </List.List>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name='file' />
          <List.Content>
            <List.Header>semantic.json</List.Header>
            <List.Description>Contains build settings for gulp</List.Description>
          </List.Content>
        </List.Item>
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

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    wikiApis: state.wikiApi.wikiApis
  }
}
export default connect(mapStateToProps)(WikiApiList)
