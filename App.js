import React, { Component } from 'react';
import Login from './Component/Login';
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

class HomeScreen extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Button
        title="Go to Login"
        onPress={() => navigate('Login')}
      />
    );
  }
}

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Login: {screen: Login},
});

const App = createAppContainer(MainNavigator);

export default App;





