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
  ToolbarAndroidBase,
} from 'react-native';

import {WINDOW_SIZE} from '../../utils/scale';
import {FONT_SIZE} from '../../utils/fontsize';

import LoginBackground from 'images/LoginBackground.jpg';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import BottomBarComponent from '../bottomBar/BottomBarComponent';

import faker from 'faker';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import Modal, {
    ModalTitle,
    ModalContent,
    ModalFooter,
    ModalButton,
    SlideAnimation,
    ScaleAnimation,
  } from 'react-native-modals';

import { Rating, AirbnbRating } from 'react-native-ratings';
import { Card, ThemeConsumer } from 'react-native-elements';
import TapRatingScreen from '../TapRatingScreen';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import globalvar from '../../utils/scale'
import AsyncStorage from '@react-native-community/async-storage'
import {reviewSendAction} from '../../redux/action';
import {getHistoryAction} from '../../redux/action';
import Placeholder from 'rn-placeholder';
import moment from 'moment';
// import 'moment-timezone';
 
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class HistoryComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
          isGetHistoryLoading: false,
          historyData: '',
          isPopupShown: false,
          starNumber: 3,
          comment: '',
          loginUserProfile: '',
          isReviewSending: false,   
          isLoadingUserProfile: true,
          storeId: 'a',
        }

        AsyncStorage.getItem('loginUserProfile').then(value => {
          //AsyncStorage returns a promise so adding a callback to get the value
          this.setState({ loginUserProfile: value });
          //ToastAndroid.show(JSON.parse(value).email, ToastAndroid.SHORT);
          //Setting the value in Text 
          }
        );
  
        
    }
         
      alertMessage = title => {
        Alert.alert(
          '',
          title,
          [
            {
              text: 'OK',
              onPress: () => {
                return;
              },
            },
          ],
          {cancelable: false},
        );
      };

      onReviewSend = () => {
        if (!this.state.isReviewSending) {
          this.setState({isReviewSending: true});
          this.props
            .reviewSendAction({
              account_id: JSON.parse(this.state.loginUserProfile).id,
              name: JSON.parse(this.state.loginUserProfile).name,
              store_id: this.state.storeId,
              rate: this.state.starNumber,
              content: this.state.comment
            })
            .then(() => {
              this.setState({isReviewSending: false});
              if (this.props.reviewSendData.success) {
                this.setState({isReviewSending: false});
                ToastAndroid.show("Gửi bình luận thành công", ToastAndroid.SHORT);
                // this.props.navigation.navigate('Home',
                // {
                //   accountData: this.props.signInData.dataRes
                // });
              } else {
                this.setState({isReviewSending: false});
                this.alertMessage(this.props.reviewSendData.errorMessage);
              }
            });
        }
      };

    showCommentInfo = () => {
        ToastAndroid.show("star: " + this.state.starNumber + "cmt: " + this.state.comment + "store: " + this.state.storeId, ToastAndroid.SHORT);
    }



    render(){
      if (this.state.loginUserProfile !== '' && this.state.isLoadingUserProfile) {
            if (!this.state.isGetHistoryLoading) {
              //ToastAndroid.show(this.state.loginUserProfile, ToastAndroid.SHORT);
              this.setState({isGetHistoryLoading: true});
              this.setState({isLoadingUserProfile: false});
              this.props.getHistoryAction({
                  ID: JSON.parse(this.state.loginUserProfile).ID
                })
                .then(() => {
                  this.setState({isGetHistoryLoading: false});
                  if (this.props.getHistoryData.success) {
                    this.setState({isGetHistoryLoading: false});
                    this.setState({historyData: this.props.getHistoryData.dataRes})
                  // ToastAndroid.show(this.props.getHistoryData.dataRes[0].StoreName, ToastAndroid.SHORT);
                } else {
                  this.setState({isGetHistoryLoading: false});
                  this.alertMessage(this.props.getHistoryData.errorMessage);
                }
              });
            }
      }

      if (this.state.historyData !== '')
        return(
            <View
                style = {{
                    flex: 1,
                    flexDirection: 'row',
                }, styles.container}>

                <HeaderBar />

                <RecyclerView
                    showPopup = {() => this.setState({isPopupShown: true})}
                    resetReviewState = {() => this.setState({starNumber: 3, comment: ''})}
                    style = {{flex: 0.3}}
                    userID = {JSON.parse(this.state.loginUserProfile).ID}
                    historyData = {this.state.historyData}
                    setStoreId = {(id) => this.setState({storeId: id})}
                />

                <RatingPopup 
                    hiddenPopup = {() => this.setState({isPopupShown: false})}
                    isPopupShown = {this.state.isPopupShown}
                    onChangeNumberStar = {numberStar => this.setState({starNumber: numberStar})}
                    onChangeCmt = {event => this.setState({comment: event.nativeEvent.text || '' })}
                    showCommentInfo = {this.onReviewSend}
                />

                <BottomBarComponent 
                    selectedTab = 'history'
                    onPressHome = {() => this.props.navigation.navigate('Home')}
                    onPressUpcomingOrder = {() => this.props.navigation.navigate('UpcomingOrder',{
                        account: JSON.parse(this.state.loginUserProfile)
                    })}
                    onPressHistory = {() => this.props.navigation.navigate('History')}
                    onPressProfile = {() => this.props.navigation.navigate('Profile')}
                />
            </View>
            
        );

    return(
      <View style={[styles.containerLoading, styles.horizontal]}>
        <ActivityIndicator size="large" color="#F34F08" />
      </View>
    );
    }
  }


