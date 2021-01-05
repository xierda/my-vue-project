import request from '@/utils/request'
import config from '@/config'

const modelUrl = `${config.baseUrl}${config.systemUrl}system/xzqhApi/getXzqhs`

/**
 * 获取全部的枚举值
 */
export const getEnumInfoList = () => {
	return request({
		url: modelUrl + 'enuminfo/getEnumInfoList',
		method: 'get'
	})
}

/**
 * 根据CODE获取枚举信息的列表
 */
export const getEnumInfoListByCode = ( params ) => {
	return request({
		url: modelUrl + 'enuminfo/getEnumInfoListByCode',
		method: 'get',
		params
	})
}

/**
 * 获取全部的行政区划
 */
export const getCityareaInfoListBean = data => {
	return request({
		url: modelUrl + 'cityareainfo/getCityareaInfoListBean',
		method: 'post',
		data
	})
}
