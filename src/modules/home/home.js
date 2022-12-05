import React, { useEffect, useLayoutEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MiCuenta from './../profile/miCuenta';
import NuevaVenta from './../venta/venta';
import Lugar from './../lugar/lugar';
import Catalogo from './../catalogo/catalogo';
import Markets from './../markets/markets';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { Alert, BackHandler, TouchableOpacity } from 'react-native';
import { DrawerActions } from '@react-navigation/core';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

const MenuInicial = (props) => {
  const [token, setToken] = useState('');
  const [has, setHas] = useState('');
  const [location, setLocation] = useState('');

  const getTokenStorage = async () => {
    try {
      const result = await AsyncStorage.getItem('@access_token');
      setToken(result);

      const result2 = await AsyncStorage.getItem('@user.has_markets');
      setHas(result2);

      const result3 = await AsyncStorage.getItem('@location.active');
      setLocation(result3);
    } catch (e) {
      console.log(e);
    }
  };

  getTokenStorage();
  const backAction = async () => {
    Alert.alert(
      '¡Espera!',
      '¿Realmente desea salir?',
      [
        {
          text: 'Cancelar',
          onPress: null,
          style: 'cancel',
        },
        {
          text: 'Salir',
          onPress: async () => {
            props.navigation.navigate('Login');
          },
          style: 'default',
        },
      ],
      { cancelable: false }
    );
    return true;
  };

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{
            paddingLeft: 10,
            paddingRight: 30,
            paddingVertical: 10,
          }}
          onPress={() => {
            props.navigation.dispatch(DrawerActions.toggleDrawer());
          }}
        >
          <Entypo name="menu" size={25} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{
            paddingRight: 10,
            paddingLeft: 30,
            paddingVertical: 10,
          }}
          onPress={backAction}
        >
          <AntDesign name="poweroff" size={21} />
        </TouchableOpacity>
      ),
    });
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  //Estructura del Drawer

  if (has == '0') {
    return (
      <Drawer.Navigator>
        <Drawer.Screen
          name="Mi Cuenta"
          component={MiCuenta}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="Ingresar a market"
          component={Markets}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
    );
  } else {
    if (location == '1') {
      return (
        <Drawer.Navigator>
          <Drawer.Screen
            name="Mi Cuenta"
            component={MiCuenta}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name="Nueva Venta"
            component={NuevaVenta}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name="Localización del market"
            component={Lugar}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name="Catalogo"
            component={Catalogo}
            options={{ headerShown: false }}
          />
        </Drawer.Navigator>
      );
    } else {
      return (
        <Drawer.Navigator>
          <Drawer.Screen
            name="Mi Cuenta"
            component={MiCuenta}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name="Nueva Venta"
            component={NuevaVenta}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name="Catalogo"
            component={Catalogo}
            options={{ headerShown: false }}
          />
        </Drawer.Navigator>
      );
    }
  }
};

export default MenuInicial;
