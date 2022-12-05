import { useFocusEffect } from '@react-navigation/core';
import formStyle from './../../styles/forms';
import React, { useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import AppModal from './../../shared/components/modal';

import * as ImagePicker from 'expo-image-picker';

import { Camera, CameraType } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MiCuenta = (props) => {
  const [modalImg, setModalImg] = useState(false);
  const [docUsuario, setDocUsuario] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [market, setMarket] = useState('');

    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();

  const datosUser = async () => {
    try {
      const result = await AsyncStorage.getItem('@user.name');
      setName(result);
      const result2 = await AsyncStorage.getItem('@user.email');
      setEmail(result2);
      const result3 = await AsyncStorage.getItem('@user.profile_photo_url');
      setImage(result3);
      if ((await AsyncStorage.getItem('@user.has_markets')) == '1') {
        const result4 = await AsyncStorage.getItem('@user.name_market');
        setMarket(result4);
      } else {
        setMarket('Aun no perteneces a un Market):');
      }
    } catch (e) {
      console.log(e);
    }
  };

  datosUser();

  const tomarImagenGaleria = async () => {

      const imgGaleria = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (!imgGaleria.canceled) {
        setDocUsuario({
          ...docUsuario,
          ['avatar']: imgGaleria.assets[0].uri,
        });

        setModalImg(false);

        const blob = await (await fetch(imgGaleria.assets[0].uri)).blob();

        const file = new File([blob], `${docUsuario.id}.jpg`, {
          type: 'image/jpeg',
        });

        blob.close();
      } else {
        Alert.alert('ERROR', 'Selecciona una imagen de tu galería');
      }
    
  };

  return (
    <View style={formStyle.contenedor}>
      {modalImg ? (
        <AppModal
          show={modalImg}
          layerBgOpacity={0.5}
          modalBgColor="#fff"
          modalOpacity={1}
          modalContent={
            <View>
              <Text
                style={{
                  alignSelf: 'center',
                  marginVertical: 1,
                  fontSize: 18,
                  fontWeight: '500',
                }}
              >
                <FontAwesome5 name="camera" size={20} /> CAMBIAR IMAGEN
              </Text>
              <View
                style={{
                  marginVertical: 12,
                }}
              />

              <View
                style={{
                  marginVertical: 8,
                }}
              />

              <Button
                color="#1429A3"
                title="Galería"
                onPress={tomarImagenGaleria}
              />

              <View
                style={{
                  marginVertical: 8,
                }}
              />

              <Button
                title="Cancelar"
                color="#C70039"
                onPress={() => setModalImg(false)}
              />
            </View>
          }
        />
      ) : null}
      <ScrollView>
        <ImageBackground
          source={
            typeof docUsuario.avatar !== 'undefined'
              ? { uri: docUsuario.avatar }
              : { uri: image }
          }
          style={formStyle.imagen}
        ></ImageBackground>

        <TextInput
          style={formStyle.input}
          value={'Nombre: ' + name}
          editable={false}
        />
        <TextInput
          style={formStyle.input}
          value={'Email: ' + email}
          editable={false}
        />
        <TextInput
          style={formStyle.input}
          value={'Market: ' + market}
          editable={false}
        />
      </ScrollView>
    </View>
  );
};

export default MiCuenta;
