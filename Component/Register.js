import React, {Component} from 'react';
import {
  Dimensions,
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
  ImageBackground,
} from 'react-native';
import PasswordInputText from 'react-native-hide-show-password-input';
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
// ToastAndroid.show(String(deviceWidth),ToastAndroid.LONG)
export default class Login extends Component {
  render() {
    return (
      <View>
        <ImageBackground
          source={require('../SourceImage/LoginBackground.jpg')}
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}>
          <View
            style={{
              alignContents: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 50,
            }}>
            <Header></Header>
            <BoxRegister></BoxRegister>
            <RegisterButton></RegisterButton>
            <NotHaveAccount></NotHaveAccount>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.header}>Đăng Ký</Text>
      </View>
    );
  }
}

class BoxRegister extends Component {
  render() {
    return (
      <View
        style={{
          alignContents: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <BoxUsername></BoxUsername>
        <BoxPassword></BoxPassword>
        <BoxConfirmPassword></BoxConfirmPassword>
        <BoxEmail></BoxEmail>
        <RegisterwithEmail />
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
            color: 'rgba(233,218,218,0.5)',
          }}></TextInput>
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
            color: 'rgba(233,218,218,0.5)',
          }}></TextInput>
      </View>
    );
  }
}
<<<<<<< HEAD
class BoxConfirmPassword extends Component {
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
          placeholder="Xac Nhan Mật khẩu"
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
            color: 'rgba(233,218,218,0.5)',
          }}></TextInput>
      </View>
    );
  }
=======
class BoxConfirmPassword extends Component{
    render(){
        return (
          <View
            style={{
              width: 367,
              height: 42,
              backgroundColor: '#AA9B15',
              borderRadius: 13,
              marginTop: 20
            }}>
            <TextInput placeholder= "Xác Nhận Mật khẩu" secureTextEntry={true} style={{fontFamily: 'Verdana', fontStyle:"normal", fontWeight: "normal", fontSize: 15, lineHeight: 18, display: "flex", alignItems: "center", textAlign: "center", color: 'rgba(233,218,218,0.5)'}}></TextInput>
          </View>
        );
    }
>>>>>>> 5c93ba65a5d8131335eda3d513d2af2f6f412ff5
}
class BoxEmail extends Component {
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
          placeholder="Email"
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
            color: 'rgba(233,218,218,0.5)',
          }}></TextInput>
      </View>
    );
  }
}

class RegisterwithEmail extends Component {
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
          Đăng Ký bằng email
        </Text>
      </View>
    );
  }
}

class RegisterButton extends Component {
  render() {
    return (
      <View
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
          Đăng Ký
        </Text>
      </View>
    );
  }
}

class NotHaveAccount extends Component {
  render() {
    return (
      <View
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
          Bạn da có tài khoản.
          <Text
            style={{
              fontWeight: 'bold',
              textDecorationLine: 'underline',
              lineHeight: 14,
            }}>
            Đăng nhap
          </Text>
        </Text>
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
