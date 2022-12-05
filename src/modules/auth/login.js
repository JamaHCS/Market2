import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import formStyle from './../../styles/forms';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { routes } from '../../shared/routes';
import { errorAlert, loginAlert } from '../../shared/utils/alerts';
import { postLogin } from '../../core/services/auth/authService';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [btnVisible, setBtnVisible] = useState(true);
  const [aiVisible, setAiVisible] = useState(false);
  const [tiEnabled, setTiEnabled] = useState(true);

  const validaLogin = async () => {
    if (username.length < 10) {
      errorAlert('Correo incorrecto', setUsername);

      return;
    }

    if (password.length < 8) {
      errorAlert('Contraseña incorrecta', setPassword);

      return;
    }

    try {
      const res = await postLogin(username, password);

      const json = await res.data;

      if (res.status === 200) {
        AsyncStorage.setItem('@access_token', json.access_token);
        AsyncStorage.setItem('@user.email', json.user.email);
        AsyncStorage.setItem('@user.name', json.user.name);

        if (json.user.markets.length != 0) {
          AsyncStorage.setItem('@user.has_markets', '1');
          AsyncStorage.setItem('@user.uuid', json.user.markets[0].uuid);
          AsyncStorage.setItem('@market.id', json.user.markets[0].id + '');

          let aNumber = '' + json.user.markets[0].relation_id;

          AsyncStorage.setItem('@user.name_market', json.user.markets[0].name);
          AsyncStorage.setItem('@user.markets', aNumber);

          if (json.user.markets[0].location.active) {
            AsyncStorage.setItem('@location.active', '1');

            AsyncStorage.setItem(
              '@user.latitude',
              '' + json.user.markets[0].location.latitude
            );

            AsyncStorage.setItem(
              '@user.longitude',
              '' + json.user.markets[0].location.longitude
            );
          } else {
            AsyncStorage.setItem('@location.active', '0');
          }
        } else {
          AsyncStorage.setItem('@user.has_markets', '0');
        }

        AsyncStorage.setItem(
          '@user.profile_photo_url',
          json.user.profile_photo_url
        );

          loginAlert(username, props);
      }
    } catch (e) {
      console.log(e);
      Alert.alert(
        'ERROR!',
        'Correo electrónico o password incorrecto',
        [
          {
            title: 'Aceptar',
            onPress: () => {
              setUsername('');
              setPassword('');
            },
          },
        ],
        {
          cancelable: false,
        }
      );
    }
  };

  return (
    <View style={formStyle.contenedor}>
      <Image
        source={require('./../../../assets/images/logo.png')}
        style={formStyle.imagen}
      />

      <TextInput
        placeholder="Ingrese correo*"
        colorText="#000"
        placeholderTextColor="#000"
        keyboardType="email-address"
        style={formStyle.input}
        maxLength={50}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(val) => setUsername(val)}
        value={username}
        editable={tiEnabled}
      />

      <TextInput
        placeholder="Ingrese contraseña*"
        colorText="#000"
        placeholderTextColor="#000"
        keyboardType="default"
        style={formStyle.input}
        minLenght={8}
        maxLength={25}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
        onChangeText={(val) => setPassword(val)}
        value={password}
        editable={tiEnabled}
      />

      <ActivityIndicator
        color="#000"
        size="large"
        style={{
          marginVertical: 15,
          display: aiVisible ? 'flex' : 'none',
        }}
      />
      <View
        style={{
          display: btnVisible ? 'flex' : 'none',
        }}
      >
        <TouchableOpacity style={formStyle.estiloBoton} onPress={validaLogin}>
          <Text style={formStyle.estiloBotonText}>
            <AntDesign size={22} name="login" />
            {'  '}
            Iniciar de sesión
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={formStyle.estiloBotonR}
        onPress={() => {
          props.navigation.navigate('Registro');
        }}
      >
        <Text style={formStyle.estiloBotonText}>
          <AntDesign size={22} name="adduser" />
          {'  '}
          Registrarse
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
