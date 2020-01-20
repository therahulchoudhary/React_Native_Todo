import { Component } from "react";
import React from 'react';
import { StyleSheet, TextInput,View,Text } from "react-native";

interface props{
  inputPlaceholder:string;
  returnKeyLabel : any;
  secure:boolean;
  name:string;
  updateState : (value : string,name : string) => void;
  errorMessage : string;
}
interface state{
  text: string;
}

class FormTextInput extends Component<props, state>{
  constructor(props:props){
    super(props);
    this.state = {text : ''}
  }
  changeInputDate = (val : string,name: string) => {
    this.setState({text : val});
    this.props.updateState(val,name);
  }
  render(){
    return (
      <View>
        <TextInput 
        style={styles.inputField} 
        placeholder={this.props.inputPlaceholder} 
        secureTextEntry={this.props.secure}
        onChangeText={(text)=>this.changeInputDate(text,this.props.name)}
        returnKeyType = {this.props.returnKeyLabel}
        blurOnSubmit = {false}
        ></TextInput>
        <Text style={styles.errorMessage}>{this.props.errorMessage}</Text>
      </View>
    );
  }    
}
const styles = StyleSheet.create({
  inputField: {
    width:"80%",
    borderBottomWidth:1,
    borderColor:"rgba(240, 98, 146,1)",
    marginHorizontal: "10%",
    paddingHorizontal:15,
  },
  errorMessage: {
    width:"80%",
    marginHorizontal: "10%",
    color:"red"
  }
});

export default FormTextInput;