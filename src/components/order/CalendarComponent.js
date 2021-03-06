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
  .add(1, 'months')
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
      listData: this.props.navigation.getParam('listData'),
      listorder: [],
      listschedule: [],
      tmpprice: 0,
      tmpitem: 0,
      totalitem: 0,
      totalprice: 0,
      _markedDates: '',
    };
    console.log(this.state.listData)
  }
  onDaySelect = day => {
    const selectedDay = moment(day.dateString).format(format);
    var selected = {date: selectedDay, time: this.state.schedual.time};
    this.setState({
      schedual: selected,
      listorder: [],
      tmpitem: 0,
      tmpprice: 0,
      totalitem: this.state.totalitem - this.state.tmpitem,
      totalprice: this.state.totalprice - this.state.tmpprice,
      _markedDates: selectedDay,
    });
    // let marked = true;
    // let markedDates = {}
    // if (this.state._markedDates[selectedDay]) {
    //   // Already in marked dates, so reverse current marked state
    //   marked = !this.state._markedDates[selectedDay].marked;
    //   markedDates = this.state._markedDates[selectedDay];
    // }
    // markedDates = { ...markedDates, ...{ marked } };

    // const updatedMarkedDates = { ...this.state._markedDates, ...{ [selectedDay]: markedDates } }

    // Triggers component to render again, picking up the new state
    // this.setState({ _markedDates: markedDates });
  };

  

  addlistordertoSchedule (schedule, listorder){
    var list = this.state.listschedule;
    list.push({
      date: schedule.date,
      time: schedule.time,
      listorder: listorder,
    })
    this.setState({
      listschedule: list
    })
    console.log(list)
  }

  checkSchedule = (date, time) => {
    var tmp = this.state.listschedule
    for(var i =0; i< tmp.length; i++){
      if(tmp[i].date == date && tmp[i].time == time){
        return false;
      }
    }
    return true;
  }

  orders() {
    if (this.state.schedual.time) {
      if(this.state.listorder.length == 0){
        ToastAndroid.show("Bạn chưa chọn món", ToastAndroid.SHORT);
        return;
      }
      if (!this.checkSchedule(this.state.schedual.date, this.state.schedual.time)){
        ToastAndroid.show("Bạn đã lên lịch vào khung giờ này rồi. Vui lòng chọn giờ khác", ToastAndroid.SHORT);
        return;
      }
      console.log(this.state.schedual);
      console.log(this.state.listorder);
      this.addlistordertoSchedule(this.state.schedual,this.state.listorder);
      this.setState({
        listorder: [],
        tmpitem: 0,
        tmpprice: 0,
      })
      ToastAndroid.show("Đã lên lịch vào lúc "+this.state.schedual.time + " ngày " + this.state.schedual.date, ToastAndroid.LONG);
      this.state.schedual.time = null
    }
    else
      ToastAndroid.show("Bạn chưa chọn giờ", ToastAndroid.SHORT);
  }
  changetime(time) {
    console.log(moment(time, 'HH:mm', true));

    const t = moment()
      .add(2, 'minute')
      .format("HH:mm");
    const d = moment()
      .add(2, 'day')
      .format("YYYY-MM-DD");
    const cur = moment(t, 'HH:mm', true)
    
    if ((moment(time, 'HH:mm', true) != null && moment(time, 'HH:mm', true).diff(cur,'minutes')>0 ) || this.state.schedual.date.substr(8,2) > moment().get('date')) {
      var selected = {date: this.state.schedual.date, time: time};
      this.setState({schedual: selected});
      ToastAndroid.show(time, ToastAndroid.SHORT);
    }
    else{
      ToastAndroid.show("Thời gian này đã trôi qua", ToastAndroid.SHORT)
      this.state.schedual.time = null
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
                  tmpprice: item.price + this.state.tmpprice,
                  tmpitem: 1 + this.state.tmpitem,
                  listorder: tmp,
                });
                return;
            }
        }
        tmp.push({ID: item.ID, name: item.name, price: item.price, count: 1})
        this.setState({
          totalprice: item.price + this.state.totalprice,
          totalitem: 1 + this.state.totalitem,
          tmpprice: item.price + this.state.tmpprice,
          tmpitem: 1 + this.state.tmpitem,
          listorder: tmp,
        });
      }
    MinusItemFood = (item) =>{
        // ToastAndroid.show(item.name,ToastAndroid.SHORT)
        // var orderItem = [{name: item.name, price: item.price, count: 1}]
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
              tmpprice: - item.price + this.state.tmpprice,
              tmpitem: - 1 + this.state.tmpitem,
              listorder: tmp,
            });
            return;
          }
        }
      }

  CompleteSchedule (){
    if(this.state.listschedule.length == 0){
      ToastAndroid.show("Bạn chưa đặt lịch bất kỳ đơn nào", ToastAndroid.SHORT);
    }
    else{
      this.props.navigation.navigate("PaymentSchedule",{
        listorder: this.state.listschedule,
        address: this.state.address,
        account: this.state.account,
        totalprice: this.state.totalprice,
        totalitem: this.state.totalitem,
        restaurant: this.props.navigation.getParam("restaurant"),
        type: "schedule",
      })
    }
  }

  render() {
    return (
      <View
        style = {{flex: 1}}
      >
        <HeaderCalendar
          onBack={() => this.props.navigation.navigate('Restaurant')}
        />
        <View
          style={{
            backgroundColor: '#F34F',
            borderRadius: 10,
            margin: 5,
            alignSelf: "flex-end",
            justifyContent: "center"
          }}
        >
          <TouchableOpacity
            onPress={() => this.CompleteSchedule()}
          >
            <Text
              style = {styles.text, {color: "#FFFFFF", alignSelf:"center", fontWeight: "bold", padding: 5}}
            >Hoàn tất đăt lịch</Text>
          </TouchableOpacity>
        </View>
        <Calendar
          theme ={{
            dayTextColor: '#5FD662',  
            todayTextColor: '#FF5D4E',  
            selectedDayTextColor: 'yellow',
            selectedDayBackgroundColor: 'pink',
            //calendarBackground: "yellow",
            monthTextColor: "#FF9330",
            textMonthFontWeight: "bold",
            textMonthFontSize: 18,
            textDayFontSize: 16,
            textDayFontWeight: "normal"
          }}
          // Initially visible month. Default = Date()
          //current={'2012-03-01'}
          // markedDates={{ [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' } }}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          
          markedDates={{ [this.state._markedDates]: { selected: true, disableTouchEvent: true, selectedDotColor: 'pink' } }}
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
          // monthFormat={'yyyy MM'}
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
          // showWeekNumbers={true}
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          onPressArrowLeft={substractMonth => substractMonth()}
          // Handler which gets executed when press arrow icon left. It receive a callback can go next month
          onPressArrowRight={addMonth => addMonth()}
        />
        <OrderList
          PutSchedule={() => this.orders()}
          date={this.state.schedual.date}
          onChangeTime={time => this.changetime(time)}
          timeChoosen = {this.state.schedual.time}
        />
        <FlatList
          style = {{marginBottom: WINDOW_SIZE.HEIGHT/25}}
          data={this.state.listData.item.Categories}
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
        <OrderedBar
          totalitem={this.state.tmpitem}
          totalprice={this.state.tmpprice}
        />
      </View>
    );
  }
}

class OrderedBar extends Component {
  render() {
    return (
      <View
        style={{
          flexDirection: 'row-reverse',
          position: 'absolute',
          height: WINDOW_SIZE.HEIGHT/25 ,
          bottom: 0,
          backgroundColor: "#f2f2f2",
          borderRadius: 10,
        }}>
        <TouchableOpacity
          style={{
            alignSelf: 'center', 
          }}>
          <Text
            style={{
              padding: 10,
              textAlign: "center"
            }}>{this.props.totalitem} phần - {this.props.totalprice}đ</Text>
        </TouchableOpacity>
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
            height: WINDOW_SIZE.HEIGHT/20,
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
            Đặt lịch
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
      <View style={{ flexDirection: 'column', backgroundColor: '#5FD662'}}>
        <Text
          style={{
            fontFamily: 'Verdana',
            fontSize: 18,
            lineHeight: 18,
            alignItems: 'center',
            alignContent: 'center',
            color: '#000000',
            fontWeight: "bold",
            padding: 10,
          }}>
          {'Ngày: ' + this.props.date}
        </Text>
        <View
          style={{
            width: 367,
            height: 30,
            borderRadius: 0,
            flexDirection: 'row',
            margin: 5
          }}>
          <Text
            style={{
              fontFamily: 'Verdana',
              fontSize: 16,
              lineHeight: 20,
              alignItems: 'center',
              alignContent: 'center',
              color: '#000000',
              padding: 5
            }}>
            {'Chọn giờ:  '}
          </Text>
          <TouchableOpacity
            onPress={() => this.TimePicker.open()}
            style={{
              width: 100,
              heigth: 20,
              backgroundColor: '#ffffff',
              borderRadius: 10,
              alignContent: "center",
              justifyContent: "center"
            }}>
            <Text
              style={
                (styles.text,
                {
                  color: '#000000',
                  fontWeight: 'normal',
                  width: 100,
                  height: 20,
                  fontSize: 16,
                  textAlign: 'center',
                })
              }>
              {this.props.timeChoosen}
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
          onPress={this.props.PutSchedule}
          style={{
            width: 130,
            heigth: 30,
            backgroundColor: '#FCFC',
            borderRadius: 15,
            margin: 5,
          }}>
          <Text
            style={
              (styles.text,
              {
                color: '#c4c',
                fontWeight: 'bold',
                width: 130,
                height: 30,
                fontSize: 16,
                textAlignVertical: 'center',
                textAlign: 'center',
              })
            }>
            Đặt hôm nay
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
          backgroundColor: 'rgba(196, 196, 196, 0.6)',
          alignItems: 'center',
          marginLeft: 30,
          marginRight: 30,
        }}>
        <Image
          style={{borderRadius: 10, width: 70, height: 70, margin: 5}}
          source={{uri: fooditem.url}}
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
            flex: 0.4,
            margin: 10,
          }}>
          <TouchableOpacity
            onPress={() => MinusItemFood(fooditem)}
            style={{flex: 0.3, alignSelf: 'center', alignContent: 'flex-end'}}>
            <IconAntDesign name="minuscircle" size={22} color="#1177DE" />
          </TouchableOpacity>
          <Text style = {{flex: 0.4, textAlign: "center"}}> {countFoodItem(fooditem, count)} </Text>
          <TouchableOpacity
            onPress={() => AddItemFood(fooditem)}
            style={{flex: 0.3, alignSelf: 'center', alignContent: 'flex-end'}}>
            <IconAntDesign name="pluscircle" size={22} color="#1177DE" />
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
