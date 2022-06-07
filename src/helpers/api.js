import axios from 'axios';

const API = ({
	requestHeaders
}) => {
	let baseURL
	let headers = { }
	const state = JSON.parse(localStorage.getItem('state'))

    // console.log(state)
	// console.log(state.auth.token.token)
	if(state.auth.token !== ''){
		headers = {
			...headers,
			'x-access-token':state.auth.token
		}
	}

	if(process.env.NODE_ENV === 'development'){
		baseURL=process.env.REACT_APP_API_DEV
	}
	else {
		baseURL=process.env.REACT_APP_API
	}

	return axios.create({
		baseURL,
		timeout:0,
		maxRedirects:5,
		headers:{
			...headers,
			...requestHeaders
		},
		withCredentials:true,
	})
}

export default API