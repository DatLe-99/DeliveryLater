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
  Dimensions,
  Image,
} from 'react-native';

import {WINDOW_SIZE} from '../../utils/scale';
import {FONT_SIZE} from '../../utils/fontsize';
import LoginBackground from 'images/LoginBackground.jpg';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {signInAction} from '../../redux/action';
import BottomBarComponent from '../bottomBar/BottomBarComponent';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;



export default class HistoryComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          account: this.props.navigation.getParam('account'),
          avtSrc: require('../../media/images/avtDat.jpg'),
          nameUser: 'Dat Le',
          addressIcon: require('../../media/images/address.png'),
          addressText: 'Quản lý địa chỉ',
          historyIcon: require('../../media/images/history.png'),
          historyText: 'Lịch sử',
          profileIcon: require('../../media/images/profileIcon.png'),
          profileText: 'Chỉnh sửa thông tin cá nhân',
          aboutIcon: require('../../media/images/aboutUs.png'),
          aboutText: 'Về Delivery Later',
          logoutIcon: require('../../media/images/logout.png'),
          logoutText: 'Đăng xuất',
          changePasswordIcon: require('../../media/images/password.png'),
          changePasswordText: 'Đổi mật khẩu',
        };
    }
    render(){
        return(
            <View
                style = {{
                    flex: 1,
                    backgroundColor: '#f2f2f2',
                }}>

                <HeaderBar />

                <InformationBar
                    styleImage = {styles.headImage}
                    styleText = {styles.headText}
                    imageSrc = {this.state.avtSrc}
                    text = {this.state.nameUser}
                />

                <TouchableOpacity
                    style = {{
                        marginTop: SCREEN_HEIGHT*0.03,
                    }}>
                    <InformationBar
                        styleImage = {styles.bodyImage}
                        styleText = {styles.bodyText}
                        imageSrc = {this.state.addressIcon}
                        text = {this.state.addressText}
                    />
                </TouchableOpacity>

                <TouchableOpacity>
                    <InformationBar
                        styleImage = {styles.bodyImage}
                        styleText = {styles.bodyText}
                        imageSrc = {this.state.historyIcon}
                        text = {this.state.historyText}
                    />
                </TouchableOpacity>

                <TouchableOpacity>
                    <InformationBar
                        styleImage = {styles.bodyImage}
                        styleText = {styles.bodyText}
                        imageSrc = {this.state.profileIcon}
                        text = {this.state.profileText}
                    />
                </TouchableOpacity>

                <TouchableOpacity>
                    <InformationBar
                        styleImage = {styles.bodyImage}
                        styleText = {styles.bodyText}
                        imageSrc = {this.state.aboutIcon}
                        text = {this.state.aboutText}
                    />
                </TouchableOpacity>

                <TouchableOpacity 
                    style = {{
                        marginTop: SCREEN_HEIGHT*0.03,
                    }}>
                    <InformationBar
                        styleImage = {styles.bodyImage}
                        styleText = {styles.bodyText}
                        imageSrc = {this.state.logoutIcon}
                        text = {this.state.logoutText}
                    />
                </TouchableOpacity>

                <TouchableOpacity>    
                    <InformationBar
                        styleImage = {styles.bodyImage}
                        styleText = {styles.bodyText}
                        imageSrc = {this.state.changePasswordIcon}
                        text = {this.state.changePasswordText}
                    />
                </TouchableOpacity>
                
                

                <BottomBarComponent 
                    selectedTab = 'profile'
                    onPressHome = {() => this.props.navigation.navigate('Home', {
                        account: this.state.account
                    })}
                    onPressUpcomingOrder = {() => this.props.navigation.navigate('UpcomingOrder',{
                        account: this.state.account
                    })}
                    onPressHistory = {() => this.props.navigation.navigate('History', {
                        account: this.state.account
                    })}
                />

            </View>
            
        );
    }
}

class HeaderBar extends Component {
    render() {
        return(
            <View
                style = {{
                   //flex: 0.1,
                   alignItems: 'center',
                   backgroundColor: '#F34F08',
                   
                   shadowColor: "#fff",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.18,
                    shadowRadius: 1.00,
                    elevation: 1,
                }}>
                <Text
                    style = {{
                        color: '#fff',
                        alignSelf: 'center',
                        fontWeight: 'bold',
                        fontSize: SCREEN_WIDTH/20,
                        flexDirection: 'column',
                        marginTop: 10,
                        marginBottom: 10,
                        //justifyContent: 'center',
                    }}>
                        Hồ sơ của tôi
                    </Text>
            </View>
        );
    }
}

class InformationBar extends Component {
    render() {
        return(
            <View
                style = {{
                    flexDirection: 'row',
                   // marginTop: SCREEN_HEIGHT*0.03,
                    borderBottomWidth: 0.5,
                    borderTopWidth: 0.5,
                    borderColor: '#e1dedb',
                    backgroundColor: '#fff',
                }}>
                <Image 
                    style = {this.props.styleImage}
                    source = {this.props.imageSrc} 
                    />
              
                <Text
                    style = {this.props.styleText}>
                    {this.props.text}
                </Text>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    headImage: {
        height: SCREEN_HEIGHT/10,
        width: SCREEN_HEIGHT/10,
        borderRadius: SCREEN_HEIGHT/5,
        margin: SCREEN_HEIGHT*0.01,
        marginLeft: SCREEN_HEIGHT*0.03,
    },

    bodyImage: {
        height: SCREEN_HEIGHT/15,
        width: SCREEN_HEIGHT/15,
        borderRadius: SCREEN_HEIGHT/5,
        margin: SCREEN_HEIGHT*0.01,
        marginLeft: SCREEN_HEIGHT*0.01,
    },

    headText: {
        marginLeft: SCREEN_HEIGHT*0.01,
        textAlignVertical: 'center',
        fontSize: SCREEN_HEIGHT/30,
    },

    bodyText: {
        marginLeft: SCREEN_HEIGHT*0.005,
        textAlignVertical: 'center',
        fontSize: SCREEN_HEIGHT/45,
    },

  });