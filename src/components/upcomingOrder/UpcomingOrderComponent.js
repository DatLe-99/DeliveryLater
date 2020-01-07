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
  Button,
} from 'react-native';

import {WINDOW_SIZE} from '../../utils/scale';
import {FONT_SIZE} from '../../utils/fontsize';

import LoginBackground from 'images/LoginBackground.jpg';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {signInAction} from '../../redux/action';
import BottomBarComponent from '../bottomBar/BottomBarComponent';

import faker from 'faker';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import Modal, {
    ModalTitle,
    ModalContent,
    ModalFooter,
    ModalButton,
    SlideAnimation,
    ScaleAnimation,
  } from 'react-native-modals';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;


export default class HistoryComponent extends Component {
    constructor(props) {
        super(props);
    
        const fakeData = [];
        for(var i = 0; i < 100; i+= 1) {
          fakeData.push({
            type: 'NORMAL',
            item: {
              id: i,
              image: faker.image.avatar(),
              name: faker.name.firstName(),
              address: faker.address.secondaryAddress(),
            },
          });
        }
        this.state = {
          list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(fakeData),
          isPopupShown: false,
          account: this.props.navigation.getParam("account")
        };
    
        this.layoutProvider = new LayoutProvider((i) => {
          return this.state.list.getDataForIndex(i).type;
        }, (type, dim) => {
          switch (type) {
            case 'NORMAL': 
              dim.width = SCREEN_WIDTH;
              dim.height = SCREEN_HEIGHT/4;
              break;
            default: 
              dim.width = 0;
              dim.height = 0;
              break;
          };
        })
      }
    
