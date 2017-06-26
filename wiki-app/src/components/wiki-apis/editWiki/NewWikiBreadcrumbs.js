import React from 'react'
import { Breadcrumb, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'


const NewWikiBreadcrumbs = props => {
  const newPageSlugForm = {
    key: "new-wiki-slug-form",
    content: props.newWikiSlug ? props.newWikiSlug : "Wiki Slug"
  }
  const isSlugError = !!props.newWikiErrors.filter( error => error[0] === 'Slug' ).filter( error => error[1] ).length
  const slugErrors = props.newWikiErrors.filter( error => error[0] === 'Slug' )
  return (
    <div>
      <Breadcrumb icon='caret right' sections={newPageSlugForm} />
      <Message
        attached='bottom'
        error
        hidden={!isSlugError && !props.showErrors}
        icon='exclamation circle'
        header={'Error with Slug:'}
        content={slugErrors.map( (error, i) => `${i+1}. ${error[1]}\n`)}
      />
    </div>
  )
}

function mapStateToProps( state ) {
  return {
    newWikiSlug: state.wikiApi.newWikiInfo.slug,
    newWikiErrors: state.wikiApi.newWikiInfo.errors
  }
}
export default connect(mapStateToProps)(NewWikiBreadcrumbs)
