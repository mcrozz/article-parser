// utils -> retrieve

import fetch from 'cross-fetch'

const profetch = async (url, options = {}) => {
  const { proxy = {}, signal = null } = options
  const {
    target,
    headers = {},
  } = proxy
  const res = await fetch(target + encodeURIComponent(url), {
    headers,
    signal,
  })
  return res
}

export default async (url, options = {}) => {
  const { proxy } = options
  const res = proxy ? await profetch(url, { proxy, signal: options.signal }) : await fetch(url, options)

  const status = res.status
  if (status >= 400) {
    throw new Error(`Request failed with error code ${status}`)
  }
  const buffer = await res.arrayBuffer()
  return buffer
}
