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
} from 'react-native';

import {WINDOW_SIZE} from '../../utils/scale';
import {FONT_SIZE} from '../../utils/fontsize';
import LoginBackground from 'images/LoginBackground.jpg';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Icon from 'react-native-vector-icons/AntDesign';

class HomeComponent extends Component {
  constructor(props) {
    super(props);
  }

  onPressNoti = () => {
    this.alertMessage('Da nhan notification');
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

  render() {
    return (
      <ImageBackground
        source={LoginBackground}
        style={{width: WINDOW_SIZE.WIDTH, height: WINDOW_SIZE.HEIGHT}}>
        <View
          style={{alignContents: 'center', flexDirection: 'column', flex: 1}}>
          <SearchBox onPressNoti={() => this.onPressNoti()} />
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
          flex: 0.05,
          backgroundColor: '#FFFFFF',
        }}>
        <View style={{flex: 0.1}}></View>
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
          <TextInput placeholder="Tìm kiếm nhà hàng món ăn" />
        </View>
        <TouchableOpacity onPress={this.props.onPressNoti} style={{flex: 0.1}}>
          <Icon name="bells" size={30} color="#900" />
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function dispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, dispatchToProps)(HomeComponent);
