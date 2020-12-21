import { 
    AUTHENTICATE, AUTHENTICATION_SUCCESS, AUTHENTICATION_FAIL,
    LOAD_PROFILE, LOAD_PROFILE_FAIL, LOAD_PROFILE_SUCCESS,
} from './profile.actions'


const initState = {
    loadingAuthentication: false,
    authenticationError: "",
    authenticationSuccess: false,

    profile: undefined,
    loadingProfile: false,
    loadProfileError: "",
}

export default function profileReducer(state = initState, action) {
    switch (action.type) {
        case LOAD_PROFILE:
            return {
                ...state,
                loadingProfile: true,
                loadProfileError: "",
                profile: undefined
            }
        
        case LOAD_PROFILE_SUCCESS:
            return {
                ...state,
                loadingProfile: false,
                loadProfileError: "",
                profile: action.profile
            }

        case LOAD_PROFILE_FAIL:
            return {
                ...state,
                loadingProfile: false,
                loadProfileError: action.error,
                profile: undefined
            }

        case AUTHENTICATE:
            return {
                ...state,
                loadingAuthentication: true,
                authenticationSuccess: false
            }

        case AUTHENTICATION_SUCCESS:
            return {
                ...state,
                loadingAuthentication: false,
                authenticationError: "",
                authenticationSuccess: true
            }

        case AUTHENTICATION_FAIL:
            return {
                ...state,
                loadingAuthentication: false,
                authenticationError: action.error,
                authenticationSuccess: false
            }

        default:
            return state
    }
}
