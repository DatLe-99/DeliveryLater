import React, { Component } from 'react';
import {
    FlatList,
    View,
    Text,
    Image,
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
    ToastAndroid
} from 'react-native';

import { WINDOW_SIZE } from '../../utils/scale';
import { FONT_SIZE } from '../../utils/fontsize';
import LoginBackground from 'images/LoginBackground.jpg';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Icon from 'react-native-vector-icons/AntDesign';
import { ThemeColors } from 'react-navigation';
import { Colors } from 'react-native/Libraries/NewAppScreen';

class SearchComponent extends Component {
    constructor(props) {
        super(props);
        this.state ={
            listRestaurant: ''
        }
    }

    render() {
        return (
        <View>
            <FlatList
                data = {this.props.navigation.getParam('listRestaurant')}
                renderItem = {({item}) => <RestaurantItem res = {item}/>}
                keyExtractor={item => item.id}
            />
        </View>
        );
    }
}

function RestaurantItem({res}){
    return(
        <View style={{flexDirection: "row", flex: 1}}>
            <Image
                style={{ flex: 0.2, borderRadius: 20 }}
                source={require('../../media/images/test.jpg')}
            />
            <View style={{ flex: 0.7 }}>
                <View style={{ flexDirection: 'column', flex: 1 }}>
                    <Text style={{ flex: 0.4, fontFamily: 'Verdana', fontSize: 15, lineHeight: 17, alignItems: 'center', alignContent: "center", color: '#000000' }}>{res.name}</Text>
                    <Text style={{ flex: 0.3, fontFamily: 'Verdana', fontWeight: 'normal', fontSize: 12, lineHeight: 14, alignItems: 'center', alignContent: "center", color: 'rgba(0,0,0,0.7)' }}>{res.address + ", " + res.city + ", " + res.province}</Text>
                    <Text style={{ flex: 0.3, fontFamily: 'Verdana', fontWeight: 'normal', fontSize: 12, lineHeight: 14, alignItems: 'center', alignContent: "center", color: '#000000' }}></Text>
                </View>
            </View>
            <View style={{ flex: 0.1 }}>
                <View style={{ flexDirection: 'column', flex: 1 }}>
                    <Text style={{ flex: 0.5, alignItems: "flex-end", fontFamily: 'Verdana', fontSize: 11, fontWeight: 'normal', fontStyle: 'normal', color: 'rgba(0,0,0,0.7)' }}></Text>
                    <View style={{ flex: 0.5 }}>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <Text style={{ flex: 0.5, alignItems: "flex-end", fontFamily: 'Verdana', fontSize: 11, fontWeight: 'normal', fontStyle: 'normal', color: 'rgba(0,0,0,0.7)' }}></Text>
                            <Image
                                style={{ flex: 0.5 }}
                                source={require('../../media/images/test.jpg')}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>        
    );
}

function mapStateToProps(state) {
  return {};
}

function dispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, dispatchToProps)(SearchComponent);
