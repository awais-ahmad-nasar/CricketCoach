import React, {useState} from 'react';
import {View, Image, ImageBackground, StyleSheet} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {Button} from 'react-native-paper';

const ImageOperations = () => {
  return (
    <View style={ss.main}>
      <View style={ss.img}>
        <Image
          source={require('../images/cat.jpeg')}
          style={{
            width: 200,
            height: 200,
            resizeMode: 'stretch',
            marginBottom: 10,
            marginTop: 20,
            alignSelf: 'center',
          }}
        />
      </View>
      <View style={ss.btn}>
        <Button
          labelStyle={{fontSize: 20}}
          style={{borderRadius: 5, margin: 5}}
          mode="contained"
          textColor="white"
          onPress={{}}>
          Upload From Gallery
        </Button>
        <Button
          labelStyle={{fontSize: 20}}
          style={{borderRadius: 5, margin: 5}}
          mode="contained"
          textColor="white"
          onPress={{}}>
          Take Picture From Camera
        </Button>
      </View>
    </View>
  );
};
const ss = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    flex: 1,
  },
  img: {
    marginBottom: 30,
  },
  btn: {
    marginTop: 10,
    padding: 20,
  },
});
export default ImageOperations;
