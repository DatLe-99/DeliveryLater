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
import {viewscheduleAction} from '../../redux/action'
const format = 'YYYY-MM-DD';
const today = moment().format(format);
const maxDate = moment()
  .add(1, 'months')
  .format(format);

class ViewScheduleComponent extends Component {
  initialState = {};
  initialState2 = {
      [today]: {disabled: true}
  }
  constructor(props) {
    super(props);
    this.state = {
      schedual: {date: today},
      isModalVisible: false,
      account: this.props.navigation.getParam('account'),
      listData: '',
      listschedule: [],
      _markedDates: '',
      isLoading: false,
      orderData: [],
      previousDay: "",
      selectedDate: '',
      listday: this.props.navigation.getParam("listday"),
    };
  }
  onDaySelect = day => {
    const selectedDay = moment(day.dateString).format(format);
    var selected = {date: selectedDay, time: this.state.schedual.time};

    // let marked = true;
    // let markedDates = {};

    // markedDates = this.state._markedDates[selectedDay];
    // markedDates = {
    //   ...markedDates,
    //   ...{marked},
    //   selected: true,
    // };

    // const updatedMarkedDates = {
    //   ...this.state._markedDates,
    //   ...{[selectedDay]: markedDates},
    // };

    this.setState({
      schedual: selected,
      // _markedDates: updatedMarkedDates,
      selectedDate: selectedDay,
    });

    if (!this.state.isLoading) {
            this.setState({ isLoading: true });
            this.props
                .viewscheduleAction(
                    {
                      ID: this.state.account.ID,
                      Date: selectedDay,
                    }
                )
                .then(() => {
                    this.setState({ isLoading: false });
                    if (this.props.orderData.success) {
                      this.setState({
                        isLoading: false,
                        orderData: this.props.orderData.dataRes,
                      });
                    } else {
                      this.setState({
                        isLoading: false,
                        orderData: [],
                        // orderData: [{
                        //   StoreName: "Bạn không có đơn hàng nào vào ngày này",
                        //   address: "",
                        //   OrderDate: "",
                        //   OrderDeadline: "",
                        //   TotalItem: "",
                        //   TotalPrice: "",
                        // }]
                      });
                    }
                });
        }
  };

  componentDidMount(){
    var dates = []
    for(var i=0 ; i< this.state.listday.length; i++){
      dates.push(this.state.listday[i].Date.substr(0,10))
    }
    var _markedDates = {
      // [today]: {disabled: true},
    };
    for(var i = 0; i< dates.length; i++){
        const selectedDay = moment(dates[i]).format(format);
        let marked = true;
        let markedDates = {};
        markedDates = this.state._markedDates[selectedDay];
        markedDates = { ...markedDates, ...{ marked }, dotColor: "red"};
        const updatedMarkedDates = {
          ..._markedDates,
          ...{[selectedDay]: markedDates},
        };
        _markedDates= updatedMarkedDates
    }
    this.setState({
      _markedDates: _markedDates,
    });
  }

  checkSchedule = (date, time) => {
    var tmp = this.state.listschedule;
    for (var i = 0; i < tmp.length; i++) {
      if (tmp[i].date == date && tmp[i].time == time) {
        return false;
      }
    }
    return true;
  };


  render() {
    return (
      <View>
        <HeaderCalendar
          onBack={() => this.props.navigation.navigate('UpcomingOrder')}
        />
        <View
          style={{
            backgroundColor: '#F34F',
            borderRadius: 10,
            margin: 5,
            alignSelf: 'flex-end',
            justifyContent: 'center',
          }}></View>
        <Calendar
          theme={{
            dayTextColor: '#5FD662',
            todayTextColor: '#FF5D4E',
            selectedDayTextColor: 'yellow',
            selectedDayBackgroundColor: 'pink',
            monthTextColor: '#FF9330',
            textMonthFontWeight: 'bold',
            textMonthFontSize: 18,
            textDayFontSize: 16,
            textDayFontWeight: 'normal',
          }}
          // Initially visible month. Default = Date()
          //current={'2012-03-01'}
          // markedDates={{ [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' } }}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          // markedDates={{
          //   [this.state._markedDates]: {
          //     selected: true,
          //     disableTouchEvent: true,
          //     selectedDotColor: 'pink',
          //   },
          // }}
          // markedDates={{'2020-01-08': {selected: true, marked: true, selectedColor: 'blue'}}}
          markedDates={{
            ...this.state._markedDates, 
            ...{[this.state.selectedDate]: { selected: true, disableTouchEvent: true, selectedDotColor: 'pink' }}
          }}
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
        <OrderList date={this.state.schedual.date} />
        <FlatListOrder
          data = {this.state.orderData}
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
            height: WINDOW_SIZE.HEIGHT / 20,
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
            Lịch đặt
          </Text>
        </View>
      </View>
    );
  }
}

class OrderList extends Component {
  render() {
    return (
      <View style={{flexDirection: 'column', backgroundColor: '#5FD662'}}>
        <Text
          style={{
            fontFamily: 'Verdana',
            fontSize: 18,
            lineHeight: 18,
            alignItems: 'center',
            alignContent: 'center',
            color: '#000000',
            fontWeight: 'bold',
            padding: 10,
          }}>
          {'Ngày: ' + this.props.date}
        </Text>
      </View>
    );
  }
}

function FlatListOrder({data}){
  if(data.length == 0){
    return(
      <View style = {{alignSelf: "center", marginTop: 20}}>
        <Text>Bạn không có lịch đặt vào hôm nay</Text>
      </View>
    )
  }
  else{
    return(
      <FlatList
        data={data}
        listKey={(item, index) => 'D' + index.toString()}
        renderItem={({ item }) => <ScheduleOrderItem order={item} />}
        keyExtractor={item => item.id}
      />
    )
  }
}

function ScheduleOrderItem({order}) {
  return (
    <View
      style={{
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'pink',
        borderRadius: 10,
        margin: 10,
      }}>
      <View>
        <Text
          numberOfLines={1}
          style={{
            margin: 5,
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: 15,
            lineHeight: 15,
            color: '#000000',
            padding: 5
          }}>
          {order.StoreName} - {order.address}
        </Text>
      </View>
      <View>
        <Text
          style={{
            margin: 5,
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 14,
            lineHeight: 14,
            color: '#000000',
            padding: 5,
          }}>
          Ngày Đặt: {order.created.substr(11, 5)} giờ -{' '}
          {order.created.substr(0, 10)}
        </Text>
        <Text
          style={{
            margin: 5,
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 14,
            lineHeight: 14,
            color: '#000000',
            padding: 5,
          }}>
          Ngày Giao: {order.deadline.substr(11, 5)} giờ -{' '}
          {order.deadline.substr(0, 10)}
        </Text>
      </View>
      <View>
        <Text
          style = {{padding: 10}}>
          {order.TotalItem} phần - {order.TotalPrice}đ
        </Text>
      </View>
    </View>
  );
}

function mapStateToProps(state) {
  return {
    orderData: state.ViewscheduleReducer,
  };
}

function dispatchToProps(dispatch) {
  return bindActionCreators(
    {
      viewscheduleAction,
    },
    dispatch,
  );
}
export default connect(mapStateToProps, dispatchToProps)(ViewScheduleComponent);
