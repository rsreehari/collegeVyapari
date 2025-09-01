import React from 'react';
import {SafeAreaView,
       Image,
       Button,
       ScrollView,
       View,
       TouchableOpacity,
       Text, 
       StyleSheet,
       StatusBar} from 'react-native';





export default function HomeScreen(){
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={"#2E3A59"} barStyle={"light-content"} />
                <View style={styles.header}>

                    <Text style={styles.headerTitle}>Welcome to the app</Text>
                </View>
                <Button style={styles.button} title='Post a task'>
                </Button>



           

                 </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container :{
        flex :1,
        backgroundColor :"#F5F6FA",

    },
    text :{
        color : "black",
        fontSize : 30,
    },
    header :{
        backgroundColor :"#2E3A59",
        paddingVertical:20,
        paddingHorizontal:24,
        paddingTop:70,
    },

    headerTitle :{
        color :"white",
        fontSize : 22,
        fontWeight :"bold",
    },


    title :{
        fontSize : 18,
        color :"#333",
        margin:20,
    },
    button :{
        alignContent :"center",
        justifyContent :"center",
    },
});