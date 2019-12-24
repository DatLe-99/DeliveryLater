import React, { Component } from 'react';
import {FlatList, ActivityIndicator, Dimensions, Text, View, Image,TextInput, StyleSheet, TouchableOpacity, ToastAndroid, ImageBackground } from 'react-native';
import PasswordInputText from 'react-native-hide-show-password-input';
var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;
import axios from 'axios'
import { sendLoginRequest } from '../NetWorking/Server';
// import test from '../NetWorking/Server'
// import { getLoginAccepted } from '../NetWorking/Server'
// ToastAndroid.show(String(deviceWidth),ToastAndroid.LONG)
export default class Login extends Component{
    constructor(props) {
        super(props);
        this.state = ({
            username: '',
            password: '',
            isLoading: true
        })
    }   
    componentDidMount() {
        return fetch('https://delivery-later.herokuapp.com/api/accounts/login')
        .then((response) => response.json())
        .then((responseJson) => {

            this.setState({
                isLoading: false,
                dataSource: responseJson.loginRespond,
            }, function () {

            });

        })
        .catch((error) => {
            console.error(error);
        });
    }  
    render(){
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        };
        return(
            <View>
                <ImageBackground
                    source={require('../SourceImage/LoginBackground.jpg')} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height }}>
                    <View style = {{alignContents: 'center', flexDirection: 'column', alignItems: 'center', marginTop: 50}}>
                        <Header ></Header>
                        <View style={{ alignContents: 'center', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
                            <View style={{ width: 367, height: 42, backgroundColor: '#21B341', borderRadius: 13 }}>
                                <TextInput
                                    placeholder="Số điện thoại"
                                    style={{ fontFamily: 'Verdana', fontStyle: "normal", fontWeight: "normal", fontSize: 15, lineHeight: 18, display: "flex", alignItems: "center", textAlign: "center", color: 'rgba(233,218,218,0.5)' }}
                                    onChangeText={(username) => this.setState({ username: username })}
                                    value={this.state.username}

                                />
                            </View>

                            <View
                                style={{
                                    width: 367,
                                    height: 42,
                                    backgroundColor: '#AA9B15',
                                    borderRadius: 13,
                                    marginTop: 20
                                }}>
                                <TextInput
                                    placeholder="Mật khẩu"
                                    secureTextEntry={true}
                                    style={{ fontFamily: 'Verdana', fontStyle: "normal", fontWeight: "normal", fontSize: 15, lineHeight: 18, display: "flex", alignItems: "center", textAlign: "center", color: 'rgba(233,218,218,0.5)' }}
                                    onChangeText={(text) => this.setState({ password: text })}
                                    value={this.state.password}
                                ></TextInput>
                            </View>

                            <View style={{ width: 208, height: 42, marginTop: 20, alignSelf: 'flex-end' }}>
                                <Text style={styles.text, { width: 208, height: 42, color: '#C22828', textDecorationLine: 'underline', textAlign: "center", fontStyle: 'italic', fontWeight: 'bold' }}>Đăng nhập bằng email</Text>
                            </View>
                        </View>
                    <TouchableOpacity
                            onPress = {() => {
                             
                                <View style={{ flex: 1, paddingTop: 20 }}
                                >
                                    <FlatList
                                        data={this.state.username,this.state.password}
                                        renderItem={({ item }) => <Text>{item.phone}, {item.password}</Text>}
                                        // keyExtractor={({ id }, index) => id}
                                    />
                                </View>
                            //ToastAndroid.show(this.state.password, ToastAndroid.SHORT);
                        }}>
                        <LoginButton></LoginButton>
                    </TouchableOpacity>
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

class LoginButton extends Component{
    render(){
        return(
        
            <View style={{width: 208, heigth: 42, backgroundColor: '#D54646', borderRadius: 21}}>
                <Text style={styles.text, { color: '#FFFFFF', fontWeight: "bold", width: 208, height: 42, fontSize: 16, textAlignVertical: "center",textAlign: "center"}}>Đăng nhập</Text>
            </View>
        );
    }
}

class ForgotPassword extends Component{
    render(){
        return(
            <View style ={{width: 208, height: 42, marginTop: 10}}>
                <Text style={styles.text, {color: '#FFFFFF', fontSize: 12, lineHeight: 14, textDecorationLine: 'underline', textAlign: 'center'}}>Quên mật khẩu</Text>
            </View>
        );
    }

}

class NotHaveAccount extends Component{
    render() {
        return (
            <View style={{width: 367, heigth: 42, backgroundColor: '#0B76C5', borderRadius: 13}}>
                <Text style={styles.text, {color: '#FFFFFF', width: 358, height: 42, fontSize: 14, textAlignVertical: "center",textAlign: "center"}}>
                    Bạn chưa có tài khoản. 
                        <Text style={{fontWeight: "bold", textDecorationLine: 'underline', lineHeight: 14}}>Đăng ký</Text>
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

