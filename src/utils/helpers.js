import fp from 'lodash/fp'

export const parseQueryString = string =>
  fp.compose(
    JSON.parse,
    JSON.stringify,
    fp.reduce((acc, part) => {
      const [name, value] = part.split('=')
      acc[name] = decodeURIComponent(value || '')
      return acc
    }, {}),
    str => (str ? str.split('&') : []),
    fp.replace('?', '')
  )(string)

export const jsonToQueryString = obj => {
  const pairs = []
  obj &&
    Object.keys(obj).forEach(key => {
      if (obj[key]) {
        const value = encodeURIComponent(obj[key])
        value && pairs.push(`${key}=${value}`)
      }
    })

  return pairs.length ? `?${pairs.join('&')}` : ''
}

export const truncate = (input, len = 100) => {
  if (input && input.length > len) {
    return `${input.substring(0, len)}...`
  } else {
    return input
  }
}

export const capitalize = str =>
  typeof str === 'string' && str.length > 0 ? str.charAt(0).toUpperCase() + str.slice(1) : str
