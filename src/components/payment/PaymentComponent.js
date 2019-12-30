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

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class PaymentComponent extends Component {
    constructor(props) {
        super(props);
    
        const fakeData = [];
        for(i = 0; i < 10; i+= 1) {
          fakeData.push({
            type: 'NORMAL',
            item: {
              id: i,
              nameProduct: faker.commerce.productName(),
              size: 'L',
              numberProduct: faker.random.number(10),
              price: faker.commerce.price(),
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
                dim.height = SCREEN_HEIGHT/12;
              break;
            default: 
              dim.width = 1;
              dim.height = 1;
              break;
          };
        })
      }
    
      rowRenderer = (type, data) => {
        const {nameProduct, size, numberProduct, price} = data.item;
        return (
            <InformationBar 
                text1 = {nameProduct + ' (' + size + ')' + ' x' + numberProduct}
                text2 = {price + ' VNĐ'}
            />
           
        )
      }
    render(){
        return(
            <View
                style = {{
                   flex: 1,
                   backgroundColor: '#f2f2f2',
                }}>
                <HeaderBar />

                <View
                    style = {{
                        flexDirection: 'row',
                    }}>
                    <UserInfo 
                        text1 = 'Dat Le'
                        text2 = '0356222105'
                        text3 = '227 Nguyen Van Cu, P.4, Q.5, TP.HCM'
                        text4 = '100.000 km'
                    />
                
                    <TouchableOpacity
                        style = {{
                            marginRight: 20,
                            marginTop: 10,
                            flexDirection: 'column',
                            position: 'absolute',
                            right: 0,
                        }}>
                        <Image
                            style = {{
                                padding: 10,
                                height: SCREEN_HEIGHT/10,
                                width: SCREEN_HEIGHT/10,
                            }}
                            source = {require('../../media/images/modify.png')} />
                    </TouchableOpacity>
                     
                </View>
                
                <View 
                    style = {{
                        marginTop: 10,
                        flexDirection: 'row',
                    }}>
                    
                    <TouchableOpacity>
                        <Text
                            style = {{
                                backgroundColor: 'rgba(243, 79, 8, 0.8)',
                                padding: 10,
                                borderRadius: 10,
                                marginLeft: 10,
                            }}>Đặt lịch</Text>
                    </TouchableOpacity>

                    <Text
                        style = {{
                            padding: 10,
                        }}>Giao ngay - 19:20 Hôm nay 08/12/2019</Text>
                    <TouchableOpacity
                        style = {{
                            position: 'absolute',
                            right: 0,
                            alignSelf: 'center',
                            //marginTop: SCREEN_WIDTH/20,
                            marginRight: 5,
                        }}>
                    <Image
                            style = {{
                                padding: 10,
                                height: SCREEN_HEIGHT/20,
                                width: SCREEN_HEIGHT/20,
                                marginRight: 10,

                            }}
                            source = {require('../../media/images/modify.png')} />
                    </TouchableOpacity>
                </View>

                <View
                    style = {{
                        margin: 10,
                        marginBottom: 20,

                    }}>

                    <Storename 
                        storeName = 'Phuc Long Coffee & Tea'
                        storeAddress = '29 Ngo Duc Ke, Q.1, TP.HCM'

                    />
                </View>
                
                <RecyclerListView
                    rowRenderer={this.rowRenderer}
                    dataProvider={this.state.list}
                    layoutProvider={this.layoutProvider}
                />

                <Total 
                    text = '4 phần - 215.000 VNĐ'
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
                   backgroundColor: '#f2f2f2',
                }}>
                <Text
                    style = {{
                        color: '#000',
                        alignSelf: 'center',
                        fontWeight: 'bold',
                        fontSize: SCREEN_WIDTH/25,
                        flexDirection: 'column',
                        marginTop: 10,
                        marginBottom: 10,
                       
                        //justifyContent: 'center',
                    }}>
                        Thanh toán
                    </Text>
            </View>
        );
    }
}

class UserInfo extends Component {
    render() {
        return(
            <View
                style = {{
                    flexDirection: 'column',
                    marginTop: SCREEN_HEIGHT/50,
                    marginLeft: SCREEN_HEIGHT/50,
                }}>
                <Text
                    style = {{
                        fontSize: SCREEN_HEIGHT/30,
                        fontWeight: 'bold',
                        marginBottom: 10,
                    }}>
                    {this.props.text1}</Text>
                
                <Text
                    style = {styles.margin}>
                {this.props.text2}</Text>
                
                <Text
                    style = {styles.margin}>
                {this.props.text3}</Text>
                <Text
                    style = {styles.margin}>
                {this.props.text4}</Text>
            </View>
        );
    }
}

class Storename extends Component {
    render() {
        return(
            <View
                style = {{
                    flexDirection: 'row',
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#fff',
                    backgroundColor: '#fff',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,

                    elevation: 3,
                }}>
                <Text
                    style = {{
                        flex: 0.7,
                        padding: 15,
                        fontSize: SCREEN_WIDTH/25,
                        fontWeight: 'bold',
                        textAlignVertical: 'center',
                    }}>{this.props.storeName}</Text>
                <Text
                    style = {{
                        flex: 0.3,
                        alignSelf: 'flex-end',
                        padding: 15,
                        textAlignVertical: 'center',
                        textAlign: 'right',

                    }}
                    mul>{this.props.storeAddress}</Text>

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
                <Text
                    style = {{
                        flex: 0.8,
                        padding: 20,
                        fontSize: SCREEN_HEIGHT/45,
                    }}>
                    {this.props.text1}
                </Text>
              
                <Text
                    style = {{
                        position: 'absolute',
                        right: 0,
                        padding: 20,
                        paddingRight: 10,
                        fontSize: SCREEN_HEIGHT/45,
                        
                    }}>
                    {this.props.text2}
                </Text>
            </View>
        );

    }
}

class Total extends Component {
    render() {
        return(
            <View 
                style = {{
                    marginTop: 10,
                    flexDirection: 'row',
                    marginBottom: 10,
                }}>
                
               
                <Text
                    style = {{
                        //backgroundColor: 'rgba(243, 79, 8, 0.8)',
                        padding: 10,
                        borderRadius: 10,
                        marginLeft: 10,
                        fontWeight: 'bold',
                        fontSize: SCREEN_HEIGHT/40,
                    }}>Tổng cộng</Text>
                

                <Text
                    style = {{
                        padding: 10,
                        marginLeft: 20,
                        textAlignVertical: 'center',
                    }}>{this.props.text}</Text>
                <TouchableOpacity
                    style = {{
                        position: 'absolute',
                        right: 0,
                        //marginTop: SCREEN_WIDTH/20,
                        marginRight: 10,
                    }}>

                    <Text
                        style = {{
                            backgroundColor: 'rgba(243, 79, 8, 0.8)',
                            padding: 10,
                            borderRadius: 10,
                            marginLeft: 10,
                        
                        }}>Đặt ngay</Text>
                
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    margin: {
        marginTop: SCREEN_HEIGHT/150,
        marginBottom: SCREEN_HEIGHT/150,
    },
    bodyText: {
        marginLeft: SCREEN_HEIGHT*0.005,
        textAlignVertical: 'center',
        fontSize: SCREEN_HEIGHT/50,
    },
    button: {
        padding: 10,
        backgroundColor: 'rgba(243, 79, 8, 0.8)',
        borderRadius: 20,
    },

    notButton: {
        padding: 15,
    },
  });
