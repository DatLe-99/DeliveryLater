import React, { Component } from 'react';
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

import { WINDOW_SIZE } from '../../utils/scale';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import { orderAction, updateaddressorderAction, addressAction } from '../../redux/action'
import RNGooglePlaces from 'react-native-google-places';
import { FlatList } from 'react-native-gesture-handler';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
//2020-01-04T10:14:57+07:00
function getOrderPriceItem (order){
    var price = 0
    var item = 0
    for(var i =0; i< order.length; i++){
        price += order[i].price * order[i].count;
        item += order[i].count;
    }
    return {price: price, item: item};
}


function listOrdersendRequest(listorder) {
    var sendData = [];
    for (var i = 0; i < listorder.length; i++) {
            sendData.push({
                ItemId: listorder[i].ID,
                name: listorder[i].name,
                amount: listorder[i].count,
                price: listorder[i].price,
            })
    }
    return sendData
}
function formatYYYYMMDD() {
    var today = new Date()
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    var hr = today.getHours();
    var mi = today.getMinutes();
    var se = today.getSeconds();
    
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    if (hr < 10) {
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

function formatYYYYMMDDSchedule(time){
    return time.date + "T" + time.time + ":00" + "+07:00"
}
class PaymentSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listorder: this.props.navigation.getParam("listorder"),
            address: this.props.navigation.getParam("address"),
            account: this.props.navigation.getParam("account"),
            restaurant: this.props.navigation.getParam("restaurant"),
            distance: this.props.navigation.getParam("restaurant").distance.toFixed(2),
            isLoading: false,
        };
    }

    componentDidMount() {
        console.log(this.state.listorder)
    }

    listOrderSend = () => {
        var ret = []
        var tmp = this.state.listorder;
        for(var i = 0 ; i< tmp.length; i++){
            ret.push({
              AccountId: this.state.account.ID,
              StoreId: this.state.restaurant.ID,
              StoreName: this.state.restaurant.name,
              ReceiveAddress: this.state.address,
              TotalItem: getOrderPriceItem(tmp[i].listorder).item,
              TotalPrice: getOrderPriceItem(tmp[i].listorder).price,
              created: formatYYYYMMDD(),
              deadline: formatYYYYMMDDSchedule(tmp[i]),
              address: this.state.restaurant.store_location.address,
              orderitems: listOrdersendRequest(tmp[i].listorder),
            });
        }
        return ret;
    }

    //2020-01-04T10:14:57+07:00
    CheckOut = (distance) => {
        if (distance > 20) {
            ToastAndroid.show("Xin lỗi. Bạn chỉ có thể đặt trong bán kính 20km", ToastAndroid.SHORT)
            return;
        }
        if (!this.state.isLoading) {
            this.setState({ isLoading: true });
            this.props
                .orderAction(
                    this.listOrderSend()
                )
                .then(() => {
                    this.setState({ isLoading: false });
                    if (this.props.orderData.success) {
                        this.setState({
                            isLoading: false,
                        });
                        console.log(this.props.orderData.dataRes);
                        this.props.navigation.navigate("UpcomingOrder", {
                            account: this.state.account,
                        })
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
            });
            if (!this.state.isLoading) {
              this.setState({isLoading: true});
              console.log(place);
              this.props
                .updateaddressorderAction({
                  lat1: place.location.latitude,
                  lng1: place.location.longitude,
                  lat2: this.state.restaurant.store_location.Lat,
                  lng2: this.state.restaurant.store_location.Lng,
                })
                .then(() => {
                  this.setState({isLoading: false});
                  if (this.props.distanceData.dataRes) {
                    this.setState({isLoading: false});
                    this.setState({
                      distance: this.props.distanceData.dataRes.toFixed(2),
                    });
                    console.log(this.props.distanceData.dataRes);
                  } else {
                    this.setState({isLoading: false});
                    this.alertMessage(this.props.distanceData.errorMessage);
                  }
                });
            }
          })
          .catch(error => console.log(error.message));
    }
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#f2f2f2',
                }}>
                <HeaderBar />

                <View
                    style={{
                        flexDirection: 'row',
                    }}>
                    <UserInfo
                        openSearchModal={() => this.openSearchModal()}
                        text1={this.state.account.name}
                        text2={this.state.account.phone}
                        text3={this.state.address}
                        text4={this.state.distance + " km"}
                    />

                    <TouchableOpacity
                        style={{
                            marginRight: 20,
                            marginTop: 10,
                            flexDirection: 'column',
                            position: 'absolute',
                            right: 0,
                        }}>
                        <Image
                            style={{
                                padding: 10,
                                height: SCREEN_HEIGHT / 10,
                                width: SCREEN_HEIGHT / 10,
                            }}
                            source={require('../../media/images/modify.png')} />
                    </TouchableOpacity>

                </View>

                <View
                    style={{
                        marginTop: 10,
                        flexDirection: 'row',
                    }}>

                    <Text
                        style={{
                            padding: 10,
                        }}>Danh sách lịch đặt</Text>
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            right: 0,
                            alignSelf: 'center',
                            //marginTop: SCREEN_WIDTH/20,
                            marginRight: 5,
                        }}>
                        <Image
                            style={{
                                padding: 10,
                                height: SCREEN_HEIGHT / 20,
                                width: SCREEN_HEIGHT / 20,
                                marginRight: 10,

                            }}
                            source={require('../../media/images/modify.png')} />
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        margin: 10,
                        marginBottom: 20,

                    }}>

                    <Storename
                        storeName={this.state.restaurant.name}
                        storeAddress={this.state.restaurant.store_location.address}

                    />
                </View>

                <View style={{flex: 1}}>
                    <FlatList
                        listKey={(item, index) => 'D' + index.toString()}
                        data={this.state.listorder}
                        renderItem={({ item }) => (
                            <ScheduleItem
                                orderitem= {item}
                            />
                        )}
                        keyExtractor={item => item.id}
                    />
                </View>

                <Total
                    CheckOut={() => this.CheckOut(this.state.distance)}
                    total={this.props.navigation.getParam("totalitem") + " phần - " + this.props.navigation.getParam("totalprice") + "đ"}
                />
            </View>
        );
    }
}


