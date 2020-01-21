import { Component } from "react";
import React from 'react';
import { StyleSheet,View,TouchableOpacity,Text, Image } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

interface props{
}

interface state{
}

class LogoComponent extends Component<props, state>{
  constructor(props:props){
    super(props);
  }
  render(){
    return (
      <View style={styles.container}>
          {/* <Image style={{height:50,width:50}} source={require('../assets/logo.png')}></Image> */}
          <Icon name="assignment" size={40} color="white"/>
      </View>
    );
  }    
}

const styles = StyleSheet.create({
    container: {
        flexGrow:1,
        backgroundColor:"#3B90FA",
        borderRadius:50,
        alignSelf:'center', 
        padding:15,
        justifyContent:'center'
    },
});

export default LogoComponent;