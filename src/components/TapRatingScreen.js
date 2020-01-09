//This is an example code to make a Star Rating Bar // 
import React, { Component } from 'react';
//import react in our code. 
import {
  StyleSheet,
  View,
  Platform,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
//import all the components we are going to use.

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class Myapp extends Component {
  constructor() {
    super();
    this.state = {
      Default_Rating: 3,
      //To set the default Star Selected
      Max_Rating: 5,
      //To set the max number of Stars
    };
    //Filled Star. You can also give the path from local
    this.Star = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';

    //Empty Star. You can also give the path from local
    this.Star_With_Border = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
  }
  UpdateRating(key) {
    this.setState({ Default_Rating: key });
    //Keeping the Rating Selected in state
    this.props.onChangeNumberStar(key);
  }
  render() {
    let React_Native_Rating_Bar = [];
    //Array to hold the filled or empty Stars
    for (var i = 1; i <= this.state.Max_Rating; i++) {
      React_Native_Rating_Bar.push(
        <TouchableOpacity
          activeOpacity={0.7}
          key={i}
          onPress={this.UpdateRating.bind(this, i)}>
          {i > this.state.Default_Rating && this.state.Default_Rating == 1 &&
            <FontAwesomeIcon name = "star-o" color = "#F94449" size = {30} /> }
          
          {i > this.state.Default_Rating && this.state.Default_Rating == 2 &&
          <FontAwesomeIcon name = "star-o" color = "#FE9805" size = {30} /> }

          {i > this.state.Default_Rating && this.state.Default_Rating == 3 &&
          <FontAwesomeIcon name = "star-o" color = "#FFC301" size = {30} /> }

          {i > this.state.Default_Rating && this.state.Default_Rating == 4 &&
          <FontAwesomeIcon name = "star-o" color = "#279EF9" size = {30} /> }

          {i > this.state.Default_Rating && this.state.Default_Rating == 5 &&
          <FontAwesomeIcon name = "star-o" color = "#4BAD55" size = {30} /> }
          
          {i <= this.state.Default_Rating && this.state.Default_Rating == 1 &&
            <FontAwesomeIcon name = "star" color = "#F94449" size = {30} /> }

          {i <= this.state.Default_Rating && this.state.Default_Rating == 2 &&
          <FontAwesomeIcon name = "star" color = "#FE9805" size = {30} /> }

          {i <= this.state.Default_Rating && this.state.Default_Rating == 3 &&
          <FontAwesomeIcon name = "star" color = "#FFC301" size = {30} /> }

          {i <= this.state.Default_Rating && this.state.Default_Rating == 4 &&
          <FontAwesomeIcon name = "star" color = "#279EF9" size = {30} /> }

          {i <= this.state.Default_Rating && this.state.Default_Rating == 5 &&
          <FontAwesomeIcon name = "star" color = "#4BAD55" size = {30} /> }
          
        </TouchableOpacity>
      );
    }
    return (
      <View style={this.props.style}>
        {this.state.Default_Rating == 1 &&
          <Text style = {styles.captionStar1}>Terrible</Text>}

          {this.state.Default_Rating == 2 &&
          <Text style = {styles.captionStar2}>Bad</Text>}

          {this.state.Default_Rating == 3 &&
          <Text style = {styles.captionStar3}>Good</Text>}

          {this.state.Default_Rating == 4 &&
          <Text style = {styles.captionStar4}>Amazing</Text>}

          {this.state.Default_Rating == 5 &&
          <Text style = {styles.captionStar5}>Out of the mood</Text>}

        {/*View to hold our Stars*/}
        <View style={styles.childView}>{React_Native_Rating_Bar}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  childView: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 5,
  },
  button: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
    padding: 15,
    backgroundColor: '#8ad24e',
  },
  StarImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 23,
    color: '#000',
    marginTop: 15,
  },
  textStyleSmall: {
    textAlign: 'center',
    fontSize: 16,

    color: '#000',
    marginTop: 15,
  },
  captionStar1: {
    color: '#F94449',
    textAlign: "center",
    paddingTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  captionStar2: {
    color: '#FE9805',
    textAlign: "center",
    paddingTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  captionStar3: {
    color: '#FFC301',
    textAlign: "center",
    paddingTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  captionStar4: {
    color: '#279EF9',
    textAlign: "center",
    paddingTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  captionStar5: {
    color: '#4BAD55',
    textAlign: "center",
    paddingTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
});