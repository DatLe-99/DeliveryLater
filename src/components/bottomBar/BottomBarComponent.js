import React, {Component} from 'react';
import {
    View,
    Image,
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
    Dimensions,
    ToastAndroid,
    PermissionsAndroid,
} from 'react-native';

import {WINDOW_SIZE} from '../../utils/scale';
import {FONT_SIZE} from '../../utils/fontsize';
import LoginBackground from 'images/LoginBackground.jpg';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SaleOff50 from 'images/SaleOff50.png'
import IconAntDesign from 'react-native-vector-icons/AntDesign';
//import IconEntypo from 'react-native-vector-icons/Entypo';
//import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from 'react-native-geolocation-service';

import {searchAction, addressAction, updateAction} from '../../redux/action';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
//import TabBar from '@mindinventory/react-native-tab-bar-interaction';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import TabNavigator from 'react-native-tab-navigator';
import RNGooglePlaces from 'react-native-google-places';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class BottomBarComponent extends Component {
    state = {
            homeIconColor: '#000',
            historyIconColor: '#000',
            upcomingOrderIconColor: '#000',
            profileIconColor: '#000',
        }

    componentDidMount = () => {
        const name = this.props.selectedTab + 'IconColor';
        this.setState({[name]: '#DF0029'});
    }

    render() {
      return(
        <View
          style = {{
            width: '100%',
            position: 'absolute',
            height: WINDOW_SIZE.HEIGHT/15,
            bottom: 0,
             // flex: 1,
            flexDirection: 'row',
            alignItems: "center",
              //justifyContent: 'flex-end',
            backgroundColor: '#fff',
            shadowColor: "#fff",
            shadowOffset: 
            {
                width: 0,
                height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.00,
            elevation: 24,
          }}>
  
          <View
            style={{flex: 0.25}}
           >
            <TouchableOpacity
                style = {styles.bottomBarItem}
                onPress = {this.props.onPressHome}>

              <IconMaterialCommunity name="food-fork-drink" size={px2dp(22)} color={this.state.homeIconColor}/>
  
              <Text
                style={{
                  flex: 0.5,
                  color: this.state.homeIconColor,
                }}>
                Trang chủ
              </Text>
            </TouchableOpacity>
          </View>
  
          <View
            style={{flex: 0.25}}
           >
            <TouchableOpacity 
                style = {styles.bottomBarItem}
                onPress = {this.props.onPressUpcomingOrder} >
              <IconAntDesign name="menu-unfold" size={px2dp(22)} color={this.state.upcomingOrderIconColor}/>
  
              <Text
                style={{
                  flex: 0.5,
                  color: this.state.upcomingOrderIconColor,
                }}>
                Sắp đến
              </Text>
            </TouchableOpacity>
          </View>
          
          <View
            style={{flex: 0.25}}
           >
            <TouchableOpacity style = {styles.bottomBarItem}
              onPress = {this.props.onPressHistory}>
              <IconAwesome name="history" size={px2dp(22)} color={this.state.historyIconColor}/>
  
              <Text
                style={{
                  flex: 0.5,
                  color: this.state.historyIconColor,
                }}>
                Lịch sử
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style = {{flex: 0.25}}>
            <TouchableOpacity 
                style={styles.bottomBarItem}
                onPress = {this.props.onPressProfile}>
              <IconAwesome name="user" size={px2dp(22)} color={this.state.profileIconColor}/>
              <Text
                style={{
                  flex: 0.5,
                  color: this.state.profileIconColor,
                }}>
                Hồ sơ
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
    bottomBarItem: {
        flex: 0.5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
});

const deviceW = Dimensions.get('window').width

const basePx = 375

function px2dp(px) {
  return px *  deviceW / basePx
}