import * as React from 'react';
import {Icon,Badge,Header} from 'react-native-elements';
import {View,Text,TextInput,TouchableOpacity} from 'react-native';
import db from '../config';

export default class MyHeader extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:''
        }
    }

    numberOfNotifications=()=>{
        db.collection('AllNotifications').where('NotificationStatus','==','Unread').onSnapshot((snapshot)=>{
            var unreadNotifications = snapshot.docs.map((doc)=>doc.data());
            this.setState({
                value:unreadNotifications.length
            })
        })
    }
    componentDidMount(){
        this.numberOfNotifications();
    }


BellWithBadge=()=>{
    return(
        <View>
            <Icon name='bell' type='font-awesome' size={25} onPress={()=>{
                this.props.navigation.navigate('Notification')
            }} />
            <Badge value={this.state.value} containerStyle={{position:'dynamic', right:-3, left:-3}} />
        </View>
    )
}

MyHeader=()=>{
    return(
        <Header
        leftComponent={<Icon name='bars' type='font-awesome' size={25} onPress={()=>{
            this.props.navigation.toggleDrawer()}} />}
        centerComponent={{
            text:this.props.title,
            style:{color:'black',
            backgroundColor:'white',
            width:300,
            alignSelf:'center',
            alignItems:'center',
            justifyContent:'center',
            borderRadius:20,
            paddingLeft:60,
            paddingTop:5,
            paddingBottom:5,
            fontSize:30        
        }
        }}
        rightComponent={<this.BellWithBadge {...this.props}/>}
        backgroundColor='#EAF8FE'
        />
    )
}

}