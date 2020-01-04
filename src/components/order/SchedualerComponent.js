import React, {Component} from 'react';
import moment from 'moment';
import {StyleSheet, Text, FlatList, Image} from 'react-native';

import {WINDOW_SIZE} from '../../utils/scale';
import {FONT_SIZE} from '../../utils/fontsize';
import LoginBackground from 'images/LoginBackground.jpg';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {View} from 'react-native-animatable';
import {TouchableOpacity} from 'react-native-gesture-handler';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {orderAction} from '../../redux/action';


function listOrdersendRequest(listorder) {
  var sendData = [];
  for (var i = 0; i < listorder.length; i++) {
    if(listorder[i].isSelect){
    sendData.push({
      ItemId: listorder[i].ID,
      amount: listorder[i].count,
      price: listorder[i].price,
    });}
  }
  return sendData;
}

class SchedualerComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDatePickerVisible: false,
      orderlist: this.props.navigation.getParam('listorder'),
      address: this.props.navigation.getParam('address'),
      account: this.props.navigation.getParam('account'),
      restaurant: this.props.navigation.getParam('restaurant'),
      currentFoodItem: {},
      tmporderlist: [],
    };
    console.log(this.state.orderlist);
    this.state.orderlist.forEach(function(element) {
      element.datetime = moment();
      element.isSelect = false;
      element.selectedClass = styles.list;
    });
    console.log(this.state.orderlist);
  }
  showDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };
  hideDatePicker() {
    this.setState({isDatePickerVisible: false});
  }

  handleConfirm(datetime) {
    this.CheckOut(this.state.restaurant.distance,datetime)
    this.hideDatePicker;
  }
  CheckOut = (distance,datetime) => {
    if (distance > 20) {
      ToastAndroid.show(
        'Xin lỗi. Bạn chỉ có thể đặt trong bán kính 20km',
        ToastAndroid.SHORT,
      );
      return;
    }
    if (!this.state.isLoading) {
      this.setState({isLoading: true});
      var date = this.state.date;
      this.props
        .orderAction([
          {
            AccountId: this.state.account.ID,
            created: moment().format(),
            deadline: moment(datetime).format(),
            address: this.state.address,
            orderitems: listOrdersendRequest(this.state.orderlist),
          },
        ])
        .then(() => {
          this.setState({isLoading: false});
          if (this.props.orderData.success) {
            this.setState({
              isLoading: false,
            });
            console.log(this.props.orderData.dataRes);
            this.props.navigation.navigate('UpcomingOrder');
          } else {
            this.setState({isLoading: false});
            this.alertMessage(this.props.orderData.errorMessage);
          }
        });
    }
  };
  selectItem = item => {
    item.isSelect = !item.isSelect;
    item.selectedClass = item.isSelect ? styles.selected : styles.list;
    // const index = this.state.orderlist.findIndex(ID => item.ID === ID);
    var tmp = this.state.orderlist;
    // console.log(index)
    for (var i = 0; i < tmp.length; i++) {
      if (item.ID === tmp[i].ID) {
        console.log(item.ID);
        tmp[i] = item;
        this.setState({
          orderlist: tmp,
        });
      }
      console.log(this.state.orderlist);
    }
  };
  render() {
    return (
      <View>
        <HeaderSchedualer></HeaderSchedualer>
        <FlatList
          listKey={(item, index) => 'D' + index.toString()}
          data={this.state.orderlist}
          renderItem={({item}) => (
            <FoodItem
              fooditem={item}
              onPressItem={() => this.selectItem(item)}
            />
          )}
          keyExtractor={item => item.id}
          height={500}
        />

        <TouchableOpacity
          style={{
            backgroundColor: 'rgba(243,79,8,0.8)',
            borderRadius: 10,
            alignSelf: 'stretch',
            justifyContent: 'center',
            height: WINDOW_SIZE.HEIGHT / 20,
          }}
          onPress={this.showDatePicker()}>
          <Text
            style={{
              fontFamily: 'Roboto',
              fontStyle: 'normal',
              fontWeight: 'bold',
              fontSize: 14,
              lineHeight: 14,
              color: '#FFFFFF',
              textAlign: 'center',
            }}>
            Lên lịch
          </Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={this.state.isDatePickerVisible}
          mode="datetime"
          onConfirm={datetime => this.handleConfirm(datetime)}
          onCancel={() => this.hideDatePicker()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontFamily: 'Verdana',
    fontSize: 21,
    fontStyle: 'normal',
    width: 305,
    height: 35,
    color: '#FFFFFF',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  text: {
    justifyContent: 'center',
    fontFamily: 'Verdana',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 15,
    lineHeight: 18,
    alignItems: 'center',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#192338',
    paddingVertical: 50,
    position: 'relative',
  },

  title: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  list: {
    paddingVertical: 5,
    margin: 3,
    flexDirection: 'row',
    backgroundColor: '#192338',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: -1,
  },

  lightText: {
    color: '#f7f7f7',
    width: 200,
    paddingLeft: 15,
    fontSize: 12,
  },

  line: {
    height: 0.5,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },

  icon: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    left: 290,
    zIndex: 1,
  },

  numberBox: {
    position: 'absolute',
    bottom: 75,
    width: 30,
    height: 30,
    borderRadius: 15,
    left: 330,
    zIndex: 3,
    backgroundColor: '#e3e3e3',
    justifyContent: 'center',
    alignItems: 'center',
  },

  number: {fontSize: 14, color: '#000'},

  selected: {backgroundColor: '#FA7B5F'},
});

