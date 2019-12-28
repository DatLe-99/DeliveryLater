import React, { Component } from 'react';
import Login from './Component/Login';
import Register from './Component/Register';
import { Provider } from 'react-redux';
import MasterNavigator from './src/navigations';
import configureStore from './src/redux';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

//import 'react-native-gesture-handler';

// class HomeScreen extends React.Component {
//   render() {
//     const {navigate} = this.props.navigation;
//     return (
//       <View>
//         <Button
//          title="Go to Login"
//           onPress={() => navigate('Login')}
//         />
//         <Button
//           title="Go to Register"
//           onPress={() => navigate('Register')}
//         />
//       </View>
//     );
//   }
// }

// const MainNavigator = createStackNavigator({
//   Home: {screen: HomeScreen},
//   Login: {screen: Login},
//   Register: {screen: Register}
// });

// const App = createAppContainer(MainNavigator);

export default class App extends Component {
  render() {
    return (
      <Provider store={configureStore}>
        <MasterNavigator />
      </Provider>
    );
  }
}





