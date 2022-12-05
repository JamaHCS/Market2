import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  Button,
  Alert,
} from 'react-native';
import axios from 'axios';
import { routes } from '../../shared/routes';
import { errorAlert } from '../../shared/utils/alerts';
import { postRegister } from '../../core/services/auth/authService';


const Registro = (props) => {
  const [nombre, setNombre] = useState('');
  const [apellido1, setApellido1] = useState('');
  const [apellido2, setApellido2] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [telefono, setTelefono] = useState('');
  const [aiVisible, setAiVisible] = useState(false);
  const [btnVisible, setBtnVisible] = useState(true);
  const [tiEnabled, setTiEnabled] = useState(true);

  const validaRegistro = async () => {
    if (nombre.length < 3) {
      errorAlert('Nombre incompleto', setNombre);

      return;
    }

    if (email.length < 10) {
      errorAlert('Email incompleto', setEmail);

      return;
    }

    if (contrasena.length < 8 || contrasena.length > 25) {
      errorAlert(
        'Contraseña incompleta (deben ser 8 dígitos mínimo)',
        setContrasena
      );

      return;
    }

    const res = await postRegister(nombre, email, contrasena);

    if (res.status === 201) {
      Alert.alert(
        'Hey!',
        `Has sido registrado exitosamente ${nombre}`,
        [
          {
            title: 'Aceptar',
            onPress: () => {
              setAiVisible(true);
              setBtnVisible(false);
              setTiEnabled(false);
              setTimeout(() => {
                setAiVisible(false);
                setBtnVisible(true);
                setTiEnabled(true);
              }, 3000);
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
    <ScrollView
      style={{
        flex: 1,
        marginVertical: 20,
        width: '100%',
        paddingHorizontal: 20,
        backgroundColor: '#f3f4f6',
      }}
    >
      <ImageBackground
        source={require('./../../../assets/images/logo.png')}
        style={{
          height: 200,
          width: 200,
          alignSelf: 'center',
          overflow: 'hidden',
          borderRadius: 100,
          borderColor: 'transparent',
          borderStyle: 'solid',
          marginVertical: 20,
          borderWidth: 2,
        }}
      />
      <Text
        style={{
          fontWeight: '500',
          fontSize: 20,
          textAlign: 'center',
          alignSelf: 'center',
          marginVertical: 10,
          color: '#000',
        }}
      >
        Registro
      </Text>

      <TextInput
        placeholder="Nombre*"
        keyboardType="default"
        style={{
          width: '100%',
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderColor: '#1f2937',
          borderWidth: 1,
          marginVertical: 5,
          fontSize: 16,
          borderRadius: 5,
          color: '#000',
        }}
        placeholderTextColor="#000"
        value={nombre}
        onChangeText={(val) => {
          setNombre(val);
        }}
        editable={tiEnabled}
      />

      <TextInput
        placeholder="Email*"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        style={{
          width: '100%',
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderColor: '#1f2937',
          borderWidth: 1,
          marginVertical: 5,
          fontSize: 16,
          borderRadius: 5,
          color: '#000',
        }}
        placeholderTextColor="#000"
        value={email}
        onChangeText={(val) => {
          setEmail(val);
        }}
        editable={tiEnabled}
      />

      <TextInput
        placeholder="Contraseña*"
        keyboardType="default"
        style={{
          width: '100%',
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderColor: '#1f2937',
          borderWidth: 1,
          marginVertical: 5,
          fontSize: 16,
          borderRadius: 5,
          color: '#000',
        }}
        placeholderTextColor="#000"
        value={contrasena}
        onChangeText={(val) => {
          setContrasena(val);
        }}
        editable={tiEnabled}
        secureTextEntry
      />

      <ActivityIndicator
        size="large"
        color="#fff"
        style={{
          marginVertical: 15,
          display: aiVisible ? 'flex' : 'none',
        }}
      />

      <View
        style={{
          marginBottom: 10,
          display: btnVisible ? 'flex' : 'none',
        }}
      >
        <Button title="Registrarse" color="#1f2937" onPress={validaRegistro} />
      </View>

      <Button
        title="¿Ya tienes una cuenta? Inicia sesión"
        color="#C00739"
        onPress={() => {
          props.navigation.navigate('Login');
        }}
      />
    </ScrollView>
  );
};

export default Registro;
