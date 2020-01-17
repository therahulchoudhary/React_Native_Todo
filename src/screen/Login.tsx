import { Component } from "react";
import React from 'react';
import {StyleSheet,ScrollView,View,Text,TouchableOpacity,StatusBar} from 'react-native';
import FormTextInput from '../components/FormTextInput';
import FormButton from "../components/FormButton";
import LogoComponent from "../components/LogoComponent";

interface props{
  navigation: any;
}
interface state{
  email : string;
  password : string;
}
class Login extends Component<props, state>{
  constructor(props : props){
    super(props);
    this.state = {
      email : '',
      password : ''
    }
  }
  updateEmail = (val : string) => {
    this.setState({email : val});
  }
  updatePassword = (val : string) => {
    this.setState({password : val});
  }
  createFields(val:any){
    const form = [];
    for(let i=0;i<val.length;i++){
        form.push(<FormTextInput 
            name={val[i].name}
            inputPlaceholder={val[i].inputPlaceholder}
            returnKeyLabel={val[i].returnKeyLabel}
            secure={val[i].secure}
            updateState={val[i].updateState}/>)
    }
    return form;
  }
  render(){
    const fields = [
      {name:"email",inputPlaceholder:"Email",secure:false,updateState:this.updateEmail,returnKeyLabel:"next"},
      {name:"password",inputPlaceholder:"********",secure:true,updateState:this.updatePassword,returnKeyLabel:"done"}
    ];
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#ba2d65"/>
        <View style={styles.form}>
          <ScrollView>
            <LogoComponent/>
            {this.createFields(fields)}
            <FormButton value="Login"/>
            <TouchableOpacity>
              <Text 
              style={styles.newRegister} 
              onPress={() => this.props.navigation.navigate('SignupScreen')}
              >Don't Have an Account?
              </Text>
              <Text></Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#ff94c2",
  },
  form: {
    flexGrow:1,
    marginTop:60,
    borderRadius:25,
    borderBottomLeftRadius:0,
    borderBottomRightRadius:0,
    width:"100%",
    backgroundColor:"white",
    paddingTop:30,
    elevation:20,
  },
  formHeading: {
    fontSize: 42,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'verdana',
    paddingBottom: 20,
  },
  newRegister: {
    textAlign:'center',
    color:'#6d7a6e',
    paddingVertical:20,
  }
});

export default Login;