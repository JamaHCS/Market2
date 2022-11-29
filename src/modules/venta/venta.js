import { useFocusEffect } from '@react-navigation/core';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import stylesForms from './../../styles/forms';

import Scanner from './barcodeScanner';

const NuevaVenta = (props) => {
  const [scanner, setScanner] = useState(true);

  return (
    <View
      style={{
        ...stylesForms.contenedor,
        marginVertical: 20,
        paddingHorizontal: 20,
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          fontWeight: '500',
          fontSize: 20,
          textAlign: 'center',
          alignSelf: 'center',
          marginVertical: 20,
          color: '#fff',
        }}
      >
        Comenzar una venta
      </Text>

      <View style={{ flex: 1, display: scanner ? 'flex' : 'none' }}>
        <Scanner />
      </View>
    </View>
  );
};

export default NuevaVenta;
