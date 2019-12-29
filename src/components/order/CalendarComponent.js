import React, {Component} from 'react';
import moment from 'moment';
import {
  View,
  Arrow,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Icon,
} from 'react-native';

import {WINDOW_SIZE} from '../../utils/scale';
import {FONT_SIZE} from '../../utils/fontsize';
import LoginBackground from 'images/LoginBackground.jpg';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Calendar} from 'react-native-calendars';
import {FlatList} from 'react-native-gesture-handler';
import {TextInput} from 'react-native-paper';
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
      order: this.initialState,
    };
  }
  onDaySelect = day => {
    const selectedDay = moment(day.dateString).format(format);
    var select = {date: selectedDay};
    this.setState({order: select});
  };

  orders() {
    console.log(this.state.order);
  }
  changetime(time) {
    var selected = {date: this.state.order.date, time: time};
    this.setState({order: selected});
  }

  render() {
    return (
      <View>
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
          order={this.state.order}
          onChangeTime={text => this.changetime(text)}
        />
      </View>
    );
  }
}

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: this.props.order,
    };
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
          {'Date:' + this.state.order.date}
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
            {'Time'}
          </Text>
          <TextInput
            placeholder="07:00"
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
            }}
            onChangeText={this.props.onChangeTime}
          />
        </View>
        <TouchableOpacity
          onPress={this.props.onPress}
          style={{
            width: 208,
            heigth: 42,
            backgroundColor: '#F34F08',
            borderRadius: 21,
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
