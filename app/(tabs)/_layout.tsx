import { Colors } from '@/constants/colors';
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from 'expo-router';
import React from 'react';
import { Dimensions } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: Colors.primary, animation: 'shift' }}>
      <Tabs.Screen name={'home'} options={{ headerShown: false, tabBarLabel: 'Home', tabBarIcon: ({ color, size }) => <Ionicons name="home" color={Colors.primary} size={24}/> }} />
      <Tabs.Screen name={'discover'} options={{ headerShown: false, tabBarLabel: 'Discover', tabBarIcon: ({ color, size }) => <Ionicons name="earth" color={Colors.primary} size={24}/> }} />
      <Tabs.Screen name={'newNoteScreen'} options={{ headerShown: false, tabBarLabel: 'New', tabBarIcon: ({ color, size }) => <Ionicons name="add-circle-outline" color={Colors.primary} size={30}/>, headerStyle: { backgroundColor: Colors.background }, headerTintColor: 'black', }}/>
      <Tabs.Screen name={'search'} options={{ headerShown: false, tabBarLabel: 'Search', tabBarIcon: ({ color, size }) => <Ionicons name="search-outline" color={Colors.primary} size={24}/> }} />
      <Tabs.Screen name={'user'} options={{ headerShown: false, tabBarLabel: "Profile", tabBarIcon: ({ color, size }) => <Ionicons name="person" color={Colors.primary} size={24}/> }}/>
    </Tabs>
  );
}

const { width, height } = Dimensions.get('window');