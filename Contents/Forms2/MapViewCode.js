import React from 'react';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {Text} from 'react-native-paper';

const Maps = () => {
  return (
    <View style={{backgroundColor: 'white'}}>
      <Text style={{fontSize: 50, textAlign: 'center', color: 'blue'}}>
        My Map
      </Text>
      <MapView
        style={{width: 700, height: 700}}
        initialRegion={{
          latitude: 33.64252919601249,
          longitude: 73.07839628309011,
          // that represent the zoom level
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: 33.64252919601249,
            longitude: 73.07839628309011,
          }}
        />
      </MapView>
      {/* If you want to open map first time at specific redion use initialRegion */}
    </View>
  );
};

export default Maps;
