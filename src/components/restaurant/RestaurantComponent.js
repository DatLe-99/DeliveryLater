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
    Dimensions,
} from 'react-native';

import { WINDOW_SIZE } from '../../utils/scale';
import { FONT_SIZE } from '../../utils/fontsize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';

import SegmentedControlTab from 'react-native-segmented-control-tab';

import faker from 'faker';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';

import ReadMore from 'react-native-read-more-text';

import OnLayout from 'react-native-on-layout';
import {getReviewAction} from '../../redux/action';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;


class RestaurantComponent extends Component{
    innitialState = []
    constructor(props){
        super(props)
        // this.data = this.props.navigation.getParam('listMenu')
         /**Sai nè nha, trong constructor phải khai báo state, sửa như ở dưới*/
         this.state = {
             listData : this.props.navigation.getParam('listMenu'),
             storeId: this.props.navigation.getParam('storeId'),
             totalprice: 0,
             totalitem: 0,
             listorder: this.innitialState,
             tabindex: 0, //gian hàng, đánh giá, hình ảnh
         }
         console.log(this.props.getReviewAction)
         
    }
    componentDidMount = () => {
        console.log(this.state.listData.item)
    }

    parentCallbackIndex = (index) =>{
        this.setState({
          tabindex: index
        })
      }

    AddItemFood = (item) =>{
        // ToastAndroid.show(item.name,ToastAndroid.SHORT)
        // var orderItem = [{name: item.name, price: item.price, count: 1}]
        var tmp = this.state.listorder;
        for(var i = 0; i < tmp.length; i++){
            if( item.name == tmp[i].name){
                tmp[i].count += 1;
                this.setState({
                  totalprice: item.price + this.state.totalprice,
                  totalitem: 1 + this.state.totalitem,
                  listorder: tmp,
                });

                return;
            }
        }
        tmp.push({name: item.name, price: item.price, count: 1})
        this.setState({
          totalprice: item.price + this.state.totalprice,
          totalitem: 1 + this.state.totalitem,
          listorder: tmp,
        });
        console.log(tmp)
        console.log(this.props.getReviewAction())
        console.log(this.state.storeId);
    }
    MinusItemFood = (item) =>{
        // ToastAndroid.show(item.name,ToastAndroid.SHORT)
        // var orderItem = [{name: item.name, price: item.price, count: 1}]
        if(this.state.totalitem <= 0){
            return;
        }
        var tmp = this.state.listorder;
        for (var i = 0; i < tmp.length; i++) {
          if (item.name == tmp[i].name) {
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
        return(
            <View style = {{flex: 1}}>
                {/* <Text>{this.data.Categories[0].Items[0].name}</Text> */}
                {/* Can not get this data => Chỗ này lấy data không cần phức tạp vậy =.=
                cái item được truyền ở trong flatlist nó đã là 1 object rồi, lấy đơn giản như ở dưới đây là được!!!
                */}
                {/* <Text>{this.state.listData.item}</Text> */}
                <HeaderRestaurant
                    ResName = {this.state.listData.item.name}
                    ResAddress={this.state.listData.item.store_location.address}
                    onBack = {() => this.props.navigation.navigate("Search")}
                />
                
                <ListChoosen
                    parentCallbackIndex={this.parentCallbackIndex}
                />
                     
                {this.state.tabindex === 0 &&
                    <GianHang
                        data={this.state.listData.item.Categories}
                        AddItemFood = {this.AddItemFood}
                        MinusItemFood = {this.MinusItemFood}
                        count = {this.state.listorder}
                        totalprice = {this.state.totalprice}
                        totalitem = {this.state.totalitem}
                        Setschedule = {() => this.props.navigation.navigate("Calendar")}
                        goToPayment = {() => this.props.navigation.navigate("Payment")}
                    />
                }

                {this.state.tabindex === 1 && 
                    <Review 
                        getReviewAction = {this.props.getReviewAction}
                        getReviewData = {this.props.getReviewData}
                        storeId = {this.state.storeId}
                    />
                }
                
            </View> 
            
        );
    }
}

class Review extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: false,
            reviewData: null,
        }
        //console.log(this.props.getReviewAction())
        if (!this.state.isLoading) {
            this.setState({isLoading: true});
            this.props
                .getReviewAction({
                ID: this.props.storeId
              })
              .then(() => {
                this.setState({isLoading: false});
                if (this.props.getReviewData.success) {
                  this.setState({isLoading: false});
                  this.setState({reviewData: this.props.getReviewData.dataRes});

                } else {
                  this.setState({isLoading: false});
                  this.alertMessage(this.props.getReviewData.errorMessage);
                }
              });
        }
    }

    render() {
      if (this.state.reviewData !== null)
            return(
                <RecyclerViewForReview
                    reviewData = {this.state.reviewData}
                />
            );

        return (
            <View style={[styles.containerLoading, styles.horizontal]}>
                <ActivityIndicator size="large" color="#F34F08" />
            </View>
       );
    }
}

