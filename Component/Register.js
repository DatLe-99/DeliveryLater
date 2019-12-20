import React, { Component } from 'react';
import {Dimensions, Text, View, Image,TextInput, StyleSheet, TouchableOpacity, FlatList, ToastAndroid, ImageBackground } from 'react-native';
import PasswordInputText from 'react-native-hide-show-password-input';
var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

export default class Register extends Component{
    render(){
        return(
            <View>
                <ImageBackground
                    source={require('../SourceImage/LoginBackground.jpg')} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height }}>
                    <View style = {{alignContents: 'center', flexDirection: 'column', alignItems: 'center', marginTop: 50}}>
                        <Header></Header>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}


class Header extends Component{
    render(){
        return(
            <View style ={styles.header}>
                <Text style = {styles.header}>
                    Đăng Ký
                </Text>
            </View>
        );
    }
}