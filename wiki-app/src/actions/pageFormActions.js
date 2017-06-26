export function toggleBoolean(fieldName) {
  return {
    type: 'pageForm.TOGGLE_BOOLEAN',
    name: fieldName
  }
}

export function setFontSize(fontSize) {
  return {
    type: 'pageForm.SET_FONT_SIZE',
    fontSize: fontSize
  }
}

export function setSlug(slug) {
  return {
    type: 'page.SET_SLUG',
    slug
  }
}

export function setNewPageInfo(newPageInfo) {
  let errors = []
  const slug = newPageInfo.slug
    .trim()
    .replace(/[\s./\\]/g, '-')
    .replace(/[^\w-]/g, '')
    .replace(/[-]{2,}/g, '-')
    .replace(/[_]{2,}/g, '_')
    .replace(/[-_]{2,}/g, '-')
    .replace(/^[-_]+/, "")
    .replace(/[-_]+$/, "")
  if(slug !== newPageInfo.slug) {
    errors.push(['Slug', 'Invalid slug'])
  }
  if(slug === 'dataset' || slug === 'new') {
    errors.push(['Slug', `${slug} is a reserved slug`])
  }
  if(slug === '') {
    errors.push(['Slug', 'Page must have a slug'])
  }
  if(newPageInfo.name === '') {
    errors.push(['Name', 'Page must have a name'])
  }
  if(!errors.length) {
    errors = [[null, null]]
  }
  return {
    type: 'pageForm.SET_NEW_PAGE_INFO',
    newPageInfo: {
      ...newPageInfo,
      errors
    }
  }
}
