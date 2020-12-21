import {
    LOAD_PROFILE, AUTHENTICATE,
    loadProfileSuccess, loadProfileFail,
    authenticationSuccess, authenticationFail, loadProfile
} from './profile.actions'
import { put, call, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { doFetch } from '../../utils/axios.utils'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import { USER_TOKEN, USER_TOKEN_REFRESH } from '../../utils/constants'


function* fetchProfileData(action) {
    try {
        const token = Cookies.get(USER_TOKEN)

        if (!token) 
            yield loadProfileFail('undefined token')
        else {
            const tokenDecoded = jwt_decode(token)
            const response = yield call(doFetch, `users/${tokenDecoded.user_id}`)

            if (response.status == 200) {
                yield put(loadProfileSuccess(response.data))
            } else {
                yield put(loadProfileFail("Petición no exitosa"))
            }
        }
    } catch (error) {
        console.log('>>> ERROR FETCH PROFILE DATA', error)
        yield put(loadProfileFail(error))
    }
}

function* authenticate(action) {
    try {
        const {user, password} = action.credentials
        const response = yield call(doFetch, 'auth/', 'POST', {user, password}, {refreshToken: false})

        if (response.status == 200) {
            Cookies.set(USER_TOKEN, response.data.access)
            Cookies.set(USER_TOKEN_REFRESH, response.data.refresh)
            
            yield put(loadProfile())
            yield put(authenticationSuccess())
        } else {
            yield put(authenticationFail("Verifique su usuario y contraseña"))
        }

    } catch (error) {
        console.log('>>>> AUTHENTICATION ERROR', error)
        if (error.response.status == 401)
            error = "Verifique su usuario y contraseña"
        yield put(authenticationFail(error))
    }
}


function* profileSaga() {
    yield takeEvery(LOAD_PROFILE, fetchProfileData)
    yield takeLatest(AUTHENTICATE, authenticate)
}


export default profileSaga;
