import {
  Dimensions,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  ImageBackground  
} from "react-native";
var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

import { StackNavigator } from "react-navigation";

export default class RegisterProfile extends Component{
  render(){
      return(
          <View>
              <ImageBackground
                  source={require('../SourceImage/LoginBackground.jpg')} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height }}>
                  <View style = {{alignContents: 'center', flexDirection: 'column', alignItems: 'center', marginTop: 50}}>
                      <Header></Header>
                      <BoxFullName></BoxFullName>
                      <BoxDateOfBirth></BoxDateOfBirth>
                      <BoxGender></BoxGender>
                      <BoxAddress></BoxAddress>
                      <ConfirmButton></ConfirmButton>
                  </View>
              </ImageBackground>
          </View>
      );
  }

  class Header extends Component{
    render(){
        return(
            <View style ={styles.header}>
                <Text style = {styles.header}>
                    Hoàn tất đăng ký
                </Text>
            </View>
        );
    }
}

  class BoxFullName extends Component{
    render(){
        return(
            <View style ={{
              width: 367, 
              height: 42, 
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              marginTop: 20
              }}>
                <TextInput placeholder= "Họ và tên" style={{fontFamily: 'Verdana', fontStyle:"normal", fontWeight: "normal", fontSize: 15, lineHeight: 18, display: "flex", alignItems: "center", textAlign: "center", color: 'rgba(0, 0, 0, 0.5)'}}>
                </TextInput>                
            </View>
        );
    }
}

class BoxDateOfBirth extends Component{
  render(){
      return (
        <View style={{
            width: 367,
            height: 42,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',            
            marginTop: 20
          }}>
          <TextInput placeholder= "Ngày, tháng, năm sinh" style={{fontFamily: 'Verdana', fontStyle:"normal", fontWeight: "normal", fontSize: 15, lineHeight: 18, display: "flex", alignItems: "center", textAlign: "center", color: 'rgba(0, 0, 0, 0.5)'}}>            
          </TextInput>
        </View>
      );
  }
}

class BoxGender extends Component{
  render(){
      return (
        <View style={{
            width: 367,
            height: 42,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',            
            marginTop: 20
          }}>
          <TextInput placeholder= "Giới tính" style={{fontFamily: 'Verdana', fontStyle:"normal", fontWeight: "normal", fontSize: 15, lineHeight: 18, display: "flex", alignItems: "center", textAlign: "center", color: 'rgba(0, 0, 0, 0.5);'}}>            
          </TextInput>
        </View>
      );
  }
}

class BoxAddress extends Component{
  render(){
      return (
        <View style={{
            width: 367,
            height: 42,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',            
            marginTop: 20
          }}>
          <TextInput placeholder= "Địa chỉ" style={{fontFamily: 'Verdana', fontStyle:"normal", fontWeight: "normal", fontSize: 15, lineHeight: 18, display: "flex", alignItems: "center", textAlign: "center", color: 'rgba(0, 0, 0, 0.5);'}}>            
          </TextInput>
        </View>
      );
  }
}

class ConfirmButton extends Component{
  render(){
      return (
          <View style={{
            width: 208, 
            heigth: 42, 
            backgroundColor: '#D54646',
            border: '1px solid #D0190D',
            borderRadius: 21
            }}>
              <Text style={styles.text, { color: '#FFFFFF', fontWeight: "bold", width: 200, height: 42, fontSize: 15,textAlignVertical: "center",textAlign: "center"}}>Hoàn tất</Text>
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