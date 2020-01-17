import { Component } from "react";
import React from 'react';
import { StyleSheet,View,Text,TouchableNativeFeedback } from "react-native";

interface props{
  value:string;
}
interface state{
}

class FormButton extends Component<props, state>{
  constructor(props:props){
    super(props);
  }
  render(){ 
    return (
      <View>
        <TouchableNativeFeedback>
          <View style={styles.button}>
            <Text style={{textAlign:'center',fontSize:18,fontWeight:"bold",color:"white"}}>{this.props.value}</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }    
}

const styles = StyleSheet.create({
    button: {
        width:"80%",
        backgroundColor: "#8bc34a",
        paddingVertical: 10,
        marginHorizontal: "10%",
        justifyContent:'center',
        height:49,
        marginVertical: 10,
        borderRadius:5,
        marginTop:25,
    },
});

export default FormButton;