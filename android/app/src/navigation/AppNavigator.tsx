import React from 'react';

import HomeScreen from '../screens/HomeScreen';
import MyTasksScreen from '../screens/MyTasksScreen';
import PostTaskScreen from '../screens/PostTaskScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let iconUri = '';
          switch (route.name) {
            case 'Home':
              iconUri = focused
                ? 'https://img.icons8.com/ios-filled/32/2563EB/home.png'
                : 'https://img.icons8.com/ios/32/94a3b8/home.png';
              break;
            case 'MyTask':
              iconUri = focused
                ? 'https://img.icons8.com/ios-filled/32/2563EB/list.png'
                : 'https://img.icons8.com/ios/32/94a3b8/list.png';
              break;
            case 'PostTask':
              iconUri = focused
                ? 'https://img.icons8.com/ios-filled/32/2563EB/plus.png'
                : 'https://img.icons8.com/ios/32/94a3b8/plus.png';
              break;
            case 'Profile':
              iconUri = focused
                ? 'https://img.icons8.com/ios-filled/32/2563EB/user-male-circle.png'
                : 'https://img.icons8.com/ios/32/94a3b8/user-male-circle.png';
              break;
            case 'Leaderboard':
              iconUri = focused
                ? 'https://img.icons8.com/ios-filled/32/2563EB/trophy.png'
                : 'https://img.icons8.com/ios/32/94a3b8/trophy.png';
              break;
            default:
              iconUri = '';
          }
          return <Image source={{ uri: iconUri }} style={{ width: 24, height: 24 }} />;
        },
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#94a3b8',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="MyTask" component={MyTasksScreen} />
      <Tab.Screen name="PostTask" component={PostTaskScreen} />
      <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
