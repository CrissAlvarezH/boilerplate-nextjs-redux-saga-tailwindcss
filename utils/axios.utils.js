import axios from 'axios';
import Cookies from 'js-cookie'
import { DOMAIN, USER_TOKEN, USER_TOKEN_REFRESH } from './constants';
import jwt_decode from 'jwt-decode'


async function refreshToken(token) {
    if (token) {
        const tokenDecoded = jwt_decode(token)
        if (Date.now() >= tokenDecoded.exp * 1000) {
            console.log('>> REFRESH TOKEN')
            const tokenRefresh = Cookies.get(USER_TOKEN_REFRESH)
            const refreshResponse = await axios.post(DOMAIN + 'users/auth/refresh/', {refresh: tokenRefresh})
            if (refreshResponse.status == 200) {
                const newToken = refreshResponse.data.access
                Cookies.set(USER_TOKEN, newToken)
                return newToken
            }
        }
    }
    return token;
}

async function getConfig(url, method, data, options = {refreshToken: true}) {
    const token = options.refreshToken ? await refreshToken(Cookies.get(USER_TOKEN)) : Cookies.get(USER_TOKEN)

    let headers = {
        'Authorization': token ? `Bearer ${token}` : undefined,
        'Content-Type': 'application/json',
    }

    return {
        url: DOMAIN + url,
        method: method,
        data: data,
        headers: headers
    }
}

export async function doFetch(url, method = 'GET', data, options = {refreshToken: true}) {
    return axios(await getConfig(url, method, data, options))
}