class HeaderBar extends Component {
    render() {
        return (
            <View
                style={{
                    //flex: 0.1,
                    alignItems: 'center',
                    backgroundColor: '#f2f2f2',
                }}>
                <Text
                    style={{
                        color: '#000',
                        alignSelf: 'center',
                        fontWeight: 'bold',
                        fontSize: SCREEN_WIDTH / 25,
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
        return (
            <View
                style={{
                    flexDirection: 'column',
                    marginTop: SCREEN_HEIGHT / 50,
                    marginLeft: SCREEN_HEIGHT / 50,
                }}>
                <Text
                    style={{
                        fontSize: SCREEN_HEIGHT / 30,
                        fontWeight: 'bold',
                        marginBottom: 10,
                    }}>
                    {this.props.text1}</Text>

                <Text
                    style={styles.margin}>
                    {this.props.text2}</Text>
                <TouchableOpacity
                    onPress={this.props.openSearchModal}
                >
                    <Text
                        style={styles.margin}>
                        {this.props.text3}
                    </Text>
                </TouchableOpacity>

                <Text
                    style={styles.margin}>
                    {this.props.text4}</Text>
            </View>
        );
    }
}

class Storename extends Component {
    render() {
        return (
            <View
                style={{
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
                    style={{
                        flex: 0.7,
                        padding: 15,
                        fontSize: SCREEN_WIDTH / 25,
                        fontWeight: 'bold',
                        textAlignVertical: 'center',
                    }}>{this.props.storeName}</Text>
                <Text
                    style={{
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
        return (
            <View
                style={{
                    flexDirection: 'row',
                    // marginTop: SCREEN_HEIGHT*0.03,
                    borderBottomWidth: 0.5,
                    borderTopWidth: 0.5,
                    borderColor: '#e1dedb',
                    backgroundColor: '#fff',
                }}>
                <Text
                    style={{
                        flex: 0.8,
                        padding: 20,
                        fontSize: SCREEN_HEIGHT / 45,
                    }}>
                    {this.props.text1}
                </Text>

                <Text
                    style={{
                        position: 'absolute',
                        right: 0,
                        padding: 20,
                        paddingRight: 10,
                        fontSize: SCREEN_HEIGHT / 45,

                    }}>
                    {this.props.text2}
                </Text>
            </View>
        );

    }
}

class Total extends Component {
    render() {
        return (
            <View
                style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    marginBottom: 10,
                }}>


                <Text
                    style={{
                        //backgroundColor: 'rgba(243, 79, 8, 0.8)',
                        padding: 10,
                        borderRadius: 10,
                        marginLeft: 10,
                        fontWeight: 'bold',
                        fontSize: SCREEN_HEIGHT / 40,
                    }}>Tổng cộng</Text>


                <Text
                    style={{
                        padding: 10,
                        marginLeft: 20,
                        textAlignVertical: 'center',
                        fontWeight: "bold",
                        fontSize: 15,
                    }}>{this.props.total}</Text>
                <TouchableOpacity
                    onPress={this.props.CheckOut}
                    style={{
                        position: 'absolute',
                        right: 0,
                        //marginTop: SCREEN_WIDTH/20,
                        marginRight: 10,
                    }}>

                    <Text
                        style={{
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
        marginTop: SCREEN_HEIGHT / 150,
        marginBottom: SCREEN_HEIGHT / 150,
    },
    bodyText: {
        marginLeft: SCREEN_HEIGHT * 0.005,
        textAlignVertical: 'center',
        fontSize: SCREEN_HEIGHT / 50,
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

function ScheduleItem({orderitem}) {
    return (
        <View style={{ flexDirection: 'column', flex: 1, backgroundColor: "#FFFFFF", borderRadius: 12, margin: 10, padding: 5}}>
            <View>
                <Text
                    style={{
                        margin: 5,
                        fontFamily: 'Roboto',
                        fontStyle: 'normal',
                        fontWeight: 'bold',
                        fontSize: 14,
                        lineHeight: 14,
                        color: '#000000',
                    }}>
                    Ngày đặt: {orderitem.time} giờ, Ngày {orderitem.date}
                </Text>
            </View>
            <View style={{ borderBottomColor: '#000000', borderBottomWidth: 1 }} />
            <View>
                <FlatList
                    listKey={(item, index) => 'D' + index.toString()}
                    data={orderitem.listorder}
                    renderItem={({ item }) => (
                        <FoodItem
                            fooditem={item}
                        />
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
            <View style={{ borderBottomColor: '#000000', borderBottomWidth: 1 }} />
            <View style = {{flexDirection: "row"}}>
                <Text style = {{flex: 0.8}}>Tổng:</Text>
                <Text style={{ flex: 0.2 , fontSize: 15, fontWeight: "bold"}}>{TotalCost(orderitem.listorder)}Đ</Text>
            </View>
        </View>
    );
}

function FoodItem({fooditem}){
    return(
        <View style = {{flexDirection: "row", margin: 10}}>
            <Text style = {{flex: 0.7}}>{fooditem.name}</Text>
            <Text style={{ flex: 0.1 }}>x{fooditem.count}</Text>
            <Text style={{ flex: 0.2 }}>{fooditem.price * fooditem.count}Đ</Text>
        </View>
    );
}

function TotalCost(listorder){
    var ret = 0
    for(var i = 0; i< listorder.length; i++){
        ret += listorder[i].price * listorder[i].count
    }
    return ret;
}

function mapStateToProps(state) {
    return {
        orderData: state.OrderReducer,
        accountData: state.UpdateReducer,
        addressData: state.AddressReducer,
        distanceData: state.UpdateaddressorderReducer,
    };
}

function dispatchToProps(dispatch) {
    return bindActionCreators({
        orderAction,
        addressAction,
        updateaddressorderAction,
    }, dispatch);
}

export default connect(mapStateToProps, dispatchToProps)(PaymentSchedule)
