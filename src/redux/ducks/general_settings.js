const SET_LANGUAGE = 'setLanguage'
const SET_REQUEST_INTERVAL = 'setRequestInterval'

export const setLanguage = (value) => ({
    type: SET_LANGUAGE,
    value: value
})

export const setRequestInterval = (value) => ({
    type: SET_REQUEST_INTERVAL,
    value: value
})

const initialState = {
    language: 'English',
    requestInterval: '30 Seconds'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LANGUAGE:
            return {...state, language: action.value};

        case SET_REQUEST_INTERVAL:
            return {...state, requestInterval: action.value};
    
        default:
            return state;
    }
}

export default reducer;