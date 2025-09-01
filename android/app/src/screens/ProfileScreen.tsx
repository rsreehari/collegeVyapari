// ProfileScreen component for CollegeVyapari app
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





export default function ProfileScreen(){
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={"#2E3A59"} barStyle={"light-content"} />
                <View style={styles.header}>

                    <Text style={styles.headerTitle}>Profile Screen</Text>
                </View>
                <Text style={styles.title}>Rest of the contrnt</Text>



           

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
        paddingTop:40,
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
});