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
    AppRegistry,
    Modal,
    RefreshControl,
} from 'react-native';

import { WINDOW_SIZE } from '../../utils/scale';
import { FONT_SIZE } from '../../utils/fontsize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/AntDesign';


export default class RestaurantComponent extends Component{
    innitialState = []
    constructor(props){
        super(props)
        // this.data = this.props.navigation.getParam('listMenu')
         /**Sai nè nha, trong constructor phải khai báo state, sửa như ở dưới*/
         this.state = {
             listData : this.props.navigation.getParam('listMenu'),
             totalprice: 0,
             totalitem: 0,
             listorder: this.innitialState,
             addess: this.props.navigation.getParam('address'),
             accountID: this.props.navigation.getParam('accountID'),
         }
    }
    componentDidMount = () => {
        console.log(this.state.listData.item)
    }
    AddItemFood = (item) =>{
        // ToastAndroid.show(item.name,ToastAndroid.SHORT)
        // var orderItem = [{name: item.name, price: item.price, count: 1}]
        var tmp = this.state.listorder;
        for(var i = 0; i < tmp.length; i++){
            if( item.ID == tmp[i].ID){
                tmp[i].count += 1;
                this.setState({
                  totalprice: item.price + this.state.totalprice,
                  totalitem: 1 + this.state.totalitem,
                  listorder: tmp,
                });
                
                return;
            }
        }
        tmp.push({ID: item.ID, name: item.name, price: item.price, count: 1})
        this.setState({
          totalprice: item.price + this.state.totalprice,
          totalitem: 1 + this.state.totalitem,
          listorder: tmp,
        });
        console.log(tmp)
    }
    MinusItemFood = (item) =>{
        // ToastAndroid.show(item.name,ToastAndroid.SHORT)
        // var orderItem = [{name: item.name, price: item.price, count: 1}]
        if(this.state.totalitem <= 0){
            return;
        }
        var tmp = this.state.listorder;
        for (var i = 0; i < tmp.length; i++) {
          if (item.ID == tmp[i].ID) {
            tmp[i].count -= 1;
            if(tmp[i].count == 0){
                tmp.splice(i)
            }
            this.setState({
              totalprice: - item.price + this.state.totalprice,
              totalitem: - 1 + this.state.totalitem,
              listorder: tmp,
            });
            return;
          }
        }
    }
    
    // onRefresh = (item) => {
    //     this.countFoodItem(item)
    //     this.setState({
    //         refreshing: false
    //     })
    // }
    render(){
        return (
          <View style={{flexDirection: 'column', flex: 1}}>
            {/* <Text>{this.data.Categories[0].Items[0].name}</Text> */}
            {/* Can not get this data => Chỗ này lấy data không cần phức tạp vậy =.=
                cái item được truyền ở trong flatlist nó đã là 1 object rồi, lấy đơn giản như ở dưới đây là được!!! 
                */}
            {/* <Text>{this.state.listData.item}</Text> */}
            <HeaderRestaurant
              ResName={this.state.listData.item.name}
              ResAddress={this.state.listData.item.store_location.address}
              onBack={() =>
                this.props.navigation.navigate('Home')
              }></HeaderRestaurant>
            <ListChoosen></ListChoosen>
            <View style={{marginTop: 10, flex: 0.9}}>
              <FlatList
                data={this.state.listData.item.Categories}
                listKey={(item, index) => 'D' + index.toString()}
                renderItem={({item}) => (
                  <CategoryItem
                    cate={item}
                    AddItemFood={this.AddItemFood}
                    MinusItemFood={this.MinusItemFood}
                    count={this.state.listorder}
                  />
                )}
                keyExtractor={item => item.id}
              />
            </View>
            <OrderedBar
              totalprice={this.state.totalprice}
              totalitem={this.state.totalitem}
              Setschedule={() =>
                this.props.navigation.navigate('Calendar', {
                  accountID: this.state.accountID,
                  address: this.state.address,
                  orderlist: this.state.listorder
                })
              }></OrderedBar>
            {/* <OrderedModal
                    AddItemFood = {this.AddItemFood}
                    MinusItemFood = {this.MinusItemFood}
                /> */}
          </View>
        );
    }
}

