import { createStackNavigator } from 'react-navigation-stack';
import getSlideFromRightTransitionConfig from '../utils/transitionConfig'; 

import LoginComponent from '../components/authenticate/LoginComponent';
import HomeComponent from '../components/home/HomeComponent';
import RegisterComponent from '../components/authenticate/RegisterComponent';

const RootNavigator = createStackNavigator({
    SignIn: {
        screen: LoginComponent,
        navigationOptions: {
            gesturesEnabled: false,
        }
    },
    Home: {
        screen: HomeComponent,
        navigationOptions: {
            gesturesEnabled: false,
        }
    },
    Register: {
        screen: RegisterComponent,
        navigationOptions: {
            gesturesEnabled: false,
        }
    },
},{
    initialRouteName: 'SignIn',
    headerMode: 'none',
    mode: 'modal',
    transitionConfig: getSlideFromRightTransitionConfig,
});

export default RootNavigator;