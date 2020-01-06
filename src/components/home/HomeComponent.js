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
  DeviceEventEmitter,
  TextInput,
  Dimensions,
  ToastAndroid,
  PermissionsAndroid,
  FlatList,
  RefreshControl,
} from 'react-native';

import {WINDOW_SIZE} from '../../utils/scale';
import {FONT_SIZE} from '../../utils/fontsize';
import LoginBackground from 'images/LoginBackground.jpg';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SaleOff50 from 'images/SaleOff50.png';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
//import IconEntypo from 'react-native-vector-icons/Entypo';
//import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from 'react-native-geolocation-service';
import BottomBarComponent from '../bottomBar/BottomBarComponent';
import {
  searchAction,
  addressAction,
  updateAction,
  recommendAction,
  newestAction,
} from '../../redux/action';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
//import TabBar from '@mindinventory/react-native-tab-bar-interaction';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import TabNavigator from 'react-native-tab-navigator';
import RNGooglePlaces from 'react-native-google-places';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box'

// export async function request_device_location_runtime_permission(){
//   try{
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       {
//         'title': 'ReactNativeCode Location Permission',
//         'message': 'ReactNativeCode App needs access to your location'
//       }
//     )
//     if(granted === PermissionsAndroid.RESULTS.GRANTED){
//       Alert.alert("Location Permission Granted");
//     }
//     else {
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
      currentData: [],
      refreshing: false,
      tabindex: 0, //[Goi y, Gan toi, Vua dat, Moi]
    };
    //this.index = 0
  }

  async requestLocationPermission() {
    const chckLocationPermission = PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
      alert("You've access for the location");
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // alert("You've access for the location");
        } else {
          alert("Xin lỗi bạn cần cung cấp quyền truy cập vị trí để sử dụng Delivery Later");
          BackHandler.exitApp();
        }
      } catch (err) {
        alert(err);
      }
    }
  }

  async componentWillMount() {
    await requestLocationPermission();
  }

  async componentDidMount() {
    if (Platform.OS === 'android') {
      await this.requestLocationPermission();
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message:
          "<h2>Bật vị trí</h2>Để sử dụng Delivery Later. Bạn cần bật GPS<br/><br/>Chúng tôi cần Wifi/3G/4G và GPS để đạt được trải nghiệm tốt nhất<br/><br/>",
        ok: 'YES',
        cancel: 'NO',
        enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
        showDialog: true, // false => Opens the Location access page directly
        openLocationServices: true, // false => Directly catch method is called if location services are turned off
        preventOutSideTouch: true, //true => To prevent the location services popup from closing when it is clicked outside
        preventBackClick: true, //true => To prevent the location services popup from closing when it is clicked back button
        providerListener: true, // true ==> Trigger "locationProviderStatusChange" listener when the location state changes
      })
        .then(
          function(success) {
            RNGooglePlaces.getCurrentPlace()
              .then(results => {
                console.log(results);
                this.setState({
                  latitude: results[0].location.latitude,
                  longitude: results[0].location.longitude,
                  address: results[0].address,
                });
                if (!this.state.isLoading) {
                  this.setState({isLoading: true});
                  this.props
                    .updateAction({
                      ID: this.state.accountData.ID,
                      account_location: {
                        account_id: this.state.accountData.ID,
                        address: this.state.address,
                        lat: this.state.latitude,
                        lng: this.state.longitude,
                      },
                    })
                    .then(() => {
                      this.setState({isLoading: false});
                      if (this.props.updatedData.success) {
                        this.setState({isLoading: false});
                        if (this.state.tabindex == 0) {
                          this.recommendStore();
                        } else if (this.state.tabindex == 1) {
                          this.NearMe();
                        } else if (this.state.tabindex == 3) {
                          this.newestStore();
                        }
                        console.log(this.props.updatedData.dataRes);
                      } else {
                        this.setState({isLoading: false});
                        this.alertMessage(this.props.updatedData.errorMessage);
                      }
                    });
                }
              })
              .catch(error => console.log(error.message));
          }.bind(this),
        )
        .catch(error => {
          console.log(error.message);
          BackHandler.exitApp();
        });

      // BackHandler.addEventListener('hardwareBackPress', () => {
      //   //(optional) you can use it if you need it
      //   LocationServicesDialogBox.forceCloseDialog();
      // });

      // DeviceEventEmitter.addListener('locationProviderStatusChange', function(
      //   status,
      // ) {
      //   // only trigger when "providerListener" is enabled
      //   console.log(status); //  status => {enabled: false, status: "disabled"} or {enabled: true, status: "enabled"}
      // });
    }
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
            this.props.navigation.navigate('Search', {
              listRestaurant: this.props.searchData.dataRes.store,
              account: this.state.accountData,
              address: this.state.address,
            });
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

  exitApp = () => {
    Alert.alert(
      '',
      'Bạn có muốn thoát khỏi ứng dụng',
      [
        {
          text: 'OK',
          onPress: () => {
            BackHandler.exitApp();
          },
        },
        {
          text: 'Không',
          onPress: () => {
            return;
          },
        },
      ],
      {cancelable: false},
    );
  };
  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
      .then(place => {
        this.setState({
          latitude: place.location.latitude,
          longitude: place.location.longitude,
          address: place.address,
        });
        // place represents user's selection from the
        // suggestions and it is a simplified Google Place object.
        if (!this.state.isLoading) {
          this.setState({isLoading: true});
          console.log(place);
          this.props
            .updateAction({
              ID: this.state.accountData.ID,
              account_location: {
                account_id: this.state.accountData.ID,
                address: this.state.address,
                lat: this.state.latitude,
                lng: this.state.longitude,
              },
            })
            .then(() => {
              this.setState({isLoading: false});
              if (this.props.updatedData.success) {
                this.setState({isLoading: false});
                if (this.state.tabindex == 0) {
                  this.recommendStore();
                } else if (this.state.tabindex == 1) {
                  this.NearMe();
                } else if (this.state.tabindex == 3) {
                  this.newestStore();
                }
                console.log(this.props.updatedData.dataRes);
              } else {
                this.setState({isLoading: false});
                this.alertMessage(this.props.updatedData.errorMessage);
              }
            });
        }
      })

      .catch(error => console.log(error.message));
  }

  NearMe = () => {
    if (!this.state.isLoading) {
      this.setState({isLoading: true});
      this.props
        .addressAction({
          lat: this.state.latitude,
          lng: this.state.longitude,
        })
        .then(() => {
          this.setState({isLoading: false});
          if (this.props.nearStoreData.success) {
            this.setState({
              isLoading: false,
              currentData: this.props.nearStoreData.dataRes,
            });
            console.log(this.props.nearStoreData.dataRes);
          } else {
            this.setState({isLoading: false});
            this.alertMessage(this.props.nearStoreData.errorMessage);
          }
        });
    }
  };

  recommendStore = () => {
    if (!this.state.isLoading) {
      this.setState({isLoading: true});
      this.props
        .recommendAction({
          lat: this.state.latitude,
          lng: this.state.longitude,
        })
        .then(() => {
          this.setState({isLoading: false});
          if (this.props.recommendData.success) {
            this.setState({
              isLoading: false,
              currentData: this.props.recommendData.dataRes,
            });
            console.log(this.props.recommendData.dataRes);
          } else {
            this.setState({isLoading: false});
            this.alertMessage(this.props.recommendData.errorMessage);
          }
        });
    }
  };

  newestStore = () => {
    if (!this.state.isLoading) {
      this.setState({isLoading: true});
      this.props
        .newestAction({
          lat: this.state.latitude,
          lng: this.state.longitude,
        })
        .then(() => {
          this.setState({isLoading: false});
          if (this.props.newestData.success) {
            this.setState({
              isLoading: false,
              currentData: this.props.newestData.dataRes,
            });
            console.log(this.props.newestData.dataRes);
          } else {
            this.setState({isLoading: false});
            this.alertMessage(this.props.newestData.errorMessage);
          }
        });
    }
  };

  parentCallbackIndex = index => {
    this.setState({
      tabindex: index,
    });
  };
  render() {
    return (
      <View style={{alignContents: 'center', flexDirection: 'column', flex: 1}}>
        <SearchBox
          onSubmitEditing={() => {
            this.pressReturnSearchKey();
          }}
          onChangeSearchQuery={text => {
            this.setState({searchQuery: text});
          }}
          onPressNoti={() => this.onPressNoti()}
          onBack={() => this.exitApp()}
        />
        <AddressBox
          openSearchModal={() => this.openSearchModal()}
          currentAddress={this.state.address}
        />

        <BannerImageView />
        <FoodRecommendBar
          NearMe={() => this.NearMe()}
          recommendStore={() => this.recommendStore()}
          parentCallbackIndex={this.parentCallbackIndex}
          newestStore={() => this.newestStore()}
        />
        <View style={{flex: 0.85, marginTop: 10}}>
          <FlatList
            data={this.state.currentData}
            listKey={(item, index) => 'D' + index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('Restaurant', {
                    listMenu: {item},
                    account: this.state.accountData,
                    address: this.state.address,
                    restaurant: item,
                  })
                }>
                <RestaurantItem res={item} />
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.props.onRefresh}
              />
            }
          />
        </View>

        <BottomBarComponent
          selectedTab="home"
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

