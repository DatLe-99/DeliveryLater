import React, {Component} from 'react';
import moment from 'moment';
import {
  View,
  Arrow,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ToastAndroid,
  CheckBox,
} from 'react-native';
import TimePicker from 'react-native-24h-timepicker';
import {WINDOW_SIZE} from '../../utils/scale';
import {FONT_SIZE} from '../../utils/fontsize';
import LoginBackground from 'images/LoginBackground.jpg';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Calendar} from 'react-native-calendars';
import {FlatList} from 'react-native-gesture-handler';
import {TextInput} from 'react-native-paper';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';

const format = 'YYYY-MM-DD';
const today = moment().format(format);
const maxDate = moment()
  .add(2, 'months')
  .format(format);

export default class CalendarComponent extends Component {
  initialState = {};
  constructor(props) {
    super(props);
    this.state = {
      schedual: {date: today},
      orderlist: this.props.navigation.getParam('listorder'),
      isModalVisible: false,
      address: this.props.navigation.getParam('address'),
      account: this.props.navigation.getParam('account'),
      restaurant: this.props.navigation.getParam('restaurant'),
      listorder: [],
      totalitem: 0,
      totalprice: 0,
    };
    console.log(this.state.restaurant)
  }
  onDaySelect = day => {
    const selectedDay = moment(day.dateString).format(format);
    var selected = {date: selectedDay, time: this.state.schedual.time};

    this.setState({schedual: selected});
  };

