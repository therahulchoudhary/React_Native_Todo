import { Component } from "react";
import React from 'react';
import {StyleSheet,ScrollView,View,Text,TouchableOpacity,StatusBar,AsyncStorage} from 'react-native';
import FormTextInput from '../components/FormTextInput';
import FormButton from "../components/FormButton";
import LogoComponent from "../components/LogoComponent";
import { string } from "prop-types";

interface props{
  navigation: any;
}
interface state{
  inputFields : {
    name : string,
    password : string,
    email : string
  },
  errors : {
    email : string,
    password : string,
    auth : string,
  },
  userInfo : {
    email: string,
    password : string,
    name : string,
    loggedIn : boolean,
  }
}

const validEmailRegex = RegExp(
	/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

class Login extends Component<props, state>{
  constructor(props : props){
    super(props);
    this.state = {
      inputFields : {
        name : '',
        email : '',
        password : ''
      },
      errors : {
        email : '',
        password : '',
        auth : ''
      },
      userInfo : {
        email : '',
        password : '',
        name: '',
        loggedIn : false,
      }
    }
    this._retrieveData('loggedUser');
  }
  _retrieveData = async (arg :string) => {
    try {
      const value = await AsyncStorage.getItem(arg);
      if (value !== null) {
        if(arg=='loggedUser'){
          this.props.navigation.navigate('TaskScreen');
        }
        else{
          this.setState({userInfo : JSON.parse(value)});
        }
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  getInputValues = (val : string,name : string) => {
    let obj = this.state.inputFields;
    let errorObj = this.state.errors;
    if(name == "email"){
        obj.email = val;
        this.setState({inputFields : obj});
        if(val==''){       
            errorObj.email = 'Email is required';
            this.setState({errors:errorObj});         
        }
        else{
            errorObj.email =validEmailRegex.test(val) ? "" : "Email is not valid!";
            this.setState({errors:errorObj});
        }
    }
    else{
        obj.password = val;
        this.setState({inputFields : obj});
        if(val==''){       
            errorObj.password = 'Password is required';
            this.setState({errors:errorObj});         
        }
        else{
            errorObj.password = '';
            this.setState({errors:errorObj});
        }
    }
  }
  createFields(val:any){
    const form = [];
    for(let i=0;i<val.length;i++){
      form.push(<FormTextInput 
        name={val[i].name}
        inputPlaceholder={val[i].inputPlaceholder}
        returnKeyLabel={val[i].returnKeyLabel}
        secure={val[i].secure}
        updateState={val[i].updateState}
        errorMessage={val[i].errorMessage}/>)
    }
    return form;
  }
  validateForm(){
    let errorObj = this.state.errors;
    let isvalid = true;
    if(this.state.inputFields.email==''){
        errorObj.email = 'Email is required';
        this.setState({errors:errorObj}); 
        isvalid = false;
    }
    if(this.state.inputFields.password==''){
        errorObj.password = 'Password is required';
        this.setState({errors:errorObj}); 
        isvalid = false;
    }
    return isvalid;
  }
  _storeData = async () => {
    try {
        await AsyncStorage.setItem('loggedUser',JSON.stringify(this.state.userInfo));
    } catch (error) {
        // Error saving data
    }
  }
  submitForm = () => {
    this._retrieveData('userData');
    if(this.validateForm()==true){
      if(this.state.userInfo.email == this.state.inputFields.email && this.state.userInfo.password == this.state.inputFields.password){
        this.props.navigation.navigate('TaskScreen');
        this._storeData();
      }
      else {
        let obj = this.state.errors;
        obj.auth = "Invalid Email or Password";
        this.setState({errors : obj});
      }
    }
  }
  render(){
    const fields = [
      {name:"email",inputPlaceholder:"Email",secure:false,updateState:this.getInputValues,returnKeyLabel:"next",errorMessage:this.state.errors.email},
      {name:"password",inputPlaceholder:"********",secure:true,updateState:this.getInputValues,returnKeyLabel:"done",errorMessage:this.state.errors.password}
    ];
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#225E9C"/>
        <View style={styles.form}>
            <LogoComponent/>
            <Text style={{fontSize:30,textAlign:'center',fontWeight:'bold',color:'#225E9C',paddingVertical:5}}>To<Text style={{fontWeight:"normal",}}>Do</Text></Text>
            {this.createFields(fields)}
            <Text style={styles.errorMessage}>{this.state.errors.auth}</Text>
            <FormButton value="Login" clickEvent={this.submitForm}/>
            <TouchableOpacity>
              <Text 
              style={styles.newRegister} 
              onPress={() => this.props.navigation.navigate('SignupScreen')}
              >Don't Have an Account?
              </Text>
              <Text></Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center'
  },
  form: {
    borderRadius:25,
    width:"90%",
    marginHorizontal:"5%",
    backgroundColor:"white",
    paddingTop:30,
    elevation:5,
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
  },
  errorMessage: {
    width:"80%",
    marginHorizontal : "10%",
    color:"red"
  }
});

export default Login;