class RecyclerView extends Component {
  constructor(props) {
    super(props);

    const fakeData = [];

    for(var i = 0; i < Object.keys(this.props.historyData).length; i+= 1) {
      
      fakeData.push({
        type: 'NORMAL',
        item: {
          storeId: (this.props.historyData)[i].StoreId,
          storeName: (this.props.historyData)[i].StoreName,
          receiveAddress: (this.props.historyData)[i].ReceiveAddress,
          totalItem: (this.props.historyData)[i].TotalItem,
          totalPrice: (this.props.historyData)[i].TotalPrice,
          orderDate: moment((this.props.historyData)[i].OrderDate).format("hh:mm MM-DD-YYYY"),
        },
      });
    }

    this.state = {
      list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(fakeData),
    };
    
    this.layoutProvider = new LayoutProvider((i) => {
      return this.state.list.getDataForIndex(i).type;
    }, (type, dim) => {
      switch (type) {
        case 'NORMAL': 
          dim.width = SCREEN_WIDTH;
          dim.height = SCREEN_HEIGHT/3.5;
          break;
        default: 
          dim.width = 0;
          dim.height = 0;
          break;
      };
    })
  }

  rowRenderer = (type, data) => {
    const {storeId, storeName, receiveAddress, orderDate, totalItem, totalPrice} = data.item;
    return (
      <View style={{
            backgroundColor: '#fff',
            marginTop: 0.026*SCREEN_HEIGHT,
            marginBottom: 0.026*SCREEN_HEIGHT,
            marginLeft: 0.018*SCREEN_WIDTH,
            marginRight: 0.018*SCREEN_WIDTH,
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
                width: SCREEN_HEIGHT/6,
                height: SCREEN_HEIGHT/6,
                marginLeft: 0.007*SCREEN_HEIGHT,
                marginTop: 0.007*SCREEN_HEIGHT,
                borderRadius: 7,
            }} source={require("../../media/images/milktea.jpg")} />

            <View
                style = {{
                    flexDirection: 'column',
                    justifyContent: 'center',

                }}>
                <Text
                    style = {{
                        fontSize: SCREEN_WIDTH/25,
                        padding: 0.01*SCREEN_HEIGHT,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                    }}>
                    {storeName}
                </Text>

                <Text
                    style = {{
                        fontSize: SCREEN_WIDTH/28,
                        padding: 0.01*SCREEN_HEIGHT,
                        alignSelf: 'center',
                    }}>
                    {receiveAddress}
                </Text>
                
                <View
                    style = {{
                        padding: 0.01*SCREEN_HEIGHT,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginLeft: 0.03*SCREEN_HEIGHT,
                    }}>
                    <FontAwesomeIcon name = 'dollar' size = {SCREEN_WIDTH/28} color = '#000' />
                    <Text> {totalItem} </Text>
                    <Text> Phần - </Text>
                    <Text> {totalPrice} vnđ </Text>
                    <Text> - Tiền mặt</Text>
                </View>


            </View>
        
        </View>

        <View 
            style = {{
                margin: 0.026*SCREEN_HEIGHT,
                marginBottom: 0.04*SCREEN_HEIGHT,
                flexDirection: 'row',
                alignItems: 'center',
            }}>
            <AntDesignIcon name = 'clockcircleo' size = {SCREEN_WIDTH/25} color = '#000' />
            <Text> {orderDate} </Text>
            <TouchableOpacity
                onPress= {() => this.DanhgiaButtonPressed(storeId)}

                style = {{
                    position: 'absolute',
                    right: 0,
                    borderWidth: 1, 
                    borderRadius: 10,
                    borderColor: '#F34F08',
                    backgroundColor: '#F34F08',
                    marginBottom: 0.005*SCREEN_HEIGHT,
                }}>
                <Text
                    style = {{
                        padding: 0.01*SCREEN_HEIGHT,
                        paddingLeft: 0.02*SCREEN_HEIGHT,
                        paddingRight: 0.02*SCREEN_HEIGHT,
                        color: '#fff',
                        marginTop: 0,
                        
                        fontWeight: 'bold',
                    }}>
                    Đánh giá
                </Text>
            </TouchableOpacity>
        </View>
      </View>
    )
  }

