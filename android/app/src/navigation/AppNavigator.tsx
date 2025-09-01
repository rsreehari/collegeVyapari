import React from 'react';

import HomeScreen from '../screens/HomeScreen';
import MyTasksScreen from '../screens/MyTasksScreen';
import PostTaskScreen from '../screens/PostTaskScreen';
import ProfileScreen from '../screens/ProfileScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
// const Tab = createNativeTabNavigator();

export default function AppNavigator(){
    return(
        <Tab.Navigator initialRouteName = "Home">
                <Tab.Screen name = "Home" component={HomeScreen} options={{headerShown:false}} />
                <Tab.Screen name = "MyTask" component={MyTasksScreen} options={{headerShown:false}} />
                <Tab.Screen name = "PostTask" component={PostTaskScreen} options={{headerShown:false }}/>
                <Tab.Screen name = "Profile" component={ProfileScreen} options={{headerShown:false}} />
        </Tab.Navigator>
    )
}