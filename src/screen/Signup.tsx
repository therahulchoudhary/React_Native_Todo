import {Component} from 'react';
import React from 'react';

import { Text,View,ScrollView,TouchableOpacity,StyleSheet,StatusBar,Modal,Alert,TouchableHighlight } from 'react-native';
import FormTextInput from '../components/FormTextInput';
import FormButton from '../components/FormButton';
import LogoComponent from '../components/LogoComponent';

interface props{
    navigation: any,
}

interface state{
    name : string,
    email : string,
    password : string,
    modalVisible : boolean,
}

class Signup extends Component<props,state>{
    constructor(props : props){
        super(props);
        this.state = {
            name  : '',
            email  : '',
            password : '',
            modalVisible : true,
        }
    }
    updateName = (val : string) => {
        this.setState({name : val})
    }
    updateEmail = (val : string) => {
        this.setState({name : val})
    }
    updatePassword = (val : string) => {
        this.setState({name : val})
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
                />)
        }
        return form;
    }
    render(){
        const fields = [
            {name:"name",inputPlaceholder:"Name",secure:false,updateState:this.updateName,returnKeyLabel:"next"},
            {name:"email",inputPlaceholder:"Email",secure:false,updateState:this.updateEmail,returnKeyLabel:"next"},
            {name:"password",inputPlaceholder:"********",secure:true,updateState:this.updatePassword,returnKeyLabel:"done"}
        ]; 
        return(
            <View style={styles.container}>
                <StatusBar backgroundColor="#ba2d65"/>
                <ScrollView>
                    <View style={styles.form}>
                        <LogoComponent/>
                        {this.createFields(fields)}
                        <FormButton value="Signup"/>
                        <TouchableOpacity>
                            <Text style={styles.newRegister} onPress={()=>this.props.navigation.navigate('LoginScreen')}>Already have an account?</Text>
                        </TouchableOpacity>
                        {/* <TouchableHighlight onPress={() => {this.setModalInVisible(this.state.modalVisible)}}>
                            <Text>CLick for modal</Text>
                        </TouchableHighlight> */}
                    </View>
                    {/* <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                        <View style={{marginTop: 22}}>
                            <View>
                            <Text>Hello World!</Text>

                            <TouchableHighlight
                                onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>
                            </View>
                        </View>
                    </Modal> */}
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