import {Component} from 'react';
import React from 'react';
import { Text,
    View,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    AsyncStorage,
} from 'react-native';
import FormTextInput from '../components/FormTextInput';
import FormButton from '../components/FormButton';
import LogoComponent from '../components/LogoComponent';

interface props{
    navigation: any,
}

interface state{
    inputState : {
        name: string,
        email: string,
        password: string,
        loggedIn: boolean,
    },
    modalVisible : boolean,
    errors : {
        name: string,
        email: string,
        password: string,
    },
}

const validEmailRegex = RegExp(
	/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

class Signup extends Component<props,state>{
    constructor(props : props){
        super(props);
        this.state = {
            inputState : {
                name:'',
                email:'',
                password:'',
                loggedIn:false,
            },
            modalVisible : true,
            errors : {
                name: '',
                email:'',
                password:''
            },
        }
    }
    getInputValues = (val : string,name : string) => {
        let obj = this.state.inputState;
        let errorObj = this.state.errors;
        if(name == "name"){
            obj.name = val;
            this.setState({inputState : obj});
            if(val==''){       
                errorObj.name = 'Name is required';
                this.setState({errors:errorObj});         
            }
            else{
                errorObj.name = '';
                this.setState({errors:errorObj});
            }
        }
        else if(name == "email"){
            obj.email = val;
            this.setState({inputState : obj});
            if(val==''){       
                errorObj.email = 'Email is required';
                this.setState({errors:errorObj});         
            }
            else{
                errorObj.email =validEmailRegex.test(val) ? "" : "Email is not valid!";
                this.setState({errors:errorObj});
            }
        }
        else if(name == "password"){
            obj.password = val;
            this.setState({inputState : obj});
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
                errorMessage={val[i].errorMessage}
            />)
        }
        return form;
    }
    validateForm(){
        let errorObj = this.state.errors;
        let isvalid = true;
        if(this.state.inputState.name ==''){
            errorObj.name = 'Name is required';
            this.setState({errors:errorObj}); 
            isvalid = false;
        }
        if(this.state.inputState.email==''){
            errorObj.email = 'Email is required';
            this.setState({errors:errorObj}); 
            isvalid = false;
        }
        if(this.state.inputState.password==''){
            errorObj.password = 'Password is required';
            this.setState({errors:errorObj}); 
            isvalid = false;
        }
        return isvalid;
    }
    _storeData = async () => {
        try {
            await AsyncStorage.setItem('userData',JSON.stringify(this.state.inputState));
        } catch (error) {
            // Error saving data
        }
    }
    submitForm = () => {     
        let obj = this.state.inputState;   
        if(this.validateForm()==true){
            obj.loggedIn = true;
            this.setState({inputState:obj});
            this._storeData();
        }
    }
    render(){
        const fields = [
            {name:"name",inputPlaceholder:"Name",secure:false,updateState:this.getInputValues,returnKeyLabel:"next",errorMessage:this.state.errors.name},
            {name:"email",inputPlaceholder:"Email",secure:false,updateState:this.getInputValues,returnKeyLabel:"next",errorMessage:this.state.errors.email},
            {name:"password",inputPlaceholder:"********",secure:true,updateState:this.getInputValues,returnKeyLabel:"done",errorMessage:this.state.errors.password}
        ]; 
        return(
            <View style={styles.container}>
                <StatusBar backgroundColor="#225E9C"/>
                <View style={styles.form}>
                        <LogoComponent/>
                        <Text style={{fontSize:30,textAlign:'center',fontWeight:'bold',color:'#225E9C',paddingVertical:5}}>To<Text style={{fontWeight:"normal",}}>Do</Text></Text>
                        {this.createFields(fields)}
                        <FormButton value="Signup" clickEvent={this.submitForm}/>
                        <TouchableOpacity>
                            <Text style={styles.newRegister} onPress={()=>this.props.navigation.navigate('LoginScreen')}>Already have an account?</Text>
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
        paddingTop:40,
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
        paddingVertical:33,
    }
});
export default Signup;