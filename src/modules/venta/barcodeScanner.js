import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import styles from '../../styles/forms';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { routes } from '../../shared/routes';
import { errorAlert } from '../../shared/utils/alerts';
import { getBarcodeProduct, postSell } from '../../core/services/barcode/barcodeService';
/**
 * Componente que se encarga de la lógica de escaneo de productos mediante codigo de barras
 * 
 * @param  {props} props
 */
const Scanner = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [token, setToken] = useState('');
  const [relation, setRelation] = useState('');
  const [market, setMarket] = useState('');
  const [products, setProducts] = useState([]);
  const [sells, setSells] = useState();
  const [Total, setTotal] = useState();
  var arraySells = [];

  var countSells = 0;
  var countTotal = 0;

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      setSells(0);
      setTotal(0);
    })();
  }, []);

  const getSell = async () => {
    try {
      const relation_id = await AsyncStorage.getItem('@user.markets');
      setMarket(relation_id);

    } catch (e) {
      console.log(e);
    }
  };

  getSell();

  const handleBarCodeScanned = async ({ type, data }) => {
    let array = products;
    let thisTotal = Total;
    let thisSells = sells;

    setScanned(true);

    const res = await getBarcodeProduct(data);
    
    const json = await res.data;

    if (json.stock > 0) {
      if (countTotal == 0) {
        Alert.alert(
          '¡Hey!',
          `
        
        Bar code: ${data}
        Producto: ${json.name}
        Precio: ${json.price}`,
          [
            {
              text: 'Cancelar',
              onPress: () => {
                setScanned(false);
              },
            },
            {
              text: 'Agregar a la venta',
              onPress: async () => {
                try {
                  array.push({
                    quant: 1,
                    product_id: json.id,
                  });

                  setProducts(array);
                  setScanned(false);

                  // setProducts(array);
                } catch (e) {
                  console.log(e);
                  setScanned(false);
                }
              },
            },
            {
              text: 'Finalizar venta',
              onPress: async () => {
                setSells(sells ? sells + 1 : 1);
                setTotal(Total ? Total + json.price : json.price);

                try {
                  array = products;

                  array.push({
                    quant: 1,
                    product_id: json.id,
                  });

                  setProducts(array);

                  const res = await postSell(array, market);

                  if (res.status == 200) {
                    Alert.alert(
                      'Venta confirmada',
                      'Venta confirmada, continua vendiendo',
                      [
                        {
                          text: 'aceptar',
                          onPress: () => {
                            setScanned(false);
                          },
                        },
                      ]
                    );
                  }

                  setScanned(false);
                } catch (e) {
                  console.log(e);
                  setScanned(false);
                }
              },
            },
          ],
          {
            cancelable: false,
          }
        );
      } else {
        countTotal += json.price;
        countSells += 1;

        Alert.alert(
          '¡Hey!',
          `
        
          Bar code: ${data}
          Producto: ${json.name}
          Precio: ${json.price}`,
          [
            {
              text: 'Cancelar',
              onPress: () => {
                setScanned(false);
              },
            },
            {
              text: 'Agregar a la venta',
              onPress: async () => {
                try {
                  array.push({
                    quant: 1,
                    product_id: json.id,
                  });

                  setProducts(array);
                  setScanned(false);

                } catch (e) {
                  console.log(e);
                  setScanned(false);
                }
              },
            },
            {
              text: 'Finalizar venta',
              onPress: async () => {
                setSells(sells ? sells + 1 : 1);
                setTotal(Total ? Total + json.price : json.price);

                try {
                  array = products;

                  array.push({
                    quant: 1,
                    product_id: json.id,
                  });

                  setProducts(array);

                  const res = await postSell(array, market);
                  
                  if (res.status == 200) {
                    Alert.alert(
                      'Venta confirmada',
                      'Venta confirmada, continua vendiendo',
                      [
                        {
                          text: 'aceptar',
                          onPress: () => {
                            setScanned(false);
                          },
                        },
                      ]
                    );
                  }

                  setScanned(false);
                } catch (e) {
                  console.log(e);
                  setScanned(false);
                }
              },
            },
          ],
          {
            cancelable: false,
          }
        );
      }
    }

    if (json.stock <= 0) {
      errorAlert('No hay suficiente stock...', () => {});

      setScanned(false);
    }

  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.contenedor}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
};
export default Scanner;
