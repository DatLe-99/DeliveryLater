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
  PermissionsAndroid,
} from 'react-native';

import {WINDOW_SIZE} from '../../utils/scale';
import {FONT_SIZE} from '../../utils/fontsize';
import LoginBackground from 'images/LoginBackground.jpg';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Geolocation from 'react-native-geolocation-service';

import Icon from 'react-native-vector-icons/AntDesign';

import {searchAction} from '../../redux/action';
import RNGooglePlaces from 'react-native-google-places';

export async function request_device_location_runtime_permission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'ReactNativeCode Location Permission',
        message: 'ReactNativeCode App needs access to your location',
      },
    );
    if (granted != PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert('Location Permission Not Granted');
    }
  } catch (err) {
    console.warn(err);
  }
}

class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      isLoading: false,
      latitude: null,
      longitude: null,
      error: null,
    };
  }

  async componentDidMount() {
    if (Platform.OS === 'android') {
      await request_device_location_runtime_permission();
    }
    this.getLongLat = Geolocation.watchPosition(
      position => {
        console.log(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      error => this.setState({error: error.message}),
      {
        enableHighAccuracy: true,
        timeout: 2000,
        maximumAge: 100,
        distanceFilter: 10,
      },
    );
  }

  componentWillUnmount() {
    Geolocation.clearWatch(this.getLongLat);
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
        console.log(place);
        // place represents user's selection from the
        // suggestions and it is a simplified Google Place object.
      })
      .catch(error => console.log(error.message)); // error is a Javascript Error object
  }

  render() {
    return (
      <ImageBackground
        source={LoginBackground}
        style={{width: WINDOW_SIZE.WIDTH, height: WINDOW_SIZE.HEIGHT}}>
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
            onBack={() => this.exitApp()}
          />
          <AddressBox />
          <View>
            <TouchableOpacity onPress={() => this.openSearchModal()}>
              <Text>Pick a Place</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
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
          <Icon name="left" size={30} color="#000000" />
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
              marginTop: 20,
              flexDirection: 'row',
              flex: 0.06,
              backgroundColor: '#FFFFFF',
            }}
          />
          <TouchableOpacity
            onPress={this.props.onBack}
            style={{flex: 0.1, alignSelf: 'center'}}>
            <Icon name="left" size={30} color="#000000" />
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
            <Icon name="bells" size={30} color="#900" />
          </TouchableOpacity>
        </View>
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
          <Text
            style={{
              fontFamily: 'Times New Roman',
              fontStyle: 'italic',
              fontWeight: 'bold',
              lineHeight: 41,
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            {'227 Nguyen Van Cu, Q5, TP.HCM'}
          </Text>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchData: state.SearchReducer,
  };
}

function dispatchToProps(dispatch) {
  return bindActionCreators(
    {
      searchAction,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, dispatchToProps)(HomeComponent);
