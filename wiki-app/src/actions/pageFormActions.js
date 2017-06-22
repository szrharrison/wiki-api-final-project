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

export function setNewSlug(newSlug) {
  let error = 'no errors'
  const slug = newSlug
    .trim()
    .replace(/[\s./\\]/g, '-')
    .replace(/[^\w-]/g, '')
    .replace(/[-]{2,}/g, '-')
    .replace(/[_]{2,}/g, '_')
    .replace(/[-_]{2,}/g, '-')
    .replace(/^[-_]+/, "")
    .replace(/[-_]+$/, "")
  if(slug !== newSlug) {
    error = 'Invalid slug'
  }
  if(slug === '') {
    error = 'Page must have a slug'
  }
  return {
    type: 'pageForm.SET_NEW_SLUG',
    newSlug,
    error
  }
}

export function setNewName(newName) {
  let error = 'no errors'
  if(newName === '') {
    error = 'Page must have a name'
  }
  return {
    type: 'pageForm.SET_NEW_TITLE',
    newName,
    error
  }
}
