export function toggleBoolean(fieldName) {
  return {
    type: 'TOGGLE_BOOLEAN',
    name: fieldName
  }
}

export function setFontSize(fontSize) {
  return {
    type: 'SET_FONT_SIZE',
    fontSize: fontSize
  }
}

export function setSlug(slug) {
  return {
    type: 'SET_SLUG',
    slug
  }
}

export function setNewSlug(newSlug) {
  return {
    type: 'SET_NEW_SLUG',
    newSlug
  }
}

export function setNewName(newName) {
  return {
    type: 'SET_NEW_TITLE',
    newName
  }
}
