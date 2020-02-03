import React,{ Component } from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from './src/screen/Login';
import Signup from './src/screen/Signup';
import LogoComponent from './src/components/LogoComponent';
import {View} from 'react-native';
import Tasks from './src/screen/tasks ';
import { Hooks } from './src/screen/hooks';
import { Test } from './src/screen/test/test';

const Navigation = createStackNavigator(
  {
    LoginScreen : {screen:Login,navigationOptions:{title:'Login'}},
    SignupScreen : {screen:Signup,navigationOptions:{title:'Signup'}},
    TaskScreen : {screen:Tasks,navigationOptions:{title:'Tasks'}},
    HooksScreen : {screen:Hooks,navigationOptions:{title:'Hooks'}},
    TestScreen : {screen:Test,navigationOptions:{title:'Test'}}
  },
  {
    initialRouteName: 'HooksScreen',
    headerMode:'none'
  },
);
interface props{

}
interface state{
  splashVisible : boolean;
}

const AppContainer = createAppContainer(Navigation);  

class App extends Component<props,state>{
  constructor(props : props){
    super(props);
    this.state = {
      splashVisible : true,
    }
  }
  componentDidMount(){
    setInterval(() => (
      this.setState({splashVisible : false})
    ), 2000);
  }
  render(){
    if(!this.state.splashVisible){
      return <AppContainer/>
    }
    return (
      <View style={{flex:1,justifyContent:'center',alignContent:'center'}}>
        <LogoComponent/>
      </View>
    );
  }
}

export default App;