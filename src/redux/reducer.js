import {combineReducers} from 'redux';
import {reducer as reduxFormReducer} from 'redux-form';
import SignInReducer from './authenticate/reducer';
import SignUpReducer from './register/reducer';
import SearchReducer from './search/reducer';
import AddressReducer from './address/reducer'
import UpdateReducer from './update/reducer'
import RecommendReducer from './recommend/reducer'
import NewestReducer from './neweststore/reducer'
import OrderReducer from './addorder/reducer'

export default combineReducers({
  form: reduxFormReducer,
  SignInReducer,
  SignUpReducer,
  SearchReducer,
  AddressReducer,
  UpdateReducer,
  RecommendReducer,
  NewestReducer,
  OrderReducer,
});
