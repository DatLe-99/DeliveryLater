import {createStackNavigator} from 'react-navigation-stack';
import getSlideFromRightTransitionConfig from '../utils/transitionConfig';

import LoginComponent from '../components/authenticate/LoginComponent';
import HomeComponent from '../components/home/HomeComponent';
import RegisterComponent from '../components/authenticate/RegisterComponent';
import SearchComponent from '../components/search/SearchComponent';
import RestaurantComponent from '../components/restaurant/RestaurantComponent';
import CalendarComponent from '../components/order/CalendarComponent';
import HistoryComponent from '../components/history/HistoryComponent';
import UpcomingOrderComponent from '../components/upcomingOrder/UpcomingOrderComponent';
import ProfileComponent from '../components/profile/ProfileComponent';
import PaymentComponent from '../components/payment/PaymentComponent';
import SchedualerComponent from '../components/order/SchedualerComponent';
import PaymentSchedule from '../components/payment/PaymentSchedule';
import ViewScheduleComponent from '../components/schedule/ViewScheduleComponent'
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

    UpcomingOrder: {
      screen: UpcomingOrderComponent,
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

    Payment: {
      screen: PaymentComponent,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },

    PaymentSchedule: {
      screen: PaymentSchedule,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },

    ViewOrderSchedule: {
      screen: ViewScheduleComponent,
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
