import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigator = useNavigation();
  return (
    <View style={{ padding: 20, paddingTop: 60, backgroundColor: '#1e1e1e', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontStyle: 'italic', fontSize: 22, color: '#fff' }}>{title}</Text>
        <TouchableOpacity onPress={() => { navigator.navigate('Profile'); }}>
          <Ionicons name="person-circle-outline" size={39} color="#f90" />
        </TouchableOpacity>
      </View>
      {title === 'Noticias' && (
        <View style={{ marginTop: 10, backgroundColor: '#333', borderRadius: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
          <Ionicons name="search" size={20} color="#aaa" />
          <TextInput placeholder="Buscar" placeholderTextColor="#aaa" style={{ flex: 1, color: '#fff', marginLeft: 10 }} />
        </View>
      )}
    </View>
  );
};

export default Header;
