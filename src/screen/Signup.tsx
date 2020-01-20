import {Component} from 'react';
import React from 'react';
import { Text,
    View,
    ScrollView,
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
        if(this.validateForm()==true){
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
                <StatusBar backgroundColor="#ba2d65"/>
                <ScrollView>
                    <View style={styles.form}>
                        <LogoComponent/>
                        {this.createFields(fields)}
                        <FormButton value="Signup" clickEvent={this.submitForm}/>
                        <TouchableOpacity>
                            <Text style={styles.newRegister} onPress={()=>this.props.navigation.navigate('LoginScreen')}>Already have an account?</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#ff94c2",
    },
    form: {
        flexGrow:1,
        marginTop:60,
        borderRadius:25,
        borderBottomLeftRadius:0,
        borderBottomRightRadius:0,
        width:"100%",
        backgroundColor:"white",
        paddingTop:40,
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
        paddingVertical:33,
    }
});
export default Signup;