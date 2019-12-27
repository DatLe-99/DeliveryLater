import React, { Component } from 'react';
import {
    FlatList,
    View,
    Text,
    Image,
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
    RefreshControl
} from 'react-native';

import { WINDOW_SIZE } from '../../utils/scale';
import { FONT_SIZE } from '../../utils/fontsize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/AntDesign';


export default class RestaurantComponent extends Component{
    constructor(props){
        super(props)
        // this.data = this.props.navigation.getParam('listMenu')
         /**Sai nè nha, trong constructor phải khai báo state, sửa như ở dưới*/
         this.state = {
             listData : this.props.navigation.getParam('listMenu')
         }
    }
    componentDidMount = () => {
        console.log(this.state.listData.item)
    }
    render(){
        return(
            <View style = {{flexDirection: "column", flex: 1}}>
                {/* <Text>{this.data.Categories[0].Items[0].name}</Text> */} 
                {/* Can not get this data => Chỗ này lấy data không cần phức tạp vậy =.=
                cái item được truyền ở trong flatlist nó đã là 1 object rồi, lấy đơn giản như ở dưới đây là được!!! 
                */}
                {/* <Text>{this.state.listData.item}</Text> */}
                <HeaderRestaurant 
                    ResName = {this.state.listData.item.name}
                    ResAddress={this.state.listData.item.store_location.address}
                ></HeaderRestaurant>
                <ListChoosen></ListChoosen>
                <View style={{marginTop: 10}}>
                    <FlatList
                        data={this.state.listData.item.Categories}
                        listKey={(item, index) => 'D' + index.toString()}
                        renderItem={({ item }) => 
                                <CategoryItem
                                    cate={item}
                                />
                        }
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        );
    }
}

class HeaderRestaurant extends Component {
    render(){
        return(
            <ImageBackground 
                source = {require('../../media/images/test.jpg')}
                style={{ width: WINDOW_SIZE.WIDTH, height: WINDOW_SIZE.HEIGHT/4}}>
                <View style = {{flexDirection: 'column', flex: 1}}>
                    <View style = {{flexDirection: "row"}}>
                        <Icon name="left" size={30} color="#900" />
                        <View style={{flex: 0.9}}></View>
                        <Icon name="star" size={30} color="#900"/>
                        <Text>{this.props.Rating}</Text>
                    </View>
                    <View style={{flex: 0.9}}></View>
                    <Text
                        style = {{margin: 5,fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: "bold", fontSize: 14, lineHeight: 12, color: "#FFFFFF"}}
                    >{this.props.ResName}</Text>
                    <Text
                        style={{ margin: 5, fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: "normal", fontSize: 12, lineHeight: 12, color : "#FFFFFF" }}
                    >{this.props.ResAddress}</Text>
                </View>
            </ImageBackground>
        );
    }
}

class ListChoosen extends Component {
    render(){
        return(
            <View style = {{flexDirection: "row", flex: 0.05, marginTop: 10}}>
                <Text style={{ flex: 1 , color: "#F34F08", fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: "bold", fontSize: 14, lineHeight: 14, textAlign: 'center'}}>Gian hàng</Text>
                <Text style={{ flex: 1, fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: "normal", fontSize: 14, lineHeight: 14, color: "#000000", textAlign: 'center'}}>Đánh giá</Text>
                <Text style={{ flex: 1 , fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: "normal", fontSize: 14, lineHeight: 14, color: "#000000", textAlign: 'center' }}>Hình ảnh</Text>
            </View>
        );
    }
}

function CategoryItem({ cate }) {
    return (
        <View style={{ flexDirection: "column", flex: 1 }}>
            <View>
                <Text
                    style={{ margin: 5, fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: "bold", fontSize: 14, lineHeight: 14, color : "#000000" }}
                >Phân loại: {cate.name}</Text>
            </View>
            <View style={{ borderBottomColor: '#000000', borderBottomWidth: 1 }} />
            <View>
                <FlatList
                    listKey={(item, index) => 'D' + index.toString()}
                    data={cate.Items}
                    renderItem={({ item }) =>
                        <FoodItem fooditem={item} />
                    }
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    );
}

function FoodItem({fooditem}) {
    return(
            <View>
                <View style={{ flexDirection: "row", marginTop: 5, borderRadius: 12, backgroundColor: "#C4C4C4", alignItems: "center", marginLeft: 30, marginRight: 30 }}>
                    <Image style={{ borderRadius: 10, width: 30, height: 30, margin: 5 }}
                        source={require("../../media/images/test.jpg")}
                    />
                    <View style={{ flexDirection: 'column', flex: 0.9 }}>
                        <Text
                            style={{ fontFamily: "Roboto", fontStyle: "normal", fontWeight: "bold", fontSize: 12, lineHeight: 12, alignItems: "center", color: "#000000", opacity: 0.5 }}

                        >{fooditem.name}</Text>
                        <Text
                            style={{ fontFamily: "Roboto", fontStyle: "normal", fontWeight: "300", fontSize: 12, lineHeight: 12, alignItems: "center", color: "#000000", opacity: 0.5 }}

                        >{fooditem.price}</Text>
                    </View>
                    <TouchableOpacity
                        style={{ flex: 0.1, alignSelf: "center", alignContent: "flex-end" }}>
                        <Icon name="pluscircle" size={15} color= "#900" />
                    </TouchableOpacity>
                </View>
                <View style={{ borderBottomColor: '#000000', borderBottomWidth: 1, marginLeft: 30, marginRight: 30, marginTop: 5 }} />
            </View>
        );
}
