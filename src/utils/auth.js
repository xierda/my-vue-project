import Cookies from 'js-cookie'
import { cacheNameDataFun } from '@/cache'

const TokenKey = cacheNameDataFun().token
const TokenKeyTemporary = cacheNameDataFun().tokenTemporary

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getTokenTemporary() {
  return Cookies.get(TokenKeyTemporary)
}

export function setTokenTemporary(token) {
  return Cookies.set(TokenKeyTemporary, token)
}

export function removeTokenTemporary() {
  return Cookies.remove(TokenKeyTemporary)
}