  DanhgiaButtonPressed = (storeId) => {
    this.props.showPopup();
    this.props.resetReviewState();
    this.props.setStoreId(storeId);
    // ToastAndroid.show(storeId, ToastAndroid.SHORT);
  }

  render() {
    return(
      <RecyclerListView
            style={ {marginBottom: SCREEN_HEIGHT*0.11}}
            rowRenderer={this.rowRenderer}
            dataProvider={this.state.list}
            layoutProvider={this.layoutProvider}
      />
    );
  }
}

class RatingPopup extends Component {
    finishCmtButton = () => {
        this.props.hiddenPopup();
        this.props.showCommentInfo();
    }

    render() {
      return (
          <Modal.BottomModal
            visible={this.props.isPopupShown}
            onTouchOutside={this.props.hiddenPopup}
            height={0.5}
            width={1}
            onSwipeOut={this.props.hiddenPopup}
          >
            <ModalContent
              style={{
                flexDirection: 'column',
                backgroundColor: '#fff',
              }}>

                <Text
                    style = {{
                    fontWeight: 'bold',
                    fontSize: 15,
                    alignSelf: "center",
                    }}>
                    Hãy cho chúng tôi biết cảm giác của bạn?
                </Text>
                
                <TapRatingScreen 
                    style = {{
                        marginTop: 10,
                        marginBottom: 10,
                    }}
                    onChangeNumberStar = {this.props.onChangeNumberStar}

                />
               
                <AutoGrowingTextInput 
                    style = {{
                        marginBottom: 30,
                    }}
                    placeholder={'Bình luận...'}
                    onChange = {(event) => this.props.onChangeCmt(event)}
                />

                <TouchableOpacity
                    onPress={
                        this.finishCmtButton
                    }

                    style = {{
                        backgroundColor: '#33a62b',
                        borderRadius: 10,
                        position: 'absolute',
                        bottom: 0,
                        alignSelf: "center",
                    }} >

                    <Text
                        style = {{
                            padding: 10,
                            paddingLeft: 50,
                            paddingRight: 50,
                            fontWeight: 'bold',
                            color: '#fff',
                        }}>Xong</Text>
                </TouchableOpacity>
            </ModalContent>
          </Modal.BottomModal>
      );
    }
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
                        color: '#fff',
                        alignSelf: 'center',
                        fontWeight: 'bold',
                        fontSize: SCREEN_WIDTH/20,
                        flexDirection: 'column',
                        marginTop: 10,
                        marginBottom: 10,
                        //justifyContent: 'center',
                    }}>
                        Lịch sử
                    </Text>
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

    containerLoading: {
      flex: 1,
      justifyContent: 'center'
    },

    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    }
  });

  function mapStateToProps(state) {
    return {
      reviewSendData: state.ReviewSendReducer,
      getHistoryData: state.GetHistoryReducer,
    };
  }
  
  function dispatchToProps(dispatch) {
    return bindActionCreators(
      {
        reviewSendAction,
        getHistoryAction,
      },
      dispatch,
    );
  }
  
  export default connect(mapStateToProps, dispatchToProps)(HistoryComponent);
  