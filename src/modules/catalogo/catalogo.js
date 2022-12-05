import { useFocusEffect } from '@react-navigation/core';
import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import axios from 'axios';
import { useEffect } from 'react';
import Producto from './../../shared/components/producto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stylesForms from './../../styles/forms';
import { routes } from '../../shared/routes';
import { getProduct } from '../../core/services/catalogo/catalogoService';

const Catologo = (props) => {
  const [producto, setProducto] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    getProductos();
  }, []);

  const getProductos = async () => {
    try {
      const result = await AsyncStorage.getItem('@user.name_market');
      const marketId = await AsyncStorage.getItem('@market.id');
      
      setName(result);

      const response = await getProduct(marketId);

      const json = await response.data;
      const arrayProductos = [];

      json.map((product) => {
        arrayProductos.push(product);
      });
      
      setProducto(arrayProductos);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={stylesForms.contenedor}>
      <FlatList
        style={{
          marginVertical: 10,
          marginHorizontal: 10,
        }}
        data={producto}
        renderItem={(item) => <Producto datosProducto={item.item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Catologo;