class HeaderRestaurant extends Component {
    render(){
        let Image_Http_Url = { uri: "https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"};
        return(
            <ImageBackground 
                source = {Image_Http_Url}
                style={{ width: WINDOW_SIZE.WIDTH, height: WINDOW_SIZE.HEIGHT/4}}>
                <View style = {{flexDirection: 'column', flex: 1}}>
                    <View style = {{flexDirection: "row"}}>
                        <TouchableOpacity
                            onPress = {this.props.onBack}
                        >
                            <Icon name="left" size={30} color= "#FFFFFF" />
                        </TouchableOpacity>
                        
                        <View style={{flex: 1}}></View>
                        <Icon style = {{marginRight: 10}} name="star" size={30} color="#E1CC08"/>
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

class OrderedBar extends Component{
    render(){
        return(
            <View style= {{flexDirection: 'row', position: 'absolute',width: '100%',height: WINDOW_SIZE.HEIGHT/25 ,bottom: 0, backgroundColor: "#C4C4C4", borderRadius: 10}}>
                
                <TouchableOpacity style={{flex: 1, alignSelf: 'center', marginLeft: 10}}>
                    <Text>{this.props.totalitem} phần - {this.props.totalprice}đ</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={{ backgroundColor: "rgba(243,79,8,0.8)", borderRadius: 10, flex: 0.5, alignSelf: 'stretch', justifyContent: 'center'}}
                    // onPress = {}
                    >
                    <Text style={{ fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: "bold", fontSize: 14, lineHeight: 14, color: "#FFFFFF", textAlign: 'center'}}>Đặt ngay</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress = {this.props.Setschedule}
                    style={{ backgroundColor: "#2D87E2", borderRadius: 10, flex: 0.5, alignSelf: 'stretch', justifyContent: 'center', marginRight: 10}}>
                    <Text style={{ fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: "bold", fontSize: 14, lineHeight: 14, color: "#FFFFFF", textAlign: 'center'}}>Lên lịch</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

class OrderedModal extends Component{
    render(){
        return (
          <View>
            <Modal animationType={'slide'} transparent={false}>
              <View style={{flexDirection: 'column'}}>
                <OrderedBar />
                <View>
                  <FlatList
                    data={this.props.listorder}
                    listKey={(item, index) => 'D' + index.toString()}
                    renderItem={({item}) => (
                      <FoodItem
                          fooditem = {item}
                          AddItemFood = {this.props.AddItemFood}
                          MinusItemFood = {this.props.MinusItemFood}
                          count = {item}
                      />
                    )}
                    keyExtractor={item => item.id}
                  />
                </View>
              </View>
            </Modal>
          </View>
        );
    }
}



function CategoryItem({ cate , AddItemFood, MinusItemFood, count}) {
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
                        <FoodItem 
                            fooditem={item} 
                            AddItemFood = {AddItemFood}
                            MinusItemFood = {MinusItemFood}
                            count = {count}
                        />
                    }
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    );
}

function FoodItem({ fooditem, AddItemFood, MinusItemFood, count}) {
    return(
            <View>
                <View style={{ flexDirection: "row", marginTop: 5, borderRadius: 12, backgroundColor: "#C4C4C4", alignItems: "center", marginLeft: 30, marginRight: 30 }}>
                    <Image style={{ borderRadius: 10, width: 30, height: 30, margin: 5 }}
                        source={require("../../media/images/test.jpg")}
                    />
                    <View style={{ flexDirection: 'column', flex: 0.6 }}>
                        <Text
                            style={{ fontFamily: "Roboto", fontStyle: "normal", fontWeight: "bold", fontSize: 12, lineHeight: 12, alignItems: "center", color: "#000000", opacity: 0.5 }}

                        >{fooditem.name}</Text>
                        <Text
                            style={{ fontFamily: "Roboto", fontStyle: "normal", fontWeight: "300", fontSize: 12, lineHeight: 12, alignItems: "center", color: "#000000", opacity: 0.5 }}

                        >{fooditem.price}</Text>
                    </View>
                    <View style = {{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', flex: 1, margin: 10}}>
                        <TouchableOpacity
                        onPress={() => MinusItemFood(fooditem)}
                        style={{ flex: 0.1, alignSelf: "center", alignContent: "flex-end" }}>
                        <Icon name="minuscircle" size={15} color= "#900" />
                    </TouchableOpacity>
                    <Text> {countFoodItem(fooditem, count)} </Text>
                    <TouchableOpacity
                        onPress={() => AddItemFood(fooditem)}
                        style={{ flex: 0.1, alignSelf: "center", alignContent: "flex-end" }}>
                        <Icon name="pluscircle" size={15} color= "#900" />
                    </TouchableOpacity>
                    </View>
                    
                </View>
                <View style={{ borderBottomColor: '#000000', borderBottomWidth: 1, marginLeft: 30, marginRight: 30, marginTop: 5 }} />
            </View>
        );
}

function countFoodItem (item, listorder) {
  var tmp = listorder;
  for (var i = 0; i < tmp.length; i++) {
    if (item.ID == tmp[i].ID) {
      return tmp[i].count;
    }
  }
  return 0;
};