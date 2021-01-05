import request from '@/utils/request'
import config from '@/config'

const modelUrl = `${config.baseUrl}${config.systemUrl}system/xzqhApi/`

/**
 * 获取用户权限行政区划
 */
export const getXzqhs = params => {
	return request({
		url: modelUrl + 'getXzqhs',
		method: 'get',
		params
	})
}
