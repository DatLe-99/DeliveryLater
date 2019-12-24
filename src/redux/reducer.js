import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'
import SignInReducer from './authenticate/reducer'


export default combineReducers({
    form: reduxFormReducer,
    SignInReducer
})

