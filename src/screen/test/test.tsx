import React,{Component} from 'react';
import {Text, View, TouchableNativeFeedback} from 'react-native';
interface props{
    navigation:any;
}
interface state{

}

export class Test extends Component<props,state>{
    componentWillUnmount(){
        console.log("Component Will Unmount invoked");
    }
    render(){
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:24,fontWeight:'bold',color:'navy'}}>Thank you</Text>
                <TouchableNativeFeedback>
                    <View>
                        <Text onPress={()=>this.props.navigation.pop()}>Go Back</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        ) 
    }
}