import { Component } from "react";
import React from 'react';
import { StyleSheet,View,Text,TouchableNativeFeedback } from "react-native";

interface props{
  value:string;
  clickEvent : () => void;
}
interface state{
}

class FormButton extends Component<props, state>{
  constructor(props:props){
    super(props);
  }
  pressButton(){
    this.props.clickEvent();
  }
  render(){ 
    return (
      <View>
        <TouchableNativeFeedback>
          <View style={styles.button}>
            <Text style={{textAlign:'center',fontSize:18,fontWeight:"bold",color:"white"}} onPress={()=>this.pressButton()}>{this.props.value}</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }    
}

const styles = StyleSheet.create({
    button: {
        width:"80%",
        backgroundColor: "#3B90FA",
        paddingVertical: 10,
        marginHorizontal: "10%",
        justifyContent:'center',
        height:49,
        marginVertical: 10,
        borderRadius:50,
        marginTop:25,
    },
});

export default FormButton;