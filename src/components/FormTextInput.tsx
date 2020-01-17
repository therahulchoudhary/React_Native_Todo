import { Component } from "react";
import React from 'react';
import { StyleSheet, TextInput,View,Text } from "react-native";

interface props{
  inputPlaceholder:string;
  returnKeyLabel : any;
  secure:boolean;
  name:string;
  updateState : (value : string) => void;
}
interface state{
  text: string;
}

class FormTextInput extends Component<props, state>{
  constructor(props:props){
    super(props);
    this.state = {text : ''}
  }
  changeInputDate = (val : string) => {
    this.setState({text : val});
    this.props.updateState(val);
  }
  render(){
    return (
      <View>
        <TextInput 
        style={styles.inputField} 
        placeholder={this.props.inputPlaceholder} 
        secureTextEntry={this.props.secure}
        onChangeText={this.changeInputDate}
        returnKeyType = {this.props.returnKeyLabel}
        blurOnSubmit = {false}
        ></TextInput>
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
    marginVertical: 10,
    paddingHorizontal:15,
  },
});

export default FormTextInput;