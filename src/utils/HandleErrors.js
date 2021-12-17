import {message} from 'antd'
import {languages} from './../languages/languages'


const lang = localStorage.getItem('language')
export function HandleErrors(err) {
	try {
		if (err.response) {
			if (err.response.data.message && !err.response.data.success) {
				message.error(err.response.data.message)
			} else {
				throw err;
			}
		} else {
			throw err;
		}
	} catch (error) {
		message.error(languages.error_occurred[lang]);
	}
}
