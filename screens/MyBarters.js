import * as React from 'react';
import {View,Text,TouchableOpacity,FlatList} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import {ListItem,Card,Icon} from 'react-native-elements';

export default class MyBarter extends React.Component{
     constructor(){
         super();
         this.state={
            userId:firebase.auth().currentUser.email,
            allBarters:[]
         }
         this.requestRef = null
     }
     getAllBarters=()=>{
         this.requestRef = db.collection('MyBarters').where('DonorId','==',this.state.userId).onSnapshot((snapshot)=>{
             var allBarters = snapshot.docs.map((doc)=>doc.data());
             this.setState({
                 allBarters:allBarters
             })
         })
     }

     keyExtractor = (item,index)=> index.toString();
     renderItem=({item,i})=>(
        <ListItem
        key={i}
        title={item.BookName}
        subtitle={'Requested By' + item.RequestedBy +'NotificationStatus'+item.RequestStatus}
        leftElement={<Icon name="Item" type="font-awesome" color="494949"/>}
        rightElement={<TouchableOpacity>
            <Text>Send Book</Text>
        </TouchableOpacity>}
        bottomDivider
        />
     )
     componentDidMount=()=>{
        this.getAllBarters();
    }

    sendBook=(bookDetails)=>{
        if (bookDetails.requestStatus === 'DonorInterested'){
            var requestStatus = 'Donor Interested';
            db.collection('AllDonations').doc(bookDetails.docId).update({
                'RequestStatus': 'Donor Interested',
            })
            this.sendNotification(bookDetails,requestStatus);
        }else{
            requestStatus = 'Item Already Sent';
            db.collection('AllNotifications').doc(bookDetails.docId).update({
                'RequestStatus':'Item Already Sent',
            })
            this.sendNotification(bookDetails,requestStatus);

        }

    }
    
    sendNotification=(bookDetails,requestStatus)=>{
        var requestId = bookDetails.RequestId;
        var donorId = bookDetails.DonorId;
        db.collection('AllNotifications')
        .where('RequestId','==',requestId)
        .where('DonorId','==',donorId)
        .get()
        .then(snapshot=>{
            snapshot.forEach((doc)=>{
                var message = '';
                if (requestStatus==='Item Already Sent'){
                    message=this.state.DonorName + ' Sent You The Item';
                }else{
                    message = this.state.DonorName  + ' Has Shown Interest To Exchange'
                }
                db.collection('AllNotifications').doc(doc.id).update({
                    'Message':message,
                    'NotificationStatus':'UnSent',
                    'Date':firebase.firestore.FieldValue.serverTimeStamp(),
                    'RequestStatus':'UnSent'
                })
                
            })
        })
    }
    

    componentWillUnmount(){
        this.requestRef();
    }
     render(){
         return(
             <View>
                 <View>
                     {
                         this.state.allBarters.length === 0?(
                             <View style={{marginTop:200,justifyContent:'center',
                             alignItems:'center'
                             }}>
                                 <Text>List Of All Barters</Text>
                             </View>
                         ):(
            <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.allBarters}
            renderItem={this.renderItem}
            />
            
                           )
                     }
            </View>

                  <TouchableOpacity onPress={()=>{this.sendBook(bookDetails)}}
                  style={{backgroundColor:item.RequestStatus==='Unsent'?'white':'green'}}
                  >
                      <Text>{item.RequestStatus==='UnSent'?'Unsent':'Send Item'}</Text>
                      </TouchableOpacity>   

             </View>
         )
     }
}