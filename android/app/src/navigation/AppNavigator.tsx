import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import MyTasksScreen from '../screens/MyTasksScreen';
import PostTaskScreen from '../screens/PostTaskScreen';
import ProfileScreen from '../screens/ProfileScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AppNavigator(){
    return(
        <Stack.Navigator initialRouteName = "Home">
            <Stack.Screen name = "Home" component={HomeScreen} options={{headerShown:true}} />
            <Stack.Screen name = "MyTask" component={MyTasksScreen} options={{headerShown:false}} />
            <Stack.Screen name = "PostTask" component={PostTaskScreen} options={{headerShown:false }}/>
            <Stack.Screen name = "Profile" component={ProfileScreen} options={{headerShown:false}} />
        </Stack.Navigator>
    )
}