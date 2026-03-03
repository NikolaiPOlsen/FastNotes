import { Colors } from '@/constants/colors';
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: Colors.primary }}>
      <Tabs.Screen name={'home'} options={{ headerShown: false, tabBarLabel: 'Home', tabBarIcon: ({ color, size }) => <Ionicons name="home" color={Colors.primary} size={24}/> }} />
      <Tabs.Screen name={'newNoteScreen'} options={{ headerShown: true, title: 'New note', tabBarLabel: 'New', tabBarIcon: ({ color, size }) => <Ionicons name="add-circle-outline" color={Colors.primary} size={30}/> }}/>
      <Tabs.Screen name={'user'} options={{ headerShown: false, tabBarLabel: "Profile", tabBarIcon: ({ color, size }) => <Ionicons name="person" color={Colors.primary} size={24}/> }}/>
    </Tabs>
  );
}