class RecyclerViewForReview extends Component {
    constructor(props) {
        super(props);

        const fakeData = [];

        for(var i = 0; i < Object.keys(this.props.reviewData).length; i+= 1) {
            fakeData.push({
                type: 'NORMAL',
                item: {
                id: i,
                nameUser: this.props.reviewData[i].name,
                numStar: this.props.reviewData[i].rate,
                description: this.props.reviewData[i].content,
                },
            });
        }

        this.state = {
            list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(fakeData),
        }

        this.layoutProvider = new LayoutProvider((i) => {
                return this.state.list.getDataForIndex(i).type;
              }, (type, dim) => {
                switch (type) {
                  case 'NORMAL': 
                      dim.width = SCREEN_WIDTH;
                      dim.height = SCREEN_HEIGHT/6;
                    break;
                  default: 
                    dim.width = 0;
                    dim.height = 0;
                    break;
                    
                };
        })
    }

    rowRenderer = (type, data) => {
        const {nameUser, description, numStar} = data.item;
        return (
        <View 
            style={{
                backgroundColor: '#fff',
                marginTop: 0.026*SCREEN_HEIGHT,
                marginBottom: 0.03*SCREEN_HEIGHT,
                marginLeft: 0.03*SCREEN_WIDTH,
                marginRight: 0.03*SCREEN_WIDTH,
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
                    width: SCREEN_HEIGHT/20,
                    height: SCREEN_HEIGHT/20,
                    marginLeft: 0.01*SCREEN_HEIGHT,
                    marginTop: 0.01*SCREEN_HEIGHT,
                    borderRadius: SCREEN_HEIGHT/5,
                }} source={require('../../media/images/hacker.jpg')} />

                <Text
                    style = {{
                        marginLeft: 0.01*SCREEN_HEIGHT,
                        fontSize: SCREEN_WIDTH/25,
                        padding: 0.01*SCREEN_HEIGHT,
                        fontWeight: 'bold',
                    }}>
                    {nameUser}
                </Text>
                
                <View
                    style = {{
                        position: 'absolute',
                        right: 0,
                        flexDirection: 'row',
                        margin: 0.01*SCREEN_HEIGHT,
                        marginRight: 0.03*SCREEN_HEIGHT,
                    }}>
                    <Text
                        style = {{
                            fontSize: SCREEN_WIDTH/25,
                        }}>
                        {numStar}
                    </Text>
                    
                    {numStar !== 0 && 
                        <IconEntypo name = 'star' size = {SCREEN_WIDTH/20} color = 'yellow'/>
                    }
                    
                    {numStar === 0 && 
                        <IconEntypo name = 'star' size = {SCREEN_WIDTH/20} color = '#CFCFCF'/>
                    }
                    
                </View>
                
            </View>

            <View style = {{
                    marginTop: 0.007*SCREEN_HEIGHT,
                    marginLeft: 0.082*SCREEN_HEIGHT,
                    marginRight: 0.03*SCREEN_HEIGHT,
                    marginBottom: 0.007*SCREEN_HEIGHT,
                }}>
                <CommentViewMore 
                    text = {description}
                />
            </View>
            
        </View>
        )
    }

    render() {
        return(
            <RecyclerListView
                rowRenderer={this.rowRenderer}
                dataProvider={this.state.list}
                layoutProvider={this.layoutProvider}
            />
        );
    }
}
class CommentViewMore extends Component {
    _renderTruncatedFooter = (handlePress) => {
        return (
          <Text style={{color: '#CFCFCF', marginTop: 5}} onPress={handlePress}>
            Xem thêm
          </Text>
        );
      }
    
      _renderRevealedFooter = (handlePress) => {
        return (
          <Text style={{color: '#CFCFCF', marginTop: 5}} onPress={handlePress}>
            Ẩn bớt
          </Text>
        );
      }

    render() {
        return (
            <ReadMore
                numberOfLines={3}
                renderTruncatedFooter={this._renderTruncatedFooter}
                renderRevealedFooter={this._renderRevealedFooter}
            >
            <Text>
                {this.props.text}
            </Text>
            </ReadMore>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.05)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    card: {
      marginHorizontal: 10,
      padding: 10,
      borderRadius: 3,
      borderColor: 'rgba(0,0,0,0.1)',
      borderWidth: 1,
      backgroundColor: '#fff',
    },
    cardText: {
      fontSize: 14,
    },
  });