  orders() {
    if (this.state.schedual.time) {
      console.log(this.state.schedual);
      ToastAndroid.show(this.state.schedual, ToastAndroid.LONG);
      this.setState({isModalVisible: true});
    }
  }
  changetime(time) {
    console.log(moment(time, 'HH:mm', true));
    if (moment(time, 'HH:mm', true) != null) {
      var selected = {date: this.state.schedual.date, time: time};
      this.setState({schedual: selected});
      ToastAndroid.show(time, ToastAndroid.LONG);
    }
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

  render() {
    return (
      <View>
        <HeaderCalendar
          onBack={() => this.props.navigation.navigate('Restaurant')}
        />
        <Calendar
          // Initially visible month. Default = Date()
          //current={'2012-03-01'}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={today}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={maxDate}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={day => {
            //   console.log('selected day', day);
            this.onDaySelect(day);
          }}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={day => {
            console.log('selected day', day);
          }}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={'yyyy MM'}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={month => {
            console.log('month changed', month);
          }}
          // Hide month navigation arrows. Default = false
          // hideArrows={true}
          // Replace default arrows with custom ones (direction can be 'left' or 'right')
          // renderArrow={direction => <Arrow />}
          // Do not show days of other months in month page. Default = false
          hideExtraDays={true}
          // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false
          disableMonthChange={true}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          firstDay={1}
          // Hide day names. Default = false
          hideDayNames={true}
          // Show week numbers to the left. Default = false
          showWeekNumbers={true}
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          onPressArrowLeft={substractMonth => substractMonth()}
          // Handler which gets executed when press arrow icon left. It receive a callback can go next month
          onPressArrowRight={addMonth => addMonth()}
          markedDates={this.state.markdate}
        />
        <OrderList
          onPress={() => this.orders()}
          date={this.state.schedual.date}
          onChangeTime={time => this.changetime(time)}
        />

        <FlatList
          data={this.state.restaurant.item.Categories}
          listKey={(item, index) => 'D' + index.toString()}
          renderItem={({item}) => (
            <CategoryItem
              cate={item}
              AddItemFood={this.AddItemFood}
              MinusItemFood={this.MinusItemFood}
              count={this.state.listorder}
              AddItemFood={this.AddItemFood}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

class HeaderCalendar extends Component {
  render() {
    return (
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          height: WINDOW_SIZE.HEIGHT / 18,
          backgroundColor: '#FFFFFF',
        }}>
        <TouchableOpacity style={{flex: 0.1, alignSelf: 'center'}}>
          <IconAntDesign
            onPress={this.props.onBack}
            name="left"
            size={30}
            color="#000000"
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 0.8,
            borderRadius: 20,
            borderWidth: 1,
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Verdana',
              fontStyle: 'normal',
              fontWeight: 'normal',
              fontSize: 15,
              lineHeight: 18,
              display: 'flex',
              alignItems: 'center',
              textAlign: 'center',
              color: '#000000',
            }}>
            Schedualer
          </Text>
        </View>
      </View>
    );
  }
}

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: moment().format('HH:mm'),
    };
  }
  onCancel() {
    this.TimePicker.close();
  }

  onConfirm(hour, minute) {
    var time = hour + ':' + minute;
    this.props.onChangeTime(time);
    this.TimePicker.close();
  }
  render() {
    return (
      <View style={{flexDirection: 'column', backgroundColor: '#c4c4c4'}}>
        <Text
          style={{
            fontFamily: 'Verdana',
            fontSize: 20,
            lineHeight: 30,
            alignItems: 'center',
            alignContent: 'center',
            color: '#000000',
          }}>
          {'Date:  ' + this.props.date}
        </Text>
        <View
          style={{
            width: 367,
            height: 30,
            borderRadius: 0,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontFamily: 'Verdana',
              fontSize: 20,
              lineHeight: 30,
              alignItems: 'center',
              alignContent: 'center',
              color: '#000000',
            }}>
            {'Time:  '}
          </Text>
          <TouchableOpacity
            onPress={() => this.TimePicker.open()}
            style={{
              width: 100,
              heigth: 30,
              backgroundColor: '#ffffffff',
              borderRadius: 10,
            }}>
            <Text
              style={
                (styles.text,
                {
                  color: '#000000',
                  fontWeight: 'bold',
                  width: 100,
                  height: 30,
                  fontSize: 16,
                  textAlignVertical: 'center',
                  textAlign: 'center',
                })
              }>
              Pick time
            </Text>
          </TouchableOpacity>
          <TimePicker
            ref={ref => {
              this.TimePicker = ref;
            }}
            onCancel={() => this.onCancel()}
            onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
          />
        </View>
        <TouchableOpacity
          onPress={this.props.onPress}
          style={{
            width: 208,
            heigth: 42,
            backgroundColor: '#F34F08',
            borderRadius: 21,
            margin: 5,
          }}>
          <Text
            style={
              (styles.text,
              {
                color: '#000000',
                fontWeight: 'bold',
                width: 208,
                height: 42,
                fontSize: 16,
                textAlignVertical: 'center',
                textAlign: 'center',
              })
            }>
            Order
          </Text>
        </TouchableOpacity>
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

function FoodItem({fooditem, AddItemFood, MinusItemFood, count}) {
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
        <View style={{flexDirection: 'column', flex: 0.8}}>
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            flex: 1,
            margin: 10,
          }}>
          <TouchableOpacity
            onPress={() => MinusItemFood(fooditem)}
            style={{flex: 0.1, alignSelf: 'center', alignContent: 'flex-end'}}>
            <IconAntDesign name="minuscircle" size={15} color="#900" />
          </TouchableOpacity>
          <Text> {countFoodItem(fooditem, count)} </Text>
          <TouchableOpacity
            onPress={() => AddItemFood(fooditem)}
            style={{flex: 0.1, alignSelf: 'center', alignContent: 'flex-end'}}>
            <IconAntDesign name="pluscircle" size={15} color="#900" />
          </TouchableOpacity>
        </View>
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

function CategoryItem({cate, AddItemFood, MinusItemFood, count}) {
  console.log(AddItemFood)
  return (
    <View style={{flexDirection: 'column', flex: 1}}>
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
          Phân loại: {cate.name}
        </Text>
      </View>
      <View style={{borderBottomColor: '#000000', borderBottomWidth: 1}} />
      <View>
        <FlatList
          listKey={(item, index) => 'D' + index.toString()}
          data={cate.Items}
          renderItem={({item}) => (
            <FoodItem
              fooditem={item}
              AddItemFood={AddItemFood}
              MinusItemFood={MinusItemFood}
              count={count}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
}

function countFoodItem(item, listorder) {
  var tmp = listorder;
  for (var i = 0; i < tmp.length; i++) {
    if (item.ID == tmp[i].ID) {
      return tmp[i].count;
    }
  }
  return 0;
};
