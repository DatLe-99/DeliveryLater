import React, {Component} from 'react';
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
  Dimensions,
  Image,
  Button,
  RefreshControl,
} from 'react-native';

import {WINDOW_SIZE} from '../../utils/scale';
import {FONT_SIZE} from '../../utils/fontsize';

import LoginBackground from 'images/LoginBackground.jpg';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {signInAction} from '../../redux/action';
import BottomBarComponent from '../bottomBar/BottomBarComponent';

import faker from 'faker';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import {completeAction, viewscheduleAction} from '../../redux/action'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import Modal, {
    ModalTitle,
    ModalContent,
    ModalFooter,
    ModalButton,
    SlideAnimation,
    ScaleAnimation,
  } from 'react-native-modals';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import moment from 'moment';
import { FlatList } from 'react-native-gesture-handler';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
function CloneData (list){
  var cloneData = []
  for (var i = 0; i < list.length; i += 1) {
    cloneData.push({
      type: 'NORMAL',
      item: {
        ID: list[i].ID,
        StoreName: list[i].StoreName,
        address: list[i].address,
        ReceiveAddress: list[i].ReceiveAddress,
        TotalItem: list[i].TotalItem,
        TotalPrice: list[i].TotalPrice,
        OrderDate: list[i].OrderDate,
        OrderDeadline: list[i].OrderDeadline,
        cancel: list[i].cancel,
        delivered: list[i].delivered,
      },
    });
  }
  return cloneData;
}

class UpcomingOrderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isPopupShown: false,
          account: this.props.navigation.getParam("account"),
          isLoading: false,
          list: [],
          refreshing: false,
        };
        this.data = []
      }

      componentDidMount() {
          if (!this.state.isLoading) {
            this.setState({ isLoading: true });
            this.props
              .viewscheduleAction(
                {
                  ID: this.state.account.ID,
                  Date: moment(),
                }
              )
              .then(() => {
                this.setState({ isLoading: false });
                if (this.props.todayData.success) {
                  this.setState({
                    isLoading: false,
                    list: CloneData(this.props.todayData.dataRes),
                    refreshing: true,
                  });
                  this.onRefresh(this.props.todayData.dataRes)
                  console.log(this.data)
                } else {
                  this.setState({
                    isLoading: false,
                  });
                  return []
                }
              });
          }
      };

      setIsPopupShown = (boolVar) => {
        this.setState({
          isPopupShown: boolVar
        })
      }

      ViewSchedule = () => {
        if (!this.state.isLoading) {
          this.setState({ isLoading: true });
          this.props
            .completeAction({
              id: this.state.account.ID,
            })
            .then(() => {
              this.setState({ isLoading: false });
              if (this.props.completeData.success) {
                this.setState({ isLoading: false });
                this.props.navigation.navigate('ViewOrderSchedule', {
                  account: this.state.account,
                  listday: this.props.completeData.dataRes,
                })
                console.log(this.props.completeData.dataRes)

              } else {
                this.alertMessage(this.props.completeData.errorMessage);
                this.setState({ isLoading: false });
              }
            });
    }
  }

  onRefresh = (list) =>{
        this.data = list
        this.setState({refreshing: false})
  } 

    render(){
        return (
          <View
            style={
              ({
                flex: 1,
                flexDirection: 'row',
              },
              styles.container)
            }>
            <HeaderBar
              ViewSchedule={() => this.ViewSchedule()}
            />
            <FlatList
              listKey={(item, index) => 'D' + index.toString()}
              data={this.data}
              renderItem={({ item }) =>
                <OrderItem
                  item = {item}
                  Cancel={() => this.setState({ isPopupShown: true })}
                />
              }
              keyExtractor={item => item.id}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.props.onRefresh}
                />
              }
            />
            
            <ConfirmCancelOrderPopup
              setIsPopupShown={() => this.setState({isPopupShown: false})}
              isPopupShown={this.state.isPopupShown}
            />

            <BottomBarComponent
              selectedTab="upcomingOrder"
              onPressHome={() => this.props.navigation.navigate('Home')}
              onPressUpcomingOrder={() =>
                this.props.navigation.navigate('UpcomingOrder')
              }
              onPressHistory={() => this.props.navigation.navigate('History')}
              onPressProfile={() => this.props.navigation.navigate('Profile')}
            />
          </View>
        );
    }
}

