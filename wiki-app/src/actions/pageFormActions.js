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
  return function(dispatch) {
    dispatch(setNewPageName(newPageInfo.name))
    dispatch(setNewPageSlug(newPageInfo.slug))
  }
}

export function setNewPageName(newPageName) {
  let errors = []
  if(newPageName === '') {
    errors.push(['Name', 'Page must have a name'])
  }
  if(!errors.length) {
    errors = [['Name', null]]
  }
  return {
    type: 'pageForm.SET_NEW_PAGE_NAME',
    name: newPageName,
    errors
  }
}

export function setNewPageSlug(newPageSlug) {
  let errors = []
  const reservedSlugs = ['dataset', 'new', 'edit']
  const slug = newPageSlug
    .trim()
    .replace(/[\s./\\]/g, '-')
    .replace(/[^\w-]/g, '')
    .replace(/[-]{2,}/g, '-')
    .replace(/[_]{2,}/g, '_')
    .replace(/[-_]{2,}/g, '-')
    .replace(/^[-_]+/, "")
    .replace(/[-_]+$/, "")
  if(slug !== newPageSlug) {
    errors.push(['Slug', 'Invalid slug'])
  }
  if(reservedSlugs.includes(slug)) {
    errors.push(['Slug', `${slug} is a reserved slug`])
  }
  if(slug === '') {
    errors.push(['Slug', 'Page must have a slug'])
  }
  if(!errors.length) {
    errors = [['Slug', null]]
  }
  return {
    type: 'pageForm.SET_NEW_PAGE_SLUG',
    slug: newPageSlug,
    errors
  }
}
