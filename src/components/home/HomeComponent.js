import React, { Component } from 'react';
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
    TextInput
} from 'react-native';

import { WINDOW_SIZE } from '../../utils/scale';
import { FONT_SIZE } from '../../utils/fontsize';
import LoginBackground from 'images/LoginBackground.jpg';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Icon from 'react-native-vector-icons/AntDesign';

import {searchAction} from '../../redux/action';


class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      isLoading: false,
    };
  }

  onPressNoti = () => {
    this.alertMessage('Da nhan notification');
  };

  pressReturnSearchKey = () => {
      if (e.nativeEvent.key == 'Enter') {
        if (!this.state.isLoading) {
          this.setState({isLoading: true});
          this.props
            .searchAction({
              searchQuery: this.state.searchQuery,
            })
            .then(() => {
              this.setState({isLoading: false});
              if (this.props.searchData.success) {
                this.setState({isLoading: false});
                this.props.navigation.navigate('Search');
              } else {
                this.setState({isLoading: false});
                this.alertMessage(this.props.searchData.errorMessage);
              }
            });
        }
      }
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

  render() {
    return (
      <ImageBackground
        source={LoginBackground}
        style={{width: WINDOW_SIZE.WIDTH, height: WINDOW_SIZE.HEIGHT}}>
        <View
          style={{alignContents: 'center', flexDirection: 'column', flex: 1}}>
          <SearchBox
            onPressNoti={() => this.onPressNoti()}
            pressReturnSearchKey = {() => this.pressReturnSearchKey()}
            onChangeSearchQuery={text => {
              this.setState({searchQuery: text});
            }}
          />
          <AddressBox />
        </View>
      </ImageBackground>
    );
  }
}

class SearchBox extends Component {
    render(){
        return (
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              flex: 0.05,
              backgroundColor: '#FFFFFF',
            }}>
            <View style={{flex: 0.1}} />
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
                  color: 'rgba(233,218,218,0.5)',
                }}
                onChangeText={this.props.onChangeSearchQuery}
                onKeyPress = {this.props.pressReturnSearchKey}
              />
            </View>
            <TouchableOpacity
              onPress={this.props.onPressNoti}
              style={{flex: 0.1}}>
              <Icon name="bells" size={30} color="#900" />
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