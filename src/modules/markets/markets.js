import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/core';
import axios from 'axios';
import {
  FlatList,
  TextInput,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import Market from '../../shared/components/market';
import stylesForms from './../../styles/forms';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { routes } from '../../shared/routes';
import { getMarket } from '../../core/services/markets/marketService';

const Markets = (props) => {
  const [markets, setMarkets] = useState([]);
  const [code, setCode] = useState('');
  const [tiEnabled, setTiEnabled] = useState(true);
  const [email, setEmail] = useState('');

  useEffect(() => {
    getMarkets();
  }, []);

  const getEmailStorage = async () => {
    try {
      const result = await AsyncStorage.getItem('@user.email');
      setEmail(result);
    } catch (e) {
      console.log(e);
    }
  };

  getEmailStorage();

  const getMarkets = async () => {
    try {
      const res = await getMarket(email);
      const json = await res.data;
      const arrayMarkets = [];
      json.map((market) => {
        arrayMarkets.push(market);
      });
      setMarkets(arrayMarkets);
    } catch (e) {
      console.log(e);
    }
  };

  const searchMarket = async () => {
    try {
      const res = await searchMarket(code, email);

      if (res.status > 399) {

        errorAlert('Hubo un error con tu codigo', () => {});

      } else {
        Alert.alert(
          'Ok',
          'Solicitud recibida, por favor, vuelve a iniciar sesion',
          [
            {
              title: 'Aceptar',
              onPress: () => props.navigation.navigate('Login'),
            },
          ]
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={stylesForms.contenedor}>
        <TextInput
          placeHolder="Ingresa código del market*"
          colorText="#000"
          placeholderTextColor="#000"
          keyboardType="default"
          style={stylesForms.input}
          maxLength={50}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(val) => setCode(val)}
          value={code}
          editable={tiEnabled}
          marginTop="10%"
        />
        <TouchableOpacity
          style={{ ...stylesForms.estiloBoton, marginTop: 15 }}
          onPress={searchMarket}
        >
          <Text style={stylesForms.estiloBotonText}>Ingresar</Text>
        </TouchableOpacity>
        <FlatList
          style={{
            marginVertical: 10,
            marginHorizontal: 10,
          }}
          data={markets}
          renderItem={(item) => <Market datosMarket={item.item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default Markets;
