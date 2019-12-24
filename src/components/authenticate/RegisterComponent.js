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
    Dimensions
} from 'react-native';
var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;
import { WINDOW_SIZE } from '../../utils/scale';
import { FONT_SIZE } from '../../utils/fontsize';
import LoginBackground from 'images/LoginBackground.jpg';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {signUpAction} from '../../redux/action';

class RegisterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
      passwordConfirm: '',
      email: '',
      isLoading: false,
    };
  }

  onSignUp = () => {
    if (!this.state.isLoading) {
      this.setState({isLoading: true});
      this.props
        .signUpAction({
          phone: this.state.username,
          password: this.state.password,
          passwordConfirm: this.state.passwordConfirm,
          email: this.state.email,
        })
        .then(() => {
          this.setState({isLoading: false});
          if (this.props.signUpData.success) {
            this.setState({isLoading: false});
            this.props.navigation.navigate('Home');
          } else {
            this.setState({isLoading: false});
            this.alertMessage(this.props.signUpData.errorMessage);
          }
        });
    }
  };

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
      {cancelable: false},
    );
  };

  render() {
    return (
      <View>
        <ImageBackground
          source={LoginBackground}
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
            <BoxRegister
              onChangePhone={text => {
                this.setState({phone: text});
              }}
              onChangePassword={text => {
                this.setState({password: text});
              }}
              onChangePasswordConfirm={text => {
                this.setState({passwordConfirm: text});
              }}
              onChangeEmail={text => {
                this.setState({email: text});
              }}
            />
            <RegisterButton onPressRegister={() => this.onSignUp()} />
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
                    Đăng Ký
                </Text>
            </View>
        );
    }
}

class BoxRegister extends Component{
    render(){
        return (
          <View style = {{alignContents: 'center', flexDirection: 'column', alignItems: 'center', marginTop:20}}>
                <BoxUsername onChangeUsername={this.props.onChangeUsername} ></BoxUsername>
                <BoxPassword onChangePassword={this.props.onChangePassword}></BoxPassword>
                <BoxConfirmPassword onChangePasswordConfirm={this.props.onChangePasswordConfirm}></BoxConfirmPassword>
                <BoxEmail onChangeEmail={this.props.onChangeEmail}></BoxEmail>
                <RegisterwithEmail/>
          </View>
        );
    }
}

class BoxUsername extends Component{
    render(){
        return(
            <View style ={{width: 367, height: 42, backgroundColor: '#21B341', borderRadius: 13}}>
                <TextInput 
                onChangeText={this.props.onChangeUsername}
                placeholder= "Số điện thoại" 
                style={{fontFamily: 'Verdana', fontStyle:"normal", fontWeight: "normal", fontSize: 15, lineHeight: 18, display: "flex", alignItems: "center", textAlign: "center", color: 'rgba(233,218,218,0.5)'}}/>
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
              marginTop: 20
            }}>
            <TextInput 
            onChangeText={this.props.onChangePassword}
            placeholder= "Mật khẩu" 
            secureTextEntry={true} 
            style={{fontFamily: 'Verdana', fontStyle:"normal", fontWeight: "normal", fontSize: 15, lineHeight: 18, display: "flex", alignItems: "center", textAlign: "center", color: 'rgba(233,218,218,0.5)'}}></TextInput>
          </View>
        );
    }
}
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
            <TextInput 
            onChangeText={this.props.onChangePasswordConfirm}
            placeholder= "Xac Nhan Mật khẩu" 
            secureTextEntry={true} 
            style={{fontFamily: 'Verdana', fontStyle:"normal", fontWeight: "normal", fontSize: 15, lineHeight: 18, display: "flex", alignItems: "center", textAlign: "center", color: 'rgba(233,218,218,0.5)'}}></TextInput>
          </View>
        );
    }
}
class BoxEmail extends Component{
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
            <TextInput 
            onChangeText={this.props.onChangeEmail}
            placeholder= "Email" 
            style={{fontFamily: 'Verdana', fontStyle:"normal", fontWeight: "normal", fontSize: 15, lineHeight: 18, display: "flex", alignItems: "center", textAlign: "center", color: 'rgba(233,218,218,0.5)'}}></TextInput>
          </View>
        );
    }
}

class RegisterwithEmail extends Component{
    render(){
        return(
            <View style={{width: 208, height: 42, marginTop: 20, alignSelf: 'flex-end'}}>
                <Text style={styles.text, {width: 208, height: 42, color: '#C22828', textDecorationLine: 'underline', textAlign: "center", fontStyle: 'italic', fontWeight: 'bold'}}>Đăng Ký bằng email</Text>
            </View>
        );
    }
}

class RegisterButton extends Component{
    render(){
        return (
            <TouchableOpacity onPress={this.props.onPressRegister} style={{width: 208, heigth: 42, backgroundColor: '#D54646', borderRadius: 21}}>
                <Text style={styles.text, { color: '#FFFFFF', fontWeight: "bold", width: 208, height: 42, fontSize: 16, textAlignVertical: "center",textAlign: "center"}}>Đăng Ký</Text>
            </TouchableOpacity>
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
  
  
function mapStateToProps(state) {
  return {
    signUpData: state.SignUpReducer,
  };
}

function dispatchToProps(dispatch) {
    return bindActionCreators({
        signUpAction,
    }, dispatch);
}

export default connect(mapStateToProps, dispatchToProps)(RegisterComponent);