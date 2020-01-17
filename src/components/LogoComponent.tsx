import { Component } from "react";
import React from 'react';
import { StyleSheet,View,TouchableOpacity,Text, Image } from "react-native";

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
        <View style={{alignContent:'center',width:"100%"}}>
            <Image style={styles.logoImage} source={require('../assets/guava-background.png')}></Image>
        </View>
      </View>
    );
  }    
}

const styles = StyleSheet.create({
    container: {
        flexGrow:1,
        justifyContent: 'flex-start',
    },
    logoImage: {
        width:"50%",
        marginHorizontal:"25%",
        height:180,
    }
});

export default LogoComponent;