import React, {Component} from 'react';
import {
    View,
    Image,
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
    Dimensions,
    ToastAndroid,
    PermissionsAndroid,
} from 'react-native';

import {WINDOW_SIZE} from '../../utils/scale';
import {FONT_SIZE} from '../../utils/fontsize';
import LoginBackground from 'images/LoginBackground.jpg';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SaleOff50 from 'images/SaleOff50.png'
import IconAntDesign from 'react-native-vector-icons/AntDesign';
//import IconEntypo from 'react-native-vector-icons/Entypo';
//import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from 'react-native-geolocation-service';
import BottomBarComponent from '../bottomBar/BottomBarComponent';

import {searchAction, addressAction, updateAction} from '../../redux/action';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
//import TabBar from '@mindinventory/react-native-tab-bar-interaction';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import TabNavigator from 'react-native-tab-navigator';
import RNGooglePlaces from 'react-native-google-places';

// export async function request_device_location_runtime_permission(){
//   try{
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       {
//         'title': 'ReactNativeCode Location Permission',
//         'message': 'ReactNativeCode App needs access to your location'
//       }
//     )
//     if(granted != PermissionsAndroid.RESULTS.GRANTED){
//       Alert.alert("Location Permission Not Granted");
//     }
//   }catch(err){
//     console.warn(err)
//   }
// }
class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      isLoading: false,
      latitude: null,
      longitude: null,
      error: null,
      address: '',
      accountData: this.props.navigation.getParam('accountData'),
    };
  }

  onPressNoti = () => {
    this.alertMessage('Da nhan notification');
  };

  pressReturnSearchKey = () => {
    if (!this.state.isLoading) {
      this.setState({isLoading: true});
      this.props
        .searchAction({
          name: this.state.searchQuery,
        })
        .then(() => {
          this.setState({isLoading: false});
          if (this.props.searchData.success) {
            this.setState({isLoading: false});
            this.props.navigation.navigate('Search',
              {
                listRestaurant: this.props.searchData.dataRes.store
              }
            );

          } else {
            this.setState({isLoading: false});
            this.alertMessage(this.props.searchData.errorMessage);
          }
        });
    }
  };

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

  exitApp = () =>{
    Alert.alert(
      '',
      "Bạn có muốn thoát khỏi ứng dụng",
      [
        {
          text: 'OK',
          onPress: () => {
            BackHandler.exitApp()
          },
        },
        {
          text: 'Không',
          onPress: () => {
            return;
          }
        }
      ],
      { cancelable: false },
    );
  }



  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
      .then(place => {
        console.log(place);
        this.setState({
          latitude: place.location.latitude,
          longitude: place.location.longitude,
          address: place.location.address,
        })
        // place represents user's selection from the
        // suggestions and it is a simplified Google Place object.
        if (!this.state.isLoading) {
        this.setState({isLoading: true});
        this.props
          .updateAction({
            ID: this.state.accountData.ID,
            lat : place.location.latitude,
            lng: place.location.longitude,
          })
          .then(() => {
            this.setState({isLoading: false});
            if (this.props.updatedData.success) {
              this.setState({isLoading: false});
              console.log(this.props.updatedData.dataRes)
            } else {
              this.setState({isLoading: false});
              this.alertMessage(this.props.updatedData.errorMessage);
            }
          });
        }

      })
      .catch(error => console.log(error.message));
  }

  render() {
    return (
      // <ImageBackground
      //   source={LoginBackground}
      //   style={{width: WINDOW_SIZE.WIDTH, height: WINDOW_SIZE.HEIGHT}}>
        <View
          style={{alignContents: 'center', flexDirection: 'column', flex: 1}}>
          <SearchBox
            onSubmitEditing={() => {
              this.pressReturnSearchKey();
            }}
            onChangeSearchQuery={text => {
              this.setState({searchQuery: text});
            }}
            onPressNoti={() => this.onPressNoti()}

            onBack = {() => this.exitApp()}
          />
          <AddressBox
            openSearchModal = {() => this.openSearchModal()}
          />
          <AddressBox />

          <BannerImageView />

          <FoodRecommendBar />

          <BottomBarComponent 
            selectedTab = 'home'
            onPressHome = {() => this.props.navigation.navigate('Home')}
            onPressHistory = {() => this.props.navigation.navigate('History')}
            onPressCart = {() => this.props.navigation.navigate('Cart')}
            onPressProfile = {() => this.props.navigation.navigate('Profile')}
          />

          {/* <TabbarView /> */}
          {/* <HomeBottomTabbar 
            onPressHistory={() => this.props.navigation.navigate('History')}
          /> */}

        </View>
      // </ImageBackground>
    );
  }
}

