export function getWikiApis() {
  return fetch('http://localhost:3000/api/v1/api_wikis', {
    headers: {
      'Authorization': localStorage.getItem('jwt')
    }
  }).then( resp => resp.json() )
}

export function getWikiApi(slug) {
  return fetch(`http://localhost:3000/api/v1/api_wikis/${slug}`, {
    headers: {
      'Authorization': localStorage.getItem('jwt')
    }
  }).then( resp => resp.json() )
}

export function getPage(relativePath) {
  return fetch(`http://localhost:3000/api/v1/pages/${relativePath}`, {
    headers: {
      'Authorization': localStorage.getItem('jwt')
    }
  }).then( resp => resp.json() )
}

export function logIn(account) {
  return fetch('http://localhost:3000/api/v1/auth', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( account )
  })
    .then( resp => resp.json() )
}

export function refreshAccount() {
  return fetch('http://localhost:3000/api/v1/auth', {
    headers: {
      'Authorization': localStorage.getItem('jwt')
    }
  }).then( resp => resp.json() )
}

export function signUp(account) {
  return fetch('http://localhost:3000/api/v1/signup', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( { account } )
  })
    .then( resp => resp.json() )
}

export function createPage(page) {
  return fetch('http://localhost:3000/api/v1/pages', {
    method: 'POST',
    headers: {
      'Authorization': localStorage.getItem('jwt'),
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( { page } )
  }).then( resp => resp.json() )
}

export function updatePage(page) {
  return fetch(`http://localhost:3000/api/v1/pages/${page.relativePath}`, {
    method: 'PATCH',
    headers: {
      'Authorization': localStorage.getItem('jwt'),
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( { page } )
  }).then( resp => resp.json() )
}

export function deletePage(relativePath) {
  return fetch(`http://localhost:3000/api/v1/pages/${relativePath}`, {
    method: 'DELETE',
    headers: {
      'Authorization': localStorage.getItem('jwt')
    }
  }).then( resp => resp.json() )
}

export function getDataset(relativePath) {
  return fetch(`http://localhost:3000/api/v1/pages/${relativePath}/dataset`, {
    headers: {
      'Authorization': localStorage.getItem('jwt')
    }
  }).then( resp => resp.json() )
}

export function updateDatasetRequest(dataset, relativePath) {
  return fetch(`http://localhost:3000/api/v1/pages/${relativePath}/dataset`, {
    method: 'PATCH',
    headers: {
      'Authorization': localStorage.getItem('jwt'),
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( { dataset })
  }).then( resp => resp.json() )
}
