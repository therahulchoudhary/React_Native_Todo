import React,{Component} from 'react';
import {Text,
    View,
    TouchableOpacity,
    AsyncStorage,StyleSheet,
    FlatList,Modal,
    TouchableHighlight
} from 'react-native';
import FormButton from '../../components/FormButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FormTextInput from '../../components/FormTextInput';

interface props{
    navigation:any
}

interface state{
    loggedUsername : {
        name:string,
        email:string,
        password:string,
    },
    modalVisible:boolean,
}

const mockData = [
    {title:'todo 1'},
    {title:'todo 2'},
    {title:'todo 3'},
    {title:'todo 4'},
    {title:'todo 5'},
    {title:'todo 6'},
    {title:'todo 7'},
]

export default class Tasks extends Component<props,state>{
    constructor(props : props){
        super(props);
        this._retrieveData('loggedUser');
        this.state = {
            loggedUsername : {
                name:'',
                email:'',
                password:''
            },
            modalVisible:false,
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
    add = () => {
        
    };
    getListItem(item:any) {
        return (
          <View style={styles.taskItem}>
            <Text>{item.title}</Text>
          </View>
        );
    };
    setModalVisible(visible:boolean) {
       this.setState({modalVisible: visible});
    };
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.mainHeading}>Welcome {this.state.loggedUsername.name}</Text>
                    <TouchableOpacity onPress={()=>this.logout()}>
                        <Text style={styles.logoutButton} ><MaterialIcon name="logout" size={35}/></Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={mockData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item,index }) => this.getListItem(item)}
                />
                <View style={styles.addButton}>
                    <FormButton value="+" clickEvent={()=>this.setModalVisible(true)}/>
                </View>
                <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}>
                    <View style={{flex:1,justifyContent:'center'}}>
                        <View style={styles.popupModal}>
                            <FormTextInput 
                            secure={false}
                            inputPlaceholder="Enter Task"
                            name="Task"
                            returnKeyLabel="next"
                            errorMessage="Invalid"
                            updateState={this.add}/>
                            <FormButton value="Add" clickEvent={()=>this.add}/>
                            <TouchableHighlight
                                onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                                }} style={{position:'absolute',right:10,top:10}}>
                                <Text>
                                    <Icon name="close" size={15}/>
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container : {
        flex:1,
        justifyContent:'center',
        overflow:'scroll'
    },
    header : {
        flexGrow:1,
        borderBottomWidth:0.5,
        flexDirection:'row',
        paddingHorizontal:25,
        paddingVertical:20,
        justifyContent:'space-between'
    },
    mainHeading : {
        fontSize:20,
        fontWeight:'bold',
        color:'#225E9C',
        textAlignVertical:'center'
    },
    logoutButton : {
        textAlignVertical:'center',
    },
    addButton : {
        position:'absolute',
        bottom:10,
        right:10,
    },
    taskItem : {
        paddingVertical:40,
        borderRadius:5,
        // backgroundColor:'blue',
        borderBottomWidth:0.5,
        paddingHorizontal:15,
        color:'white',
    },
    popupModal: {
        width:"70%",
        paddingVertical:20,
        backgroundColor:'white',
        marginHorizontal:'15%',
        elevation:10,
        borderRadius:15,
    }
});