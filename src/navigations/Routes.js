import {createStackNavigator} from 'react-navigation-stack';
import getSlideFromRightTransitionConfig from '../utils/transitionConfig';

import LoginComponent from '../components/authenticate/LoginComponent';
import HomeComponent from '../components/home/HomeComponent';
import RegisterComponent from '../components/authenticate/RegisterComponent';
import SearchComponent from '../components/search/SearchComponent';
import CalendarComponent from '../components/order/CalendarComponent';

import RestaurantComponent from '../components/restaurant/RestaurantComponent';

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
    Calendar: {
      screen: CalendarComponent,
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
  },
  {
    initialRouteName: 'SignIn',
    headerMode: 'none',
    mode: 'modal',
    transitionConfig: getSlideFromRightTransitionConfig,
  },
);

export default RootNavigator;
