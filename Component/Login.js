import React, { Component } from 'react';
import {Dimensions, Text, View, Image,TextInput, StyleSheet, TouchableOpacity, FlatList, ToastAndroid, ImageBackground } from 'react-native';
import PasswordInputText from 'react-native-hide-show-password-input';
var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;
// ToastAndroid.show(String(deviceWidth),ToastAndroid.LONG)
export default class Login extends Component{
    render(){
        return(
            <View>
                <ImageBackground
                    source={require('../SourceImage/LoginBackground.jpg')} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height }}>
                    <View style = {{alignContents: 'center', flexDirection: 'column', alignItems: 'center', margin: 50}}>
                        <Header ></Header>
                        <BoxLogin></BoxLogin>
                        <LoginButton></LoginButton>
                        <ForgotPassword></ForgotPassword>
                        <NotHaveAccount></NotHaveAccount>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}
class Header extends Component{
    render(){
        return(
            <View style ={styles.header}>
                <Text style = {styles.header}>
                    Đăng Nhập hoặc Đăng Ký
                </Text>
            </View>
        );
    }
}

class BoxLogin extends Component{
    render(){
        return (
          <View style = {{alignContents: 'center', flexDirection: 'column', alignItems: 'center', margin:20}}>
            <BoxUsername/>
            <BoxPassword></BoxPassword>
            <LoginwithEmail/>
          </View>
        );
    }
}

class BoxUsername extends Component{
    render(){
        return(
            <View style ={{width: 367, height: 42, backgroundColor: '#21B341', borderRadius: 13}}>
                <TextInput placeholder= "Số điện thoại" style={{fontFamily: 'Verdana', fontStyle:"normal", fontWeight: "normal", fontSize: 15, lineHeight: 18, display: "flex", alignItems: "center", textAlign: "center", color: 'rgba(233,218,218,0.5)'}}>
                </TextInput>
            </View>
        );
    }
}

class BoxPassword extends Component{
    render(){
        return (
          <View
            style={{
              width: 367,
              height: 42,
              backgroundColor: '#AA9B15',
              borderRadius: 13,
            }}>
            <TextInput placeholder= "Mật khẩu" secureTextEntry={true} style={{fontFamily: 'Verdana', fontStyle:"normal", fontWeight: "normal", fontSize: 15, lineHeight: 18, display: "flex", alignItems: "center", textAlign: "center", color: 'rgba(233,218,218,0.5)'}}></TextInput>
          </View>
        );
    }
}

class LoginwithEmail extends Component{
    render(){
        return(
            <View style={{width: 208, height: 42}}>
                <Text style={styles.text, {width: 208, height: 42, color: '#C22828', textDecorationLine: 'underline', textAlign: "right", fontStyle: 'italic', fontWeight: 'bold'}}>Đăng nhập bằng email</Text>
            </View>
        );
    }
}

class LoginButton extends Component{
    render(){
        return(
            <View style={{width: 200, heigth: 42, backgroundColor: '#D54646', borderColor: 1, borderRadius: 21}}>
                <Text style={styles.text, {textAlign: 'center', color: '#FFFFFF'}}>Đăng Nhập</Text>
            </View>
        );
    }
}

class ForgotPassword extends Component{
    render(){
        return(
            <View style ={{width: 208, height: 42}}>
                <Text style={styles.text, {color: '#FFFFFF', fontSize: 12, lineHeight: 14, textDecorationLine: 'underline', textAlign: 'center'}}>Quên mật khẩu</Text>
            </View>
        );
    }

}

class NotHaveAccount extends Component{
    render() {
        return (
            <View style={{width: 367, heigth: 42, backgroundColor: '#0B76C5', borderRadius: 13}}>
                <Text style={styles.text, { color: '#FFFFFF', width: 358, height: 42, fontSize: 14, textAlignVertical: "center",textAlign: "center"}}>Bạn chưa có tài khoản. Đăng ký</Text>
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

