import * as React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import {Card,Icon,ListItem} from 'react-native-elements';


export default class receiver extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userId:firebase.auth().currentUser.email,
            receiverId:this.props.navigation.getParam('details')['userId'],
            requestId:this.props.navigation.getParam('details')['userId'],
            Name:this.props.navigation.getParam('details')['Item'],
            Reason:this.props.navigation.getParam('details')['Reason'],
            UserName:'',
            UserAdd:'',
            UserPhone:'',
            receiverDocId:'',
            UserContact:this.props.navigation.getParam('details')['Contact'],
            
        }
    }
    getUserDetails=()=>{
        db.collection('Users').where('Email','==',this.state.receiverId).get().then(snapshot=>{
            snapshot.forEach(doc=>{
                var data = doc.data();
                this.setState({
                    UserName:data.FirstName,
                    UserAdd:data.Address,
                    UserPhone:data.Contact
                })
            })
        })
    }

    updateStatus=()=>{
        db.collection("AllBarters").add({
            'Name':this.state.Name,
            'RequestedId':this.state.requestId,
            'RequestedBy':this.state.UserName,
            'DonorId':this.state.userId,
            'NotificationStatus':'Donor Interested',
            'Contact':this.state.UserPhone,
        })
    }

    addNotification=()=>{
        var message = this.state.userName + 'Has Shown Interest To Exchange Items';
        db.collection('AllNotifications').add({
            'targetId':this.state.receiverId,
            'Date':firebase.firestore.FieldValue.serverTimeStamp(),
            'DonorId':this.state.userId,
            'Item':this.state.Name,
            'Message':message,
            'NotificationStatus':'Unread',
            'RequestId':this.state.requestId,


        })
    }

    render(){
        return(
            <View>
                <View>{
                this.state.userId !== this.state.receiverId ?(
                    
                        <TouchableOpacity onPress={()=>{
                            this.updateStatus(),
                            this.addNotification(),
                            this.props.navigation.navigate('MyBarters')
                        }}>
                            <Text>I Want To Exchange</Text>
                        </TouchableOpacity>
                    
                ):null
                      }
                </View>
            </View>
        )
    }
}