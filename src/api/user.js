import request from '@/utils/request'
import config from '@/config'

const modelUrl = config.baseUrl + 'sensitivearea/system/userApi/'

export const getVerificationCode = params => {
  return request({
    url: modelUrl + 'getVerificationCode',
    method: 'get',
    params
  })
}

export const modifyUserPwdByMessage = data => {
  return request({
    url: modelUrl + 'modifyUserPwdByMessage',
    method: 'post',
    data
  })
}

export const getuserVerifyCode = data => {
  return request({
    url: modelUrl + 'getuserVerifyCode',
    method: 'post',
    data
  })
}

export const login = data => {
  return request({
    url: modelUrl + 'login',
    method: 'post',
    data
  })
}

export const logout = params => {
  return request({
    url: modelUrl + 'logout',
    method: 'get',
    params
  })
}

export const modifyUserBaseInfo = data => {
  return request({
    url: modelUrl + 'modifyUserBaseInfo',
    method: 'post',
    data
  })
}

export const modifyUserPwd = data => {
  return request({
    url: modelUrl + 'modifyUserPwd',
    method: 'post',
    data
  })
}

export const queryUserList = data => {
  return request({
    url: modelUrl + 'queryUserList',
    method: 'post',
    data
  })
}

export const queryUserListSub = data => {
  return request({
    url: modelUrl + 'queryUserListSub',
    method: 'post',
    data
  })
}

export const addUser = data => {
  return request({
    url: modelUrl + 'addUser',
    method: 'post',
    data
  })
}

export const deleteUserByUserId = params => {
  return request({
    url: modelUrl + 'deleteUserByUserId',
    method: 'get',
    params
  })
}

export const queryUserByUserId = params => {
  return request({
    url: modelUrl + 'queryUserByUserId',
    method: 'get',
    params
  })
}

export const modifyUserByUserId = data => {
  return request({
    url: modelUrl + 'modifyUserByUserId',
    method: 'post',
    data
  })
}

export const disable = params => {
  return request({
    url: modelUrl + 'disable',
    method: 'get',
    params
  })
}

export const enable = params => {
  return request({
    url: modelUrl + 'enable',
    method: 'get',
    params
  })
}