      rowRenderer = (type, data) => {
        const { image, name, address} = data.item;
        
        return (
            <View 
                style = {{
                flexDirection: 'row',
                backgroundColor: '#fff',
                marginTop: 0.026*SCREEN_HEIGHT,
                marginBottom: 0.026*SCREEN_HEIGHT,
                marginLeft: 0.018*SCREEN_WIDTH,
                marginRight: 0.018*SCREEN_WIDTH,
                //height: 0.3*SCREEN_WIDTH,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.20,
                shadowRadius: 1.41,
                alignItems: 'center',
                elevation: 2,
                borderRadius: 7,
                }}>
                    <Image style={{
                        width: SCREEN_HEIGHT/6,
                        height: SCREEN_HEIGHT/6,
                        marginLeft: 0.007*SCREEN_HEIGHT,
                        borderRadius: 7,
                    }} source={{ uri: image }} />

                <View
                    style = {{
                        flexDirection: 'column',
                        justifyContent: 'center',

                    }}>
                    <Text
                        style = {{
                            fontSize: SCREEN_WIDTH/25,
                            padding: 0.01*SCREEN_HEIGHT,
                            fontWeight: 'bold',
                            alignSelf: 'center',
                        }}>
                        {name}
                    </Text>

                    <Text
                        style = {{
                            fontSize: SCREEN_WIDTH/28,
                            padding: 0.01*SCREEN_HEIGHT,
                            alignSelf: 'center',
                        }}>
                        {address}
                    </Text>
                    
                    <View
                        style = {{
                            padding: 0.01*SCREEN_HEIGHT,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginLeft: 0.03*SCREEN_HEIGHT,
                        }}>
                        <FontAwesome5Icon name = 'money-bill-wave' size = {SCREEN_WIDTH/28} color = '#33a62b' />
                        <Text> 2 </Text>
                        <Text> Phần - </Text>
                        <Text> 120,000 vnđ </Text>
                        <Text> - Tiền mặt</Text>
                    </View>

                    <View 
                style = {{
                    margin: 0.026*SCREEN_HEIGHT,
                    marginRight: 0,
                    marginTop: 0.01*SCREEN_HEIGHT,
                    //marginBottom: 0.04*SCREEN_HEIGHT,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <AntDesignIcon name = 'clockcircleo' size = {SCREEN_WIDTH/25} color = '#000' />
                <Text> 12:30 - Th 7, 23 thg 11 </Text>
                
                <TouchableOpacity
                    onPress={
                        () => this.setState({isPopupShown: true})
                    }

                    style = {{
                        position: 'absolute',
                        right: 0,
                        borderWidth: 1, 
                        borderRadius: 10,
                        borderColor: 'red',
                        backgroundColor: 'red',
                    }}>
                    <Text
                        style = {{
                            padding: 0.01*SCREEN_HEIGHT,
                            paddingLeft: 0.02*SCREEN_HEIGHT,
                            paddingRight: 0.02*SCREEN_HEIGHT,
                            color: '#fff',
                            marginTop: 0,
                            fontWeight: 'bold',
                        }}>
                        Hủy
                    </Text>
                </TouchableOpacity>
            </View>
                </View>
            
            </View>
        )
      }

      setIsPopupShown = (boolVar) => {
        this.setState({
          isPopupShown: boolVar
        })
      }

    render(){
        return (
          <View
            style={
              ({
                flex: 1,
                flexDirection: 'row',
              },
              styles.container)
            }>
            <HeaderBar
              ViewSchedule={() =>
                this.props.navigation.navigate('ViewOrderSchedule', {
                  account : this.state.account,
                })
              }
            />

            <RecyclerListView
              //style={{flex: 1}}
              rowRenderer={this.rowRenderer}
              dataProvider={this.state.list}
              layoutProvider={this.layoutProvider}
            />

            <ConfirmCancelOrderPopup
              setIsPopupShown={() => this.setState({isPopupShown: false})}
              isPopupShown={this.state.isPopupShown}
            />

            <BottomBarComponent
              selectedTab="upcomingOrder"
              onPressHome={() => this.props.navigation.navigate('Home')}
              onPressUpcomingOrder={() =>
                this.props.navigation.navigate('UpcomingOrder')
              }
              onPressHistory={() => this.props.navigation.navigate('History')}
              onPressProfile={() => this.props.navigation.navigate('Profile')}
            />
          </View>
        );
    }
}

class ConfirmCancelOrderPopup extends Component {
    render() {
      return (
          <Modal.BottomModal
            visible={this.props.isPopupShown}
            onTouchOutside={this.props.setIsPopupShown}
            height={0.5}
            width={1}
            onSwipeOut={this.props.setIsPopupShow}
            modalTitle={
              <ModalTitle
                title="Bạn muốn hủy đơn hàng này?"
                hasTitleBar
              />
            }
  
            footer={
              <ModalFooter>
                <ModalButton
                  text="CANCEL"
                  bordered
                  onPress={
                    this.props.setIsPopupShown
                  }
                  key="button-1"
                />
                <ModalButton
                  text="OK"
                  bordered
                  onPress={
                    this.props.setIsPopupShown
                  }
                  key="button-2"
                />
              </ModalFooter>
            }
          >
            <ModalContent
              style={{
                flex: 1,
                backgroundColor: 'fff',
              }}
            >
              <Text>
                Bottom Modal with Title
              </Text>
            </ModalContent>
          </Modal.BottomModal>
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
                        color: '#000',
                        alignSelf: 'center',
                        fontWeight: 'bold',
                        fontSize: SCREEN_WIDTH/20,
                        flexDirection: 'column',
                        marginTop: 10,
                        marginBottom: 10,
                        //justifyContent: 'center',
                    }}>
                        Đơn hàng sắp đến
                    </Text>
                
                <TouchableOpacity
                    onPress = {this.props.ViewSchedule}
                    style = {{
                        position: 'absolute',
                        right: 0,
                        marginRight: 10,
                        marginTop: 6,
                       
                    }}>
                    <EvilIcons name = 'calendar' size = {SCREEN_HEIGHT/15} color = '#fff' />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      minHeight: 1,
      minWidth: 1,
      shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
});