class SearchBox extends Component {
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
          height: WINDOW_SIZE.HEIGHT / 20,
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
          <View style={{alignSelf: 'flex-start', justifyContent: 'center'}}>
            <TouchableOpacity onPress={this.props.openSearchModal}>
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: 'Times New Roman',
                  fontStyle: 'italic',
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  padding: 10,
                  color: 'rgba(0, 0, 0, 0.7)',
                }}>
                {this.props.currentAddress}
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
          height: WINDOW_SIZE.HEIGHT / 5,
        }}>
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
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
    };
  }

  handleIndexChange = index => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });

    this.props.parentCallbackIndex(index);

    if (index == 1) {
      this.props.NearMe();
      ToastAndroid.show('Các quán ăn gần bạn', ToastAndroid.SHORT);
    } else if (index == 0) {
      this.props.recommendStore();
      ToastAndroid.show('Quán được đề xuất', ToastAndroid.SHORT);
    } else if (index == 3) {
      this.props.newestStore();
      ToastAndroid.show('Quán mới', ToastAndroid.SHORT);
    }
  };

  render() {
    return (
      <View
        style={{
          marginTop: 12,
        }}>
        <SegmentedControlTab
          values={['Gợi ý', 'Gần tôi', 'Vừa đặt', 'Mới']}
          selectedIndex={this.state.selectedIndex}
          onTabPress={this.handleIndexChange}
          borderRadius={0}
          tabsContainerStyle={{backgroundColor: '#F2F2F2'}}
          tabStyle={{
            backgroundColor: '#F2F2F2',
            borderWidth: 0,
            borderColor: 'transparent',
          }}
          activeTabStyle={{backgroundColor: 'white', marginTop: 2}}
          tabTextStyle={{color: '#000'}}
          activeTabTextStyle={{color: '#fb4f46', fontWeight: 'bold'}}
        />
      </View>
    );
  }
}

