import React,{Component} from 'react';
import {Text,View, TouchableOpacity} from 'react-native';

interface props{
    navigation:any

}

interface state{

}

export default class Tasks extends Component<props,state>{
    render(){
        return (
            <View>
                <Text>What is this!</Text>
                <TouchableOpacity onPress={this.props.navigation.navigate('SignupScreen')}>
                        <Text>Click Me</Text>
                </TouchableOpacity>
            </View>
        );
    }
}