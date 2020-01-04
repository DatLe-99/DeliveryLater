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

class SchedualerComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDatePickerVisible: false,
      orderlist: this.props.navigation.getParam('listorder'),
      address: this.props.navigation.getParam('address'),
      account: this.props.navigation.getParam('account'),

      currentFoodItem: {},
    };
    console.log(this.state.orderlist);
    this.state.orderlist.forEach(function(element) {
      element.datetime = moment();
    });
    console.log(this.state.orderlist);
  }
  showDatePicker = fooditem => {
    console.log(fooditem);
    this.setState({isDatePickerVisible: true, currentFoodItem: fooditem});
  };
  hideDatePicker() {
    this.setState({isDatePickerVisible: false});
  }

  handleConfirm(datetime) {
    console.log('A time has been picked: ', datetime);
    var tmp = this.state.orderlist;
    console.log(this.state.currentFoodItem);
    for (var i = 0; i < tmp.length; i++) {
      if (tmp[i].name == this.state.currentFoodItem.name) {
        tmp[i].datetime = moment(datetime);
        console.log(tmp[i].datetime);
        this.hideDatePicker();
        this.setState({orderlist: tmp});
        return;
      }
    }
  }

  render() {
    return (
      <View>
        <HeaderSchedualer></HeaderSchedualer>
        <FlatList
          listKey={(item, index) => 'D' + index.toString()}
          data={this.state.orderlist}
          renderItem={({item}) => <FoodItem fooditem={item} />}
          keyExtractor={item => item.id}
          height={500}
        />

        <DateTimePickerModal
          isVisible={this.state.isDatePickerVisible}
          mode="datetime"
          onConfirm={datetime => this.handleConfirm(datetime)}
          onCancel={() => this.hideDatePicker()}
        />

        <View>
          <TouchableOpacity
            onPress={}
            style={{
              backgroundColor: '#2D87E2',
              borderRadius: 10,
              flex: 0.5,
              alignSelf: 'stretch',
              justifyContent: 'center',
              marginRight: 10,
            }}>
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
        </View>
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
});

function FoodItem({fooditem}) {
  return (
    <View>
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
    </View>
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
