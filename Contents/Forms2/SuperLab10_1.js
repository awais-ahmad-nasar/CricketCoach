import React, {useState} from 'react';
import {View, Image, ImageBackground} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

const ImageOperations2 = () => {
  return (
    <View>
      <ImageBackground source={require('../images/lahore.jpeg')}>
        <Image
          source={require('../images/Dog.jpeg')}
          style={{
            width: 200,
            height: 200,
            resizeMode: 'stretch',
            marginBottom: 10,
            marginTop: 20,
          }}
        />
        <Image
          source={require('../images/pakMap.jpeg')}
          style={{
            width: 200,
            height: 200,
            resizeMode: 'contain',
            marginBottom: 10,
            marginTop: 20,
          }}
        />

        {/* For Online Image Getting */}
        <Image
          source={{
            uri: 'https://cache4.pakwheels.com/system/car_generation_pictures/5520/original/2022_Audi_E-Tron_GT_RS_21.jpg?1626680749',
          }}
          style={{
            width: 300,
            height: 300,
            resizeMode: 'contain',
            marginBottom: 10,
            marginTop: 0,
          }}
        />
      </ImageBackground>
    </View>
  );
};
export default ImageOperations2;
