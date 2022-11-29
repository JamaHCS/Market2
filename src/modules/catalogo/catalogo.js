import { useFocusEffect } from '@react-navigation/core';
import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import axios from 'axios';
import { useEffect } from 'react';
import Producto from './../../shared/components/producto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stylesForms from './../../styles/forms';
import { routes } from '../../shared/routes';

const Catologo = (props) => {
  const [producto, setProducto] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    getProductos();
  }, []);

  const getProductos = async () => {
    try {
      console.log('------------------ catalogo -----------------');
      const result = await AsyncStorage.getItem('@user.name_market');
      const marketId = await AsyncStorage.getItem('@market.id');
      console.log('market??', marketId);
      
      setName(result);
      console.log('market: ', name);

      const response = await axios.get(
        `${routes.products}?market=${marketId}`
      );
      const json = await response.data;
      const arrayProductos = [];
      json.map((product) => {
        arrayProductos.push(product);
      });
      console.log(producto);
      setProducto(arrayProductos);
    } catch (e) {
      console.log(e);
    }
  };

  // useFocusEffect(() => {
  //   props.navigation.setOptions({
  //     title: 'Catálogo de ' + name,
  //   });
  // });

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