class GianHang extends Component {
    render() {
        return (
            <View style={{
                marginTop: 10,
                flexDirection: 'column',
                flex: 1,
            }}>
                <FlatList
                    data={this.props.data}
                    listKey={(item, index) => 'D' + index.toString()}
                    renderItem={({ item }) =>
                            <CategoryItem
                                cate={item}
                                AddItemFood = {this.props.AddItemFood}
                                MinusItemFood = {this.props.MinusItemFood}
                                count = {this.props.count}
                            />
                    }
                    keyExtractor={item => item.id}
                />

                <OrderedBar
                    totalprice = {this.props.totalprice}
                    totalitem = {this.props.totalitem}
                    Setschedule = {this.props.Setschedule}
                    goToPayment = {this.props.goToPayment}
                />

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
    constructor(){
      super()
      this.state = {
        selectedIndex: 0,
      };
    }
  
    handleIndexChange = (index) => {
      this.setState({
        ...this.state,
        selectedIndex: index,
      });
  
      this.props.parentCallbackIndex(index)
      
      if(index == 0){
        //this.props.NearMe()
        ToastAndroid.show("Gian hàng pressed", ToastAndroid.SHORT)
      }
      else if(index == 1){
        //this.props.recommendStore()
        ToastAndroid.show("Đánh giá pressed", ToastAndroid.SHORT)
      }
    }
  
    render() {
        return (
            <View
              style = { {
                marginTop: 12
            }
            }>
                <SegmentedControlTab
                    values={['Gian hàng', 'Đánh giá', 'Hình ảnh']}
                    selectedIndex={this.state.selectedIndex}
                    onTabPress={this.handleIndexChange}
                    borderRadius={0}
                    tabsContainerStyle={{backgroundColor: '#F2F2F2' }}
                    tabStyle={{ backgroundColor: '#F2F2F2', borderWidth: 0, borderColor: 'transparent' }}
                    activeTabStyle={{ backgroundColor: 'white', marginTop: 2 }}
                    tabTextStyle={{ color: '#000'}}
                    activeTabTextStyle={{ color: '#fb4f46', fontWeight: 'bold' }}
                />
            </View>
        );
    }
  }

class OrderedBar extends Component{
    render(){
        return(
            <View 
                style = {{
                    flexDirection: 'row-reverse', 
                    position: 'absolute',
                    //width: '100%',
                    //height: WINDOW_SIZE.HEIGHT/25 ,
                    bottom: 0,
                    backgroundColor: "#f2f2f2", 
                    borderRadius: 10,
                }}>

                <TouchableOpacity
                    onPress = {this.props.Setschedule}
                    style={{ backgroundColor: "#2D87E2", borderRadius: 10, flex: 0.5, alignSelf: 'stretch', justifyContent: 'center', marginRight: 10}}>
                    <Text style={{ 
                        fontFamily: 'Roboto', 
                        fontStyle: 'normal', 
                        fontWeight: "bold", 
                        fontSize: 14, 
                        lineHeight: 14, 
                        color: "#FFFFFF", textAlign: 'center'}}>Lên lịch</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ backgroundColor: "rgba(243,79,8,0.8)", borderRadius: 10, flex: 0.5, alignSelf: 'stretch', justifyContent: 'center'}}
                    onPress = {this.props.goToPayment}
                    >
                    <Text style={{ fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: "bold", fontSize: 14, lineHeight: 14, color: "#FFFFFF", textAlign: 'center'}}>Đặt ngay</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{
                        // flex: 1, 
                        // alignSelf: 'center', 
                        // marginLeft: 10
                    }}>
                    <Text
                        style = {{
                            padding: 10,
                        }}>{this.props.totalitem} phần - {this.props.totalprice}đ</Text>
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
                    <View style={{ flexDirection: 'column', flex: 0.9 }}>
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
                    <Text>{countFoodItem(fooditem, count)}</Text>
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
    if (item.name == tmp[i].name) {
      return tmp[i].count;
    }
  }
  return 0;
};

function mapStateToProps(state) {
    return {
      getReviewData: state.GetReviewReducer,
    };
  }
  
  function dispatchToProps(dispatch) {
    return bindActionCreators(
      {
        getReviewAction,
      },
      dispatch,
    );
  }
  
  export default connect(mapStateToProps, dispatchToProps)(RestaurantComponent);
  

