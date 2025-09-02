import React from 'react';
import {SafeAreaView,
       View,
       Text, 
       StatusBar} from 'react-native';

export default function TaskDetailsScreen(){
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: "#F5F6FA"}}>
            <StatusBar backgroundColor={"#2E3A59"} barStyle={"light-content"} />
                <View style={{backgroundColor: "#2E3A59", paddingVertical: 20, paddingHorizontal: 24, paddingTop: 40}}>
                    <Text style={{color: "white", fontSize: 22, fontWeight: "bold"}}>Task Details</Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20}}>
                    <Text style={{fontSize: 18, color: "#333", textAlign: 'center'}}>Task details functionality coming soon</Text>
                </View>
        </SafeAreaView>
    );
}