import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function PostTaskScreen(){
return(
        <View style={styles.container}>
            <Text style={styles.hText}>Welcome to <Text style={styles.highlight}>Post Task Screen</Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        justifyContent: "center",
        alignItems: "center"
    },
    hText:{
        fontSize: 20,
        fontWeight: "normal",
        color: "#333333"
    },
    highlight:{
        fontWeight: "bold",
        color: "green",
        fontSize: 20,
        fontFamily: "fantasy"
    }
})