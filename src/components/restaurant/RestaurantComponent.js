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
    TextInput,
    ToastAndroid,
    PermissionsAndroid
} from 'react-native';

export default class RestaurantComponent extends Component{
    constructor(props){
        super(props)
        this.data = this.props.navigation.getParam('listMenu')
    }
    render(){
        return(
            <View>
                <Text>{this.data.Categories[0].Items[0].name}</Text>
                {/* Can not get this data */}
            </View>
        );
    }
}