import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'
import SignInReducer from './authenticate/reducer'
import SignUpReducer from './register/reducer'


export default combineReducers({
    form: reduxFormReducer,
    SignInReducer,
    SignUpReducer
})



