import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  ActivityIndicator,
  Keyboard,
  BackHandler,
  TextInput,
  ToastAndroid,
} from 'react-native';

import {WINDOW_SIZE} from '../../utils/scale';
import {FONT_SIZE} from '../../utils/fontsize';
import LoginBackground from 'images/LoginBackground.jpg';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {signInAction} from '../../redux/action';
import BottomBarComponent from '../bottomBar/BottomBarComponent';


export default class HistoryComponent extends Component {
    render(){
        return(
            <View
                style = {{
                    flex: 1,
                }}>

                <BottomBarComponent 
                    selectedTab = 'upcomingOrder'
                    onPressHome = {() => this.props.navigation.navigate('Home')}
                    onPressUpcomingOrder = {() => this.props.navigation.navigate('UpcomingOrder')}
                    onPressHistory = {() => this.props.navigation.navigate('History')}
                    onPressProfile = {() => this.props.navigation.navigate('Profile')}
                />

                <Text>UpComingOrder</Text>
            </View>  
        );
    }
}
