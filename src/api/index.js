import request from '@/utils/request'
const apiBaseUrl = webConfig.baseUrl


/**
 * 获取全部的枚举值
 */
export const getEnumInfoList = () => {
	return request({
		url: apiBaseUrl + 'enuminfo/getEnumInfoList',
		method: 'get'
	})
}

/**
 * 根据CODE获取枚举信息的列表
 */
export const getEnumInfoListByCode = ( params ) => {
	return request({
		url: apiBaseUrl + 'enuminfo/getEnumInfoListByCode',
		method: 'get',
		params
	})
}

/**
 * 获取全部的行政区划
 */
export const getCityareaInfoListBean = data => {
	return request({
		url: apiBaseUrl + 'cityareainfo/getCityareaInfoListBean',
		method: 'post',
		data
	})
}