class TabDemo extends Component {
  state = {
    selectedTab: 'home',
  };

  render() {
    return (
      <TabNavigator style={styles.container}>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'home'}
          title="Home"
          selectedTitleStyle={{color: '#DF0029'}}
          renderIcon={() => (
            <IconMaterialCommunity
              name="food-fork-drink"
              size={px2dp(22)}
              color="#666"
            />
          )}
          renderSelectedIcon={() => (
            <IconMaterialCommunity
              name="food-fork-drink"
              size={px2dp(22)}
              color="#DF0029"
            />
          )}
          //badgeText="1"
          onPress={() => this.setState({selectedTab: 'home'})}>
          <Text></Text>
        </TabNavigator.Item>

        <TabNavigator.Item
          selected={this.state.selectedTab === 'history'}
          title="History"
          selectedTitleStyle={{color: '#DF0029'}}
          renderIcon={() => (
            <IconAwesome name="history" size={px2dp(22)} color="#666" />
          )}
          renderSelectedIcon={() => (
            <IconAwesome name="history" size={px2dp(22)} color="#DF0029" />
          )}
          onPress={() => this.setState({selectedTab: 'history'})}>
          <Text></Text>
        </TabNavigator.Item>

        <TabNavigator.Item
          selected={this.state.selectedTab === 'cart'}
          title="Cart"
          selectedTitleStyle={{color: '#DF0029'}}
          renderIcon={() => (
            <IconMaterialCommunity name="cart" size={px2dp(22)} color="#666" />
          )}
          renderSelectedIcon={() => (
            <IconMaterialCommunity
              name="cart"
              size={px2dp(22)}
              color="#DF0029"
            />
          )}
          //badgeText="1"
          onPress={() => this.setState({selectedTab: 'cart'})}>
          <Text></Text>
        </TabNavigator.Item>

        <TabNavigator.Item
          selected={this.state.selectedTab === 'profile'}
          title="Profile"
          selectedTitleStyle={{color: '#DF0029'}}
          renderIcon={() => (
            <IconAwesome name="user" size={px2dp(22)} color="#666" />
          )}
          renderSelectedIcon={() => (
            <IconAwesome name="user" size={px2dp(22)} color="#DF0029" />
          )}
          onPress={() => this.setState({selectedTab: 'profile'})}>
          <Text></Text>
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}

function RestaurantItem({res}) {
  return (
    <View style={{flexDirection: 'column', flex: 1}}>
      <View style={{flexDirection: 'row', flex: 1}}>
        <Image
          style={{
            flex: 0.25,
            width: 100,
            height: 100,
            margin: 10,
            borderRadius: 10,
          }}
          source={require('../../media/images/test.jpg')}
        />
        <View style={{flex: 0.6}}>
          <View style={{flexDirection: 'column', flex: 1, margin: 5}}>
            <View style={{flex: 0.1}} />
            <Text
              style={{
                flex: 0.3,
                fontFamily: 'Verdana',
                fontSize: 15,
                lineHeight: 17,
                alignItems: 'center',
                alignContent: 'center',
                color: '#000000',
              }}>
              {res.name}
            </Text>
            <Text
              style={{
                flex: 0.3,
                fontFamily: 'Verdana',
                fontWeight: 'normal',
                fontSize: 12,
                lineHeight: 14,
                alignItems: 'center',
                alignContent: 'center',
                color: 'rgba(0,0,0,0.7)',
              }}>
              {res.store_location.address +
                ', ' +
                res.city +
                ', ' +
                res.province}
            </Text>
            <Text
              style={{
                flex: 0.3,
                fontFamily: 'Verdana',
                fontWeight: 'normal',
                fontSize: 12,
                lineHeight: 14,
                alignItems: 'center',
                alignContent: 'center',
                color: '#000000',
              }}>
              Giá: ~50k
            </Text>
          </View>
        </View>
        <View style={{flex: 0.15}}>
          <View
            style={{
              flexDirection: 'column',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{flex: 0.6}}></View>
            <Text
              numberOfLines={1}
              style={{
                flex: 0.2,
                fontFamily: 'Verdana',
                fontSize: 11,
                fontWeight: 'normal',
                fontStyle: 'normal',
                color: 'rgba(0,0,0,0.7)',
              }}>
              {res.distance.toFixed(2)} km
            </Text>
            <View style={{flex: 0.2, alignSelf: 'center'}}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  alignContent: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    marginRight: 5,
                    fontFamily: 'Verdana',
                    fontSize: 11,
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    color: 'rgba(0,0,0,0.7)',
                  }}>
                  >30p
                </Text>
                <IconAntDesign name="clockcircle" size={12} color="#F34F08" />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{borderBottomColor: '#000000', borderBottomWidth: 1}} />
    </View>
  );
}

const deviceW = Dimensions.get('window').width;

const basePx = 375;

function px2dp(px) {
  return (px * deviceW) / basePx;
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
  },
});

function mapStateToProps(state) {
  return {
    searchData: state.SearchReducer,
    nearStoreData: state.AddressReducer,
    updatedData: state.UpdateReducer,
    recommendData: state.RecommendReducer,
    newestData: state.NewestReducer,
  };
}

function dispatchToProps(dispatch) {
  return bindActionCreators(
    {
      searchAction,
      addressAction,
      updateAction,
      recommendAction,
      newestAction,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, dispatchToProps)(HomeComponent);
