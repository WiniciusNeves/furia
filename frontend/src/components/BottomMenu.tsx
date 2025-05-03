import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const BottomMenu = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const handlePress = (routeName: string) => {
    if (route.name === routeName) return;
    navigation.navigate(routeName);
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 15, backgroundColor: '#1e1e1e', borderTopLeftRadius: 20, borderTopRightRadius: 20, height: 60 }}>
      <TouchableOpacity onPress={() => handlePress('Home')}>
        <Ionicons name="home-outline" size={26} color={route.name === 'Home' ? '#D87A07' : '#8F5712'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress('ChatBot')}>
        <Ionicons name="chatbubble-outline" size={26} color={route.name === 'ChatBot' ? '#D87A07' : '#8F5712'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress('Menu')}>
        <Ionicons name="menu" size={26} color={route.name === 'Menu' ? '#D87A07' : '#8F5712'} />
      </TouchableOpacity>
    </View>
  );
};

export default BottomMenu;

