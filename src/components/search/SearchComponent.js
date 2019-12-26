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
    ToastAndroid,
    RefreshControl
} from 'react-native';

import { WINDOW_SIZE } from '../../utils/scale';
import { FONT_SIZE } from '../../utils/fontsize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/AntDesign';
import { searchAction } from '../../redux/action';



class SearchComponent extends Component {
    constructor(props) {
        super(props);
        this.state ={
            listRestaurant: '',
            searchQuery: '',
            isLoading: false,
            refreshing: false,
        }
        this.data = this.props.navigation.getParam('listRestaurant')
    }

    pressReturnSearchKey = () => {
        if (!this.state.isLoading) {
            this.setState({ isLoading: true });
            this.props
                .searchAction({
                    name: this.state.searchQuery,
                })
                .then(() => {
                    this.setState({ isLoading: false });
                    if (this.props.searchData.success) {
                        this.setState({ isLoading: false });
                        this.setState({refreshing: true})
                        this.onRefresh()
                    } else {
                        this.setState({ isLoading: false });
                        this.alertMessage(this.props.searchData.errorMessage);
                    }
                });
        }
    }

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
            { cancelable: false },
        );
    };

    onRefresh = () =>{
        this.data = this.props.searchData.dataRes
        this.setState({refreshing: false})
    }
    

    render() {
        return (
        <View style = {{flexDirection: "column", flex: 1, alignContent: "center"}}> 
            <SearchBox style={{flex: 0.1}}
                    onSubmitEditing={() => {
                        this.pressReturnSearchKey()
                    }}
                    onChangeSearchQuery={text => {
                        this.setState({ searchQuery: text });
                    }}
                    onPressBack={() => this.props.navigation.navigate("Home")}
            ></SearchBox>
            <View style={{ flex: 0.8 }}>
                <FlatList
                    data={this.data}
                    renderItem={({ item }) => <RestaurantItem res={item} />}
                    keyExtractor={item => item.id}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.props.onRefresh}
                        />
                    }
                />
            </View>
        </View>
        );
    }
}

function RestaurantItem({res}){
    return(
        <View style={{flexDirection: "row", flex: 1}}>
            <Image
                style={{ flex: 0.25, width: 100, height: 100, margin: 10, borderRadius: 10}}
                source={require('../../media/images/test.jpg')}
            />
            <View style={{ flex: 0.6 }}>
                <View style={{ flexDirection: 'column', flex: 1 , margin: 5}}>
                    <View style = {{flex: 0.1}}/>
                    <Text style={{ flex: 0.3, fontFamily: 'Verdana', fontSize: 15, lineHeight: 17, alignItems: 'center', alignContent: "center", color: '#000000' }}>{res.name}</Text>
                    <Text style={{ flex: 0.3, fontFamily: 'Verdana', fontWeight: 'normal', fontSize: 12, lineHeight: 14, alignItems: 'center', alignContent: "center", color: 'rgba(0,0,0,0.7)' }}>{res.store_location.address + ", " + res.city + ", " + res.province}</Text>
                    <Text style={{ flex: 0.3, fontFamily: 'Verdana', fontWeight: 'normal', fontSize: 12, lineHeight: 14, alignItems: 'center', alignContent: "center", color: '#000000' }}>Giá: ~50k</Text>
                </View>
            </View>
            <View style={{ flex: 0.15 }}>
                <View style={{ flexDirection: 'column', flex: 1 }}>
                    <View style ={{flex: 0.6}}></View>
                    <Text style={{ flex: 0.2, alignItems: "flex-end", fontFamily: 'Verdana', fontSize: 11, fontWeight: 'normal', fontStyle: 'normal', color: 'rgba(0,0,0,0.7)' }}>>2.5 km</Text>
                    <View style={{ flex: 0.2, }}>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <Text style={{alignItems: "flex-end", fontFamily: 'Verdana', fontSize: 11, fontWeight: 'normal', fontStyle: 'normal', color: 'rgba(0,0,0,0.7)' }}>> 30p</Text>
                            <Image
                                style={{ width: 12, height: 12, margin: 5, borderRadius: 10 }}
                                source={require('../../media/images/test.jpg')}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>        
    );
}

class SearchBox extends Component {
    render() {
        return (
            <View
                style={{
                    marginTop: 20,
                    flexDirection: 'row',
                    // flex: 0.05,
                    backgroundColor: '#FFFFFF',
                }}>
                <TouchableOpacity
                    onPressBack = {this.props.onPressBack}
                    style={{ flex: 0.1, alignSelf: 'center' }}>
                    <Icon name="left" size={30} color="#000000" />
                </TouchableOpacity>
                <View
                    style={{
                        flex: 0.8,
                        borderRadius: 20,
                        borderColor: '#000000',
                        shadowColor: 'rgba(0,0,0,0.25)',
                        borderWidth: 1,
                        alignSelf: 'center',
                        justifyContent: 'center',
                    }}>
                    <TextInput
                        placeholder="Tìm kiếm nhà hàng món ăn"
                        style={{
                            fontFamily: 'Verdana',
                            fontStyle: 'normal',
                            fontWeight: 'normal',
                            fontSize: 15,
                            lineHeight: 18,
                            display: 'flex',
                            alignItems: 'center',
                            textAlign: 'center',
                            color: 'rgba(233,218,218,1)',
                        }}
                        onChangeText={this.props.onChangeSearchQuery}
                        onSubmitEditing={this.props.onSubmitEditing}
                    />
                </View>
                <TouchableOpacity
                    onPress={this.props.onPressNoti}
                    style={{ flex: 0.1, alignSelf: 'center'}}>
                    <Icon name= "filter" size={30} color="#900" />
                </TouchableOpacity>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        searchData: state.SearchReducer,
    };
}

function dispatchToProps(dispatch) {
    return bindActionCreators(
        {
            searchAction,
        },
        dispatch,
    );
}

export default connect(mapStateToProps, dispatchToProps)(SearchComponent);
