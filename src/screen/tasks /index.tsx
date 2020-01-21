import React,{Component} from 'react';
import {Text,View, TouchableOpacity,AsyncStorage} from 'react-native';

interface props{
    navigation:any
}

interface state{
    loggedUsername : {
        name:string,
        email:string,
        password:string,
    },
}

export default class Tasks extends Component<props,state>{
    constructor(props : props){
        super(props);
        this._retrieveData('loggedUser');
        this.state = {
            loggedUsername : {
                name:'',
                email:'',
                password:''
            }
        }
    }
    _retrieveData = async (arg : string) => {
        try {
          const value = await AsyncStorage.getItem(arg);
          if (value !== null) {
            this.setState({loggedUsername:JSON.parse(value)})
          }
        } catch (error) {
          // Error retrieving data
        }
    };
    _removeData = async () => {
        try {
          const value = await AsyncStorage.removeItem('loggedUser');
        } catch (error) {
          // Error retrieving data
        }
    };
    logout = () => {
        this._removeData();
        this.props.navigation.navigate('LoginScreen');
    };
    render(){
        return (
            <View>
                <Text>What is this{this.state.loggedUsername.name}</Text>
                <TouchableOpacity >
                    <Text onPress={()=>this.logout()}>Click Me</Text>
                </TouchableOpacity>
            </View>
        );
    }
}