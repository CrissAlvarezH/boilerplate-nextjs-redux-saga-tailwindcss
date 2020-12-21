// Actions
export const LOAD_PROFILE = 'LOAD_PROFILE'
export const LOAD_PROFILE_FAIL = 'LOAD_PROFILE_FAIL'
export const LOAD_PROFILE_SUCCESS = 'LOAD_PROFILE_SUCCESS'

export const AUTHENTICATE = 'AUTHENTICATE'
export const AUTHENTICATION_FAIL = 'AUTHENTICATION_FAIL'
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS'

// Action creators
export const loadProfile = () => ({
    type: LOAD_PROFILE,
})

export const loadProfileFail = (error) => ({
    type: LOAD_PROFILE_FAIL,
    error: error
})

export const loadProfileSuccess = (profile) => ({
    type: LOAD_PROFILE_SUCCESS,
    profile: profile
})

export const authenticate = ({user, password}) => ({
    type: AUTHENTICATE,
    credentials: {user, password}
})

export const authenticationFail = (error) => ({
    type: AUTHENTICATION_FAIL,
    error: error
})

export const authenticationSuccess = () => ({
    type: AUTHENTICATION_SUCCESS
})