class SearchBox extends Component {
  render() {
    return (
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          flex: 0.06,
          backgroundColor: '#FFFFFF',
        }}>
        <TouchableOpacity style={{flex: 0.1, alignSelf: 'center'}}>
          <IconAntDesign
          onPress = {this.props.onBack}
          name="left" size={30} color="#000000" />
        </TouchableOpacity>
        <View
          style={{
            flex: 0.8,
            borderRadius: 20,
            borderColor: '#000000',
            shadowColor: 'rgba(0,0,0,0.25)',
            borderWidth: 1,
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <TextInput
            placeholder="Tìm kiếm nhà hàng món ăn"
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
            onChangeText={this.props.onChangeSearchQuery}
            onSubmitEditing={this.props.onSubmitEditing}
            // onKeyPress = {this.props.pressReturnSearchKey}
          />
        </View>
        <TouchableOpacity
          onPress={this.props.onPressNoti}
          style={{flex: 0.1, alignSelf: 'center'}}>
          <IconAntDesign name="bells" size={30} color="#900" />
        </TouchableOpacity>
      </View>
    );
  }
}

class AddressBox extends Component {
  render() {
    return (
      <View
        style={{
          marginTop: 12,
          flexDirection: 'row',
          flex: 0.05,
          backgroundColor: '#FFFF',
        }}>
        <View style={{flex: 0.1}} />

        <View
          style={{
            flex: 0.8,
            borderRadius: 20,
            borderColor: '#000',
            shadowColor: 'rgba(0,0,0,0.25)',
            borderWidth: 1,
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <View>
            <TouchableOpacity onPress={this.props.openSearchModal}>
              <Text
                style={{
                  fontFamily: 'Times New Roman',
                  fontStyle: 'italic',
                  fontWeight: 'normal',
                  lineHeight: 41,
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}
                >
                {'Chọn địa chỉ nhận hàng'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

class BannerImageView extends Component {
  render() {
    return (
      <View
        style={{
          marginTop: 12,
          flexDirection: 'row',
          flex: 0.3,
        }} >

        <Image
            style={{
              flex: 1,
              width: undefined,
              height: undefined,
              borderWidth: 1,
              borderRadius: 20,
            }}
            source={SaleOff50}
            />
      </View>
    );
  }
}

class FoodRecommendBar extends Component {
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
  }

  render() {
      return (
          <View
            style = { {
              marginTop: 12
          }
          }>
              <SegmentedControlTab
                  values={['Gợi ý', 'Gần tôi', 'Vừa đặt', 'Mới']}
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

const deviceW = Dimensions.get('window').width

const basePx = 375

function px2dp(px) {
  return px *  deviceW / basePx
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  bottomBarItem: {
      flex: 0.5,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      marginTop: 10,
  }
});

function mapStateToProps(state) {
  return {
    searchData: state.SearchReducer,
    locationData: state.AddressReducer,
    updatedData: state.UpdateReducer,
  };
}

function dispatchToProps(dispatch) {
  return bindActionCreators(
    {
      searchAction,
      addressAction,
      updateAction,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, dispatchToProps)(HomeComponent);
