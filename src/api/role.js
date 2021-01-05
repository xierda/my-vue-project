import request from '@/utils/request'
import config from '@/config'

const modelUrl = `${config.baseUrl}${config.systemUrl}system/role/`

export const selectAllRoles = params => {
  return request({
    url: modelUrl + 'selectAllRoles',
    method: 'get',
    params
  });
};

export const getRoleInfoByRoleidV1 = params => {
  return request({
    url: modelUrl + 'getRoleInfoByRoleid/v1',
    method: 'get',
    params
  });
};

export const getRoleInfoByRoleid = params => {
  return request({
    url: modelUrl + 'getRoleInfoByRoleid/v2',
    method: 'get',
    params
  });
};

export const getCreateRoleInfo = params => {
  return request({
    url: modelUrl + 'getCreateRoleInfo/v3',
    method: 'get',
    params
  });
};

export const updateOneRole = data => {
  return request({
    url: modelUrl + 'updateOneRole',
    method: 'post',
    data
  });
};

export const addOneRole = data => {
  return request({
    url: modelUrl + 'addOneRole',
    method: 'post',
    data
  });
};