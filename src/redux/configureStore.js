import { combineReducers, createStore} from 'redux'
import generalSettingsReducer from './ducks/general_settings'

const reducer = combineReducers({
    generalSettings: generalSettingsReducer
})
const store = createStore(reducer);

export default store;