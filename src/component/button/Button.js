import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const Button = ({ onPress, name, style }) => (
  <TouchableOpacity style={{ ...s.button, ...style }} onPress={onPress} activeOpacity={0.75}>
    <Text style={{ ...s.button__text, ...style }}>{name}</Text>
  </TouchableOpacity>
);

const s = StyleSheet.create({
  button: {
    paddingVertical: 12,
    marginBottom: 10,

    width: 220,

    backgroundColor: '#333',
    borderRadius: 6,
  },

  button__text: {
    color: '#fff',
    textAlign: 'center',
  },
});
