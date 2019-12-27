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
    PermissionsAndroid
} from 'react-native';

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
            <View>
                {/* <Text>{this.data.Categories[0].Items[0].name}</Text> */} 
                {/* Can not get this data => Chỗ này lấy data không cần phức tạp vậy =.=
                cái item được truyền ở trong flatlist nó đã là 1 object rồi, lấy đơn giản như ở dưới đây là được!!! 
                */}
            <Text>{this.state.listData.item.name}</Text>


            </View>
        );
    }
}