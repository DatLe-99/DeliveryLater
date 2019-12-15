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
                    source={require('../SourceImage/LoginBackground.jpg')} style={{ flex: 1, width: Dimensions.get('window').width, height: Dimensions.get('window').height }}>
                    <View>
                        <Header></Header>
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
            <View style ={{width:313, height: 35, position: 'absolute'}}>
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
          <View>
            <BoxUsername>Số Điện Thoại</BoxUsername>
            <BoxPassword>Mật khẩu</BoxPassword>
            <LoginwithEmail></LoginwithEmail>
          </View>
        );
    }
}

class BoxUsername extends Component{
    render(){
        return(
            <View style ={{position: "absolute", width: 367, height: 42, backgroundColor: '#21B341', borderRadius: 30}}>
                <TextInput style={{fontFamily: 'Verdana', fontStyle:"normal", fontWeight: "normal", fontSize: 15, lineHeight: 18, display: "flex", alignItems: "center", textAlign: "center", color: 'rgba(233,218,218,0.5)'}}>
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
              position: 'absolute',
              width: 367,
              height: 42,
              backgroundColor: '#AA9B15',
              borderRadius: 13,
            }}>
            <PasswordInputText style={(styles.text, {color: 'rgba(233,218,218,0.5)'})}>
            </PasswordInputText>
          </View>
        );
    }
}

class LoginwithEmail extends Component{
    render(){
        return(
            <View style={{width: 208, height: 42}}>
                <Text style={styles.text, { width: 208, height: 42, color: '#C22828', textDecorationLine: 'underline', textAlign: "right", fontStyle: 'italic', fontWeight: 'bold'}}>
                    Đăng nhập bằng email
                </Text>
            </View>
        );
    }
}

class LoginButton extends Component{
    render(){
        return(
            <View style={{position:"absolute", width: 200, heigth:42, backgroundColor: '#D54646', borderColor: 1, borderRadius: 21}}>
                <Text style={styles.text, {color: '#FFFFFF'}}>Đăng Nhập</Text>
            </View>
        );
    }
}

class ForgotPassword extends Component{
    render(){
        return(
            <View style ={{wdith: 208, height: 42, position: "absolute"}}>
                <Text style={styles.text, {color: '#FFFFFF', fontSize: 12, lineHeight: 14, textDecorationLine: 'underline'}}>Quên mật khẩu</Text>
            </View>
        );
    }

}

class NotHaveAccount extends Component{
    render() {
        return (
            <View style={{ position: "absolute", width: 367, heigth: 42, backgroundColor: '#0B76C5', borderRadius: 13 }}>
                <Text style={styles.text, { color: '#FFFFFF', width: 358, height: 42, fontSize: 14 }}>Bạn chưa có tài khoản. Đăng ký</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        header:{
            fontFamily: 'Verdana',
            fontSize: 21,
            fontStyle: 'normal',
            width: 305,
            height: 35,
            color: '#FFFFFF',
            fontWeight: 'bold',
            // position: "absolute",
            alignItems: 'center',
            textAlign: 'center',
            display: 'flex'
        },
        text: {
            fontFamily: 'Verdana', 
            fontStyle: "normal", 
            fontWeight: "normal", 
            fontSize: 15, 
            lineHeight: 18, 
            display: "flex", 
            alignItems: "center", 
            textAlign: "center", 
        }
    }
    
);

