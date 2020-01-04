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
import {orderAction, updateAction, addressAction} from '../../redux/action'
import RNGooglePlaces from 'react-native-google-places';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
//2020-01-04T10:14:57+07:00
function cloneData(listorder){
    const cloneData = [];
    for (var i = 0; i < listorder.length; i += 1) {
      cloneData.push({
        type: 'NORMAL',
        item: {
          ID: listorder[i].ID,
          name: listorder[i].name,
          price: listorder[i].price,
          count: listorder[i].count,
        },
      });
    }
    return cloneData
}

function estimateDeliveryTime(distance){
    var d = new Date()
    var hour = d.getHours()
    var minute = d.getMinutes()
    var second = d.getSeconds()
    var estimatetime = parseInt(distance / 30);
    if(minute + estimatetime >= 60){
        hour = hour + 1
        minute = (minute + estimatetime) % 60
    }
    return {hour: hour, minute: minute, second: second}
}

function listOrdersendRequest(listorder){
    var sendData = [];
    for (var i = 0; i< listorder.length; i++){
        sendData.push({
            ItemId: listorder[i].ID,
            amount: listorder[i].count,
            price: listorder[i].price,
        })
    }
    return sendData
}

function formatYYYYMMDD(){
    var today = new Date()
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    // if(noworlater === 'now'){
        var hr = today.getHours();
        var mi = today.getMinutes();
        var se = today.getSeconds();
    // }
    // else{
    //     var esti = estimateDeliveryTime(distance)
    //     var hr = esti.hour
    //     var mi = esti.minute
    //     var se = esti.second
    // }
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    if (hr < 10){
        hr = '0' + hr;
    }
    if (mi < 10) {
        mi = '0' + mi
    }
    if (se < 10) {
        se = '0' + se
    }
    return yyyy + '-' + mm + '-' + dd + "T" + hr + ":" + mi + ":" + se + "+07:00";
}

class PaymentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(cloneData(this.props.navigation.getParam("listorder"))),
          listorder: this.props.navigation.getParam("listorder"),
          address: this.props.navigation.getParam("address"),
          account: this.props.navigation.getParam("account"),
          restaurant: this.props.navigation.getParam("restaurant"),
          distance: this.props.navigation.getParam("restaurant").distance.toFixed(2),
          date: new Date(),
          isLoading: false,
        };
    
        this.layoutProvider = new LayoutProvider((i) => {
          return this.state.list.getDataForIndex(i).type
        }, (type, dim) => {
          switch (type) {
            case "NORMAL": 
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

    componentDidMount(){
          console.log(this.state.listorder)
      }
    
    rowRenderer = (type, data) => {
        const {ID, name, price, count} = data.item;
        return (
            <InformationBar 
                text1 = {name + ' x ' + count}
                text2 = {price*count + ' VNĐ'}
            />
           
        )
      }
    
    //2020-01-04T10:14:57+07:00
    CheckOut = (distance) => {
        if(distance > 20){
            ToastAndroid.show("Xin lỗi. Bạn chỉ có thể đặt trong bán kính 20km", ToastAndroid.SHORT)
            return;
        }
        if (!this.state.isLoading) {
            this.setState({ isLoading: true });
            var date = this.state.date;
            this.props
                .orderAction(
                    [
                        {
                            AccountId: this.state.account.ID,
                            created: formatYYYYMMDD(),
                            deadline: formatYYYYMMDD(),
                            address: this.state.address,
                            orderitems: listOrdersendRequest(this.state.listorder)    
                        },
                    ]              
                )
                .then(() => {
                    this.setState({ isLoading: false });
                    if (this.props.orderData.success) {
                        this.setState({
                            isLoading: false,
                        });
                        console.log(this.props.orderData.dataRes);
                        this.props.navigation.navigate("UpcomingOrder")
                    } else {
                        this.setState({ isLoading: false });
                        this.alertMessage(this.props.orderData.errorMessage);
                    }
                });
        }
    }

    openSearchModal() {
        RNGooglePlaces.openAutocompleteModal()
            .then(place => {
                this.setState({
                    address: place.address,
                })
                if (!this.state.isLoading) {
                    this.setState({ isLoading: true });
                    console.log(place);
                    this.props
                        .updateAction({
                            ID: this.state.account.ID,
                            account_location: {
                                account_id: this.state.account.ID,
                                address: this.state.address,
                                lat: place.location.latitude,
                                lng: place.location.longitude,
                            },
                        })
                        .then(() => {
                            this.setState({ isLoading: false });
                            if (this.props.updatedData.success) {
                                this.setState({ isLoading: false });
                                console.log(this.props.updatedData.dataRes);
                            } else {
                                this.setState({ isLoading: false });
                                this.alertMessage(this.props.updatedData.errorMessage);
                            }
                        });
                }
            })
            .catch(error => console.log(error.message));
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
                        openSearchModal = {() => this.openSearchModal()}
                        text1 = {this.state.account.name}
                        text2 = {this.state.account.phone}
                        text3 = {this.state.address}
                        text4={this.state.distance + " km"} 
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
                        }}>Giao ngay - {estimateDeliveryTime(this.state.distance).hour}:{estimateDeliveryTime(this.state.distance).minute}, Hôm nay {this.state.date.getDate()}/{this.state.date.getMonth()+1}/{this.state.date.getFullYear()}</Text>
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
                        storeName = {this.state.restaurant.name}
                        storeAddress = {this.state.restaurant.store_location.address}

                    />
                </View>
                
                <RecyclerListView
                    rowRenderer={this.rowRenderer}
                    dataProvider={this.state.list}
                    layoutProvider={this.layoutProvider}
                />

                <Total 
                    CheckOut = {() => this.CheckOut(this.state.distance)}
                    total = {this.props.navigation.getParam("totalitem") + " phần - " + this.props.navigation.getParam("totalprice") + "đ"}
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
                <TouchableOpacity
                    onPress = {this.props.openSearchModal}
                >
                    <Text
                        style={styles.margin}>
                        {this.props.text3}
                    </Text>
                </TouchableOpacity>
                
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
                    }}>{this.props.total}</Text>
                <TouchableOpacity
                    onPress= {this.props.CheckOut}
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

function mapStateToProps(state) {
    return {
        orderData: state.OrderReducer,
        accountData: state.UpdateReducer,
        addressData: state.AddressReducer,
    };
}

function dispatchToProps(dispatch) {
    return bindActionCreators({
        orderAction,
        updateAction,
        addressAction,
    }, dispatch);
}

export default connect(mapStateToProps, dispatchToProps)(PaymentComponent);
