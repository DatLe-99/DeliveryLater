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
import {signInAction} from '../../redux/action';

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '0356222105',
      password: 'abc',
      isLoading: false,
    };
  }

  onSignIn = () => {
    if (!this.state.isLoading) {
      this.setState({isLoading: true});
      this.props
        .signInAction({
          phone: this.state.username,
          password: this.state.password,
        })
        .then(() => {
          this.setState({isLoading: false});
          if (this.props.signInData.success) {
            this.setState({isLoading: false});
            this.props.navigation.navigate('Home');
          } else {
            this.setState({isLoading: false});
            this.alertMessage(this.props.signInData.errorMessage);
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

  render() {
    return (
      <ImageBackground
        source={LoginBackground}
        style={{width: WINDOW_SIZE.WIDTH, height: WINDOW_SIZE.HEIGHT}}>
        <View
          style={{
            alignContents: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 50,
          }}>
          <Header></Header>
          <BoxLogin
            onChangeUsername={text => {
              this.setState({username: text});
            }}
            onChangePassword={text => {
              this.setState({password: text});
            }}></BoxLogin>
          <LoginButton onPress={() => this.onSignIn()}></LoginButton>
          <ForgotPassword></ForgotPassword>
          <NotHaveAccount
            onPressRegister={() =>
              this.props.navigation.navigate('Register')
            }></NotHaveAccount>
        </View>
      </ImageBackground>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.header}>Đăng Nhập hoặc Đăng Ký</Text>
      </View>
    );
  }
}

class BoxLogin extends Component {
  render() {
    return (
      <View
        style={{
          alignContents: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <BoxUsername
          onChangeUsername={this.props.onChangeUsername}></BoxUsername>
        <BoxPassword
          onChangePassword={this.props.onChangePassword}></BoxPassword>
        <LoginwithEmail />
      </View>
    );
  }
}

class BoxUsername extends Component {
  render() {
    return (
      <View
        style={{
          width: 367,
          height: 42,
          backgroundColor: '#21B341',
          borderRadius: 13,
        }}>
        <TextInput
          placeholder="Số điện thoại"
          style={{
            fontFamily: 'Verdana',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 15,
            lineHeight: 18,
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            color: '#FFFFFF',
          }}
          onChangeText={this.props.onChangeUsername}
        />
      </View>
    );
  }
}

class BoxPassword extends Component {
  render() {
    return (
      <View
        style={{
          width: 367,
          height: 42,
          backgroundColor: '#AA9B15',
          borderRadius: 13,
          marginTop: 20,
        }}>
        <TextInput
          placeholder="Mật khẩu"
          secureTextEntry={true}
          style={{
            fontFamily: 'Verdana',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 15,
            lineHeight: 18,
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            color: '#FFFFFF',
          }}
          onChangeText={this.props.onChangePassword}
        />
      </View>
    );
  }
}

class LoginwithEmail extends Component {
  render() {
    return (
      <View
        style={{width: 208, height: 42, marginTop: 20, alignSelf: 'flex-end'}}>
        <Text
          style={
            (styles.text,
            {
              width: 208,
              height: 42,
              color: '#C22828',
              textDecorationLine: 'underline',
              textAlign: 'center',
              fontStyle: 'italic',
              fontWeight: 'bold',
            })
          }>
          Đăng nhập bằng email
        </Text>
      </View>
    );
  }
}

class LoginButton extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={{
          width: 208,
          heigth: 42,
          backgroundColor: '#D54646',
          borderRadius: 21,
        }}>
        <Text
          style={
            (styles.text,
            {
              color: '#FFFFFF',
              fontWeight: 'bold',
              width: 208,
              height: 42,
              fontSize: 16,
              textAlignVertical: 'center',
              textAlign: 'center',
            })
          }>
          Đăng nhập
        </Text>
      </TouchableOpacity>
    );
  }
}

class ForgotPassword extends Component {
  render() {
    return (
      <View style={{width: 208, height: 42, marginTop: 10}}>
        <Text
          style={
            (styles.text,
            {
              color: '#FFFFFF',
              fontSize: 12,
              lineHeight: 14,
              textDecorationLine: 'underline',
              textAlign: 'center',
            })
          }>
          Quên mật khẩu
        </Text>
      </View>
    );
  }
}

class NotHaveAccount extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPressRegister}
        style={{
          width: 367,
          heigth: 42,
          backgroundColor: '#0B76C5',
          borderRadius: 13,
        }}>
        <Text
          style={
            (styles.text,
            {
              color: '#FFFFFF',
              width: 358,
              height: 42,
              fontSize: 14,
              textAlignVertical: 'center',
              textAlign: 'center',
            })
          }>
          Bạn chưa có tài khoản.
          <Text
            style={{
              fontWeight: 'bold',
              textDecorationLine: 'underline',
              lineHeight: 14,
            }}>
            Đăng ký
          </Text>
        </Text>
      </TouchableOpacity>
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

function mapStateToProps(state) {
  return {
    signInData: state.SignInReducer,
  };
}

function dispatchToProps(dispatch) {
  return bindActionCreators(
    {
      signInAction,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, dispatchToProps)(LoginComponent);
