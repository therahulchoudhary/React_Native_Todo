import React,{Component,FunctionComponent,useState} from 'react';
import {Text,Button, View} from 'react-native';

interface props {

}

interface state {
    counter:number
}

const Counter:FunctionComponent<{ initial?: number }> = ({ initial = 0 }) => {
    const [clicks, setClicks] = useState(initial);
    return <>
        <Text>Clicks: {clicks}</Text>
        <Button title="+" onPress={() => setClicks(clicks+1)}>+</Button>
        <Button title="-" onPress={() => setClicks(clicks-1)}>-</Button>
    </>
}

export class Hooks extends Component<props,state>{
    constructor(props : props){
        super(props);
        this.state = {
            counter:0
        }
    }
    componentDidMount(){
        console.log("invoke");
    }
    componentDidUpdate(){
        console.log(this.state.counter);
    }
    render(){
        return(
            <View>
                <Text>Increment Decrement Counter using useState hook.</Text>
                <Counter/>
                <Text>Increment Decrement Counter using class state.</Text>
                <Text>Click: {this.state.counter}</Text>
                <Button title="+" onPress={()=>this.setState({counter:this.state.counter +1})}/>
                <Button title="-" onPress={()=>this.setState({counter:this.state.counter -1})}/>
            </View>
        );
    }
}