class ConfirmCancelOrderPopup extends Component {
    render() {
      return (
          <Modal.BottomModal
            visible={this.props.isPopupShown}
            onTouchOutside={this.props.setIsPopupShown}
            height={0.5}
            width={1}
            onSwipeOut={this.props.setIsPopupShown}
            modalTitle={
              <ModalTitle
                title="Bạn muốn hủy đơn hàng này?"
                hasTitleBar
              />
            }
  
            footer={
              <ModalFooter>
                <ModalButton
                  text="CANCEL"
                  bordered
                  onPress={
                    this.props.setIsPopupShown
                  }
                  key="button-1"
                />
                <ModalButton
                  text="OK"
                  bordered
                  onPress={
                    this.props.setIsPopupShown
                  }
                  key="button-2"
                />
              </ModalFooter>
            }
          >
            <ModalContent
              style={{
                flex: 1,
                backgroundColor: 'fff',
              }}
            >
              <Text>
                Bottom Modal with Title
              </Text>
            </ModalContent>
          </Modal.BottomModal>
      );
  }
}

function OrderItem ({item, Cancel}){
  return(
    <View
      style={{
        flexDirection: 'row',
        margin: 5,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        alignItems: 'center',
        elevation: 2,
        borderRadius: 7,
        justifyContent: "flex-start"
      }}>
      <Image style={{
        width: SCREEN_HEIGHT / 8,
        height: SCREEN_HEIGHT / 8,
        margin: 5,
        borderRadius: 7,
      }} source={require('../../media/images/test.jpg')} />
      
      <View style = {{flexDirection: "column", margin: 5}}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: SCREEN_WIDTH / 25,
            padding: 5,
            fontWeight: 'bold',
          }}>
          {item.StoreName}
        </Text>
        <Text
          
          style={{
            fontSize: SCREEN_WIDTH / 28,
            alignSelf: 'center',
            flexShrink: 1,
          }}>
          {item.address}
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 10}}>
          <FontAwesome5Icon name='money-bill-wave' size={SCREEN_WIDTH / 28} color='#33a62b' />
          <Text> {item.TotalItem} Phần - {item.TotalPrice} - Tiền mặt</Text>
        </View>
        <View style = {{flexDirection: 'row', alignItems: "center"}}>
          <View
            style={{
              flex: 0.8,
              flexDirection: 'row',
            }}>
            <AntDesignIcon name='clockcircleo' size={SCREEN_WIDTH / 25} color='#000' />
              <Text> {item.OrderDeadline.substr(11, 5)} {item.OrderDeadline.substr(0, 10)}  </Text>
          </View>
          <TouchableOpacity
            onPress={
              () => Cancel()
            }
            style={{
              borderWidth: 1,
              borderRadius: 10,
              borderColor: 'red',
              backgroundColor: 'red',
              margin: 10,
            }}>
            <Text
              style={{
                color: '#fff',
                marginTop: 0,
                fontWeight: 'bold',
                padding: 5
              }}>Hủy</Text>
          </TouchableOpacity>
      </View>
      </View>
    </View>
  )
}



class HeaderBar extends Component {
    render() {
        return(
            <View
                style = {{
                   //flex: 0.1,
                   alignItems: 'center',
                   backgroundColor: '#F34F08',
                   
                   shadowColor: "#fff",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.18,
                    shadowRadius: 1.00,
                    elevation: 1,
                }}>
                <Text
                    style = {{
                        color: '#000',
                        alignSelf: 'center',
                        fontWeight: 'bold',
                        fontSize: SCREEN_WIDTH/20,
                        flexDirection: 'column',
                        marginTop: 10,
                        marginBottom: 10,
                        //justifyContent: 'center',
                    }}>
                        Đơn hàng sắp đến
                    </Text>
                
                <TouchableOpacity
                    onPress = {this.props.ViewSchedule}
                    style = {{
                        position: 'absolute',
                        right: 0,
                        marginRight: 10,
                        marginTop: 6,
                       
                    }}>
                    <EvilIcons name = 'calendar' size = {SCREEN_HEIGHT/15} color = '#fff' />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      minHeight: 1,
      minWidth: 1,
      shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
});

function mapStateToProps(state) {
  return {
    completeData: state.CompleteReducer,
    todayData: state.ViewscheduleReducer,
  };
}

function dispatchToProps(dispatch) {
  return bindActionCreators(
    {
      completeAction,
      viewscheduleAction,
    },
    dispatch,
  );
}
export default connect(mapStateToProps, dispatchToProps)(UpcomingOrderComponent);