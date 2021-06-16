import * as React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class Notifications extends React.Component{
    constructor(){
        super();
        this.state={
            userId:firebase.auth().currentUser.email,
            allNotifications:[]
        }
    }

    getNotification=()=>{
        this.notifyRef = db.collection('AllNotifications')
        .where('NotificationStatus','==','Unread')
        .where('targetId','==',this.state.userId)
        .onSnapshot((snapshot)=>{
            var allNotifications=[]
            snapshot.docs.map((doc)=>{
                var notifications = doc.data();
                notifications['docId']=doc.id();
                allNotifications.push(notifications);

            })
            this.setState({
                allNotifications:allNotifications
            })
        })
    }
    componentDidMount=()=>{
        this.getNotification();
    }

    

    keyExtractor =(item,index) => index.toString();
    renderItem=({item,i})=>(
        <ListItem
        key={i}
        title={item.Item}
        subtitle={"Requested By: "+item.RequestedBy+"NotificationStatus"+item.NotificationStatus}
        leftElement={<Icon name="Item" type='font-awesome' color="#787878"/>}
        rightElement={<TouchableOpacity>
            <Text>Send</Text>
        </TouchableOpacity>}
        />
    )
    render(){
        return(
            <View style={{flex:1,
                marginTop:170,
                alignSelf:'center',
                
            }}>
                <Text style={{fontSize:40}}>Notifications</Text>
            </View>
        )
    }
}