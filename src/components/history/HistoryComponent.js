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

import faker from 'faker';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

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
              description: faker.random.words(5),
            },
          });
        }
        this.state = {
          list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(fakeData),
        };
    
        this.layoutProvider = new LayoutProvider((i) => {
          return this.state.list.getDataForIndex(i).type;
        }, (type, dim) => {
          switch (type) {
            case 'NORMAL': 
              dim.width = SCREEN_WIDTH;
              dim.height = SCREEN_HEIGHT/3.5;
              break;
            default: 
              dim.width = 0;
              dim.height = 0;
              break;
          };
        })
      }
    
      rowRenderer = (type, data) => {
        const { image, name, description, address} = data.item;
        return (
          <View style={{
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

                elevation: 2,
                flexDirection: 'column',
                borderRadius: 7,
          }}>
            <View 
                style = {{
                    flexDirection: 'row',
                }}>
                <Image style={{
                    width: SCREEN_HEIGHT/6,
                    height: SCREEN_HEIGHT/6,
                    marginLeft: 0.007*SCREEN_HEIGHT,
                    marginTop: 0.007*SCREEN_HEIGHT,
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
                        <FontAwesomeIcon name = 'dollar' size = {SCREEN_WIDTH/28} color = '#000' />
                        <Text> 2 </Text>
                        <Text> Phần - </Text>
                        <Text> 120,000 vnđ </Text>
                        <Text> - Tiền mặt</Text>
                    </View>


                </View>
            
            </View>

            <View 
                style = {{
                    margin: 0.026*SCREEN_HEIGHT,
                    marginBottom: 0.04*SCREEN_HEIGHT,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <AntDesignIcon name = 'clockcircleo' size = {SCREEN_WIDTH/25} color = '#000' />
                <Text> 12:30 - Th 7, 23 thg 11 </Text>
                <TouchableOpacity
                    style = {{
                        position: 'absolute',
                        right: 0,
                        borderWidth: 1, 
                        borderRadius: 10,
                        borderColor: '#F34F08',
                        backgroundColor: '#F34F08',
                        marginBottom: 0.005*SCREEN_HEIGHT,
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
                        Đánh giá
                    </Text>
                </TouchableOpacity>
            </View>
          </View>
        )
      }

    render(){
        return(
            <View
                style = {{
                    flex: 1,
                    flexDirection: 'row',
                }, styles.container}>

                <HeaderBar />

                <RecyclerListView
                    //style={{flex: 1}}
                    rowRenderer={this.rowRenderer}
                    dataProvider={this.state.list}
                    layoutProvider={this.layoutProvider}
                />

                <BottomBarComponent 
                    selectedTab = 'history'
                    onPressHome = {() => this.props.navigation.navigate('Home')}
                    onPressUpcomingOrder = {() => this.props.navigation.navigate('UpcomingOrder')}
                    onPressHistory = {() => this.props.navigation.navigate('History')}
                    onPressProfile = {() => this.props.navigation.navigate('Profile')}
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
                        Lịch sử
                    </Text>
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