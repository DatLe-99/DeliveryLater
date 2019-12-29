import {createStackNavigator} from 'react-navigation-stack';
import getSlideFromRightTransitionConfig from '../utils/transitionConfig';

import LoginComponent from '../components/authenticate/LoginComponent';
import HomeComponent from '../components/home/HomeComponent';
import RegisterComponent from '../components/authenticate/RegisterComponent';
import SearchComponent from '../components/search/SearchComponent';
import RestaurantComponent from '../components/restaurant/RestaurantComponent'
import CalendarComponent from '../components/order/CalendarComponent';
import HistoryComponent from '../components/history/HistoryComponent';
import CartComponent from '../components/cart/CartComponent';
import ProfileComponent from '../components/profile/ProfileComponent';

const RootNavigator = createStackNavigator(
  {
    SignIn: {
      screen: LoginComponent,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    Home: {
      screen: HomeComponent,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    Register: {
      screen: RegisterComponent,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    Search: {
      screen: SearchComponent,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    Restaurant: {
      screen: RestaurantComponent,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },

    Calendar: {
      screen: CalendarComponent,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },

    History: {
      screen: HistoryComponent,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },

    Cart: {
      screen: CartComponent,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },

    Profile: {
      screen: ProfileComponent,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
  },

  {
    initialRouteName: 'SignIn',
    headerMode: 'none',
    mode: 'modal',
    transitionConfig: getSlideFromRightTransitionConfig,
  },
);

export default RootNavigator;
