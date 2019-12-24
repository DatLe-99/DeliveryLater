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

class SearchComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <View>
            <Text>{'Hello'}</Text>
        </View>
        );
    }
}

function mapStateToProps(state) {
  return {};
}

function dispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, dispatchToProps)(SearchComponent);
