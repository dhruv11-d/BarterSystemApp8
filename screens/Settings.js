import * as React from 'react';
import {Text,View,StyleSheet,TextInput,TouchableOpacity, Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../screens/AppHeader';

export default class settings extends React.Component{
    constructor(){
        super();
        this.state={
            email:'',
            firstName:'',
            last:'',
            address:'',
            phone:'',
            docId:''
        }
    }
    getInfo=()=>{
        var email = firebase.auth().currentUser.email;
        db.collection('Users').where('Email','==',email).get().then((snapshot)=>{
            snapshot.forEach(doc=>{
                var data = doc.data();
                this.setState({
                    email:data.Email,
                    firstName:data.FirstName,
                    last:data.LastName,
                    address:data.Address,
                    phone:data.Contact,
                    docId:doc.id
                })
            })
        })
    }
    updateList=()=>{
        db.collection('Users').doc(this.state.docId).update({
                'FirstName':this.state.firstName,
                'LastName':this.state.last,
                'Email':this.state.email,
                'Address':this.state.address,
                'Contact':this.state.phone
            
        })
        
    }
    render(){
        return(
            <View style={{backgroundColor:'#A5FFC3'}}>

                <View style={styles.update}>
                    <Text style={{textAlign:'center',
                    fontSize:50
                }}>Update List</Text>
                </View>

                <View style={styles.bac}>

                <TextInput
                placeholder="First Name"
                maxLength={10}
                onChangeText={(text)=>{
                    this.setState({
                        firstName:text
                    })
                }}
                value={this.state.firstName}
                style={styles.first}
                />
                <TextInput
                placeholder="Last Name"
                maxLength={10}
                onChangeText={(text)=>{
                    this.setSta({
                        last:text
                    })
                }}
                value={this.state.last}
                style={styles.first}
                />
                <TextInput
                placeholder="Email Id"
                keyboardType="email-address"
                onChangeText={(text)=>{
                    this.setState({
                        email:text
                    })
                }}
                value={this.state.email}
                style={styles.first}
                />
                <TextInput
                placeholder="Contact no."
                keyboardType="numeric"
                onChangeText={(text)=>{
                    this.setState({
                        phone:text
                    })
                }}
                value={this.state.phone}
                style={styles.first}
                />
                <TextInput
                placeholder="Address"
                multiline={true}
                onChangeText={(text)=>{
                    this.setState({
                        address:text
                    })
                }}
                value={this.state.address}
                style={styles.first}
                />
                </View>

                <TouchableOpacity onPress={()=>{this.updateList()}}
                style={styles.save}
                >
                    <Text style={{textAlign:'center',
                    fontWeight:'bold',
                    fontSize:25
                }}>Save</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    bac:{
        paddingTop:200,
        paddingBottom:490,
        marginTop:-120
    },
    first:{
        borderColor:'white',
        borderRadius:10,
        borderWidth:2,
        width:290,
        textAlign:'center',
        justifyContent:'center',
        alignSelf:'center',
        marginTop:7,
        fontSize:25,
        padding:4
    },
    save:{
        marginTop:-330,
        paddingBottom:0,
        justifyContent:'center',
        alignSelf:'center',
        borderRadius:8,
        borderWidth:2,
        borderColor:'#A22699',
        width:190,
        
        
    },
    update:{
        backgroundColor:'yellow',
        justifyContent:'center',
        marginTop:50,
        alignSelf:'center',
        borderRadius:20,
        width:500,
        
    }
})