function FoodItem({fooditem, onPressItem}) {
  return (
    <TouchableOpacity
      onPress={onPressItem}
      style={[styles.list, fooditem.selectedClass]}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 5,
          borderRadius: 12,
          backgroundColor: '#C4C4C4',
          alignItems: 'center',
          marginLeft: 30,
          marginRight: 30,
        }}>
        <Image
          style={{borderRadius: 10, width: 30, height: 30, margin: 5}}
          source={require('../../media/images/test.jpg')}
        />
        <View style={{flexDirection: 'column', flex: 0.9}}>
          <Text
            style={{
              fontFamily: 'Roboto',
              fontStyle: 'normal',
              fontWeight: 'bold',
              fontSize: 12,
              lineHeight: 12,

              alignItems: 'center',
              color: '#000000',
              opacity: 0.5,
            }}>
            {fooditem.name}
          </Text>
          <Text
            style={{
              fontFamily: 'Roboto',
              fontStyle: 'normal',
              fontWeight: '300',
              fontSize: 12,
              lineHeight: 12,
              alignItems: 'center',
              color: '#000000',
              opacity: 0.5,
            }}>
            {fooditem.price}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: '300',
            fontSize: 12,
            lineHeight: 12,
            alignItems: 'center',
            color: '#fb4f46',
            opacity: 0.5,
          }}>
          {fooditem.datetime.format()}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            flex: 1,
            margin: 10,
          }}></View>
        {/* <Text
          style={{
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: '300',
            fontSize: 12,
            lineHeight: 12,
            alignItems: 'center',
            color: '#000000',
            opacity: 0.5,
          }}>
          {fooditem.datetime}
        </Text> */}
      </View>
      <View
        style={{
          borderBottomColor: '#000000',
          borderBottomWidth: 1,
          marginLeft: 30,
          marginRight: 30,
          marginTop: 5,
        }}
      />
    </TouchableOpacity>
  );
}

// class HeaderSchedualer extends Component {
//   render() {
//     return (
//       <View
//         style={{
//           marginTop: 20,
//           flexDirection: 'row',
//           height: WINDOW_SIZE.HEIGHT / 18,
//           backgroundColor: '#FFFFFF',
//         }}>
//         <TouchableOpacity style={{}}>
//           <IconAntDesign
//             onPress={this.props.onBack}
//             name="left"
//             size={30}
//             color="#000000"
//           />
//         </TouchableOpacity>
//         <View
//           style={{
//             borderRadius: 20,
//             borderWidth: 1,
//             alignSelf: 'center',
//             justifyContent: 'center',
//           }}>
//           <Text
//             style={{
//               fontFamily: 'Verdana',
//               fontStyle: 'normal',
//               fontWeight: 'normal',
//               fontSize: 15,
//               lineHeight: 18,
//               display: 'flex',
//               alignItems: 'center',
//               textAlign: 'center',
//               color: '#000000',
//             }}>
//             Schedualer
//           </Text>
//         </View>
//       </View>
//     );
//   }
// }

class HeaderSchedualer extends Component {
  render() {
    return (
      <View
        style={{
          //flex: 0.1,
          alignItems: 'center',
          backgroundColor: '#f2f2f2',
          flexDirection: 'row',
        }}>
        <TouchableOpacity style={{}}>
          <IconAntDesign
            onPress={this.props.onBack}
            name="left"
            size={30}
            color="#000000"
          />
        </TouchableOpacity>
        <Text
          style={{
            color: '#000',
            alignSelf: 'flex-end',

            fontWeight: 'bold',
            fontSize: WINDOW_SIZE.WIDTH / 25,
            flexDirection: 'column',
            marginTop: 10,
            marginBottom: 10,

            //justifyContent: 'center',
          }}>
          Len Lich
        </Text>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    orderData: state.OrderReducer,
  };
}

function dispatchToProps(dispatch) {
  return bindActionCreators(
    {
      orderAction,
    },
    dispatch,
  );
}



export default connect(mapStateToProps, dispatchToProps)(SchedualerComponent);
