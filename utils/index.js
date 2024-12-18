import {
	IMG_URL
} from '../config/index.js'


export function imageUrl(url) {
	return IMG_URL + url
}

export function navigate(url) {
	uni.navigateTo({
		url
	})
}