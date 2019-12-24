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

class HomeComponent extends Component {
    constructor(props) {
        super(props);
      
        }
    
    render() {
        return (
            <ImageBackground source={LoginBackground} style={{ width: WINDOW_SIZE.WIDTH, height: WINDOW_SIZE.HEIGHT }}>
                <View style={{ alignContents: 'center', flexDirection: 'column', alignItems: 'center', marginTop: 50 }}>

                 <Text>Hello World</Text>

                </View>
            </ImageBackground>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

function dispatchToProps(dispatch) {
    return bindActionCreators({
      
    }, dispatch);
}

export default connect(mapStateToProps, dispatchToProps)(HomeComponent);