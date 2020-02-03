import React,{Component,FunctionComponent,useState} from 'react';
import {Text,Button, View, StyleSheet} from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

interface props {
    navigation:any
}

interface state {
    counter:number
}

const Counter:FunctionComponent<{ initial?: number }> = ({ initial = 0 }) => {
    const [clicks, setClicks] = useState(initial);
    return <>
        <Text style={{backgroundColor:'skyblue',padding:10,marginVertical:10,color:'white'}}>Clicks: {clicks}</Text>
        <TouchableNativeFeedback style={styles.Button}>
            <View>
                <Text style={{textAlign:'center'}} onPress={()=>setClicks(clicks + 1)}>+</Text>
            </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback style={styles.Button}>
            <View>
                <Text style={{textAlign:'center'}} onPress={()=>setClicks(clicks - 1)}>-</Text>
            </View>
        </TouchableNativeFeedback>
    </>
}

export class Hooks extends Component<props,state>{
    constructor(props : props){
        super(props);
        this.state = {
            counter:0
        }
        console.log("Constructor invoked");
        
    }
    componentDidMount(){
        console.log("Component Did Mount invoked");
    }
    componentDidUpdate(){
        console.log("Component Did Update invoked");
    }
    
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.hookView}>
                    <Text style={styles.heading}>Increment Decrement Counter using useState hook.</Text>
                    <Counter/>  
                </View>
                <View style={styles.hookView}>
                    <Text style={styles.heading}>Increment Decrement Counter using class state.</Text>
                    <Text style={{backgroundColor:'skyblue',padding:10,marginVertical:10,color:'white'}}>Click: {this.state.counter}</Text>
                    <TouchableNativeFeedback style={styles.Button}>
                        <View>
                            <Text style={{textAlign:'center'}} onPress={()=>this.setState({counter:this.state.counter +1})}>+</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback style={styles.Button}>
                        <View>
                            <Text style={{textAlign:'center'}} onPress={()=>this.setState({counter:this.state.counter -1})}>-</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <TouchableNativeFeedback style={styles.Button}>
                    <View>
                        <Text onPress={()=>this.props.navigation.push('TestScreen')}>Target New Screen</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    hookView:{
        padding:25,
        width:'95%',
        marginVertical:10,
        elevation:15,
        backgroundColor:'white'
    },
    heading:{
        fontSize:16,
        fontWeight:'bold'
    },
    Button: {
        padding:15,
        borderRadius:50,
        elevation:1,
        marginVertical:5
    }
});