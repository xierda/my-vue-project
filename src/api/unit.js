import request from '@/utils/request'
import config from '@/config'

const modelUrl = config.baseUrl + 'sensitivearea/system/unitApi/'

export const getUnitFirst = params => {
  return request({
    url: modelUrl + 'getUnitFirst',
    method: 'get',
    params
  });
};

export const getUnitChild = params => {
  return request({
    url: modelUrl + 'getUnitChild',
    method: 'get',
    params
  });
};

export const queryUnit = params => {
  return request({
    url: modelUrl + 'queryUnit',
    method: 'get',
    params
  });
};

export const updateUnit = data => {
  return request({
    url: modelUrl + 'updateUnit',
    method: 'post',
    data
  });
};

export const addUnit = data => {
  return request({
    url: modelUrl + 'addUnit',
    method: 'post',
    data
  });
};
