import React, {useState} from 'react';
import {Text, View} from 'react-native';
import MapView, {Marker, Polygon, Polyline} from 'react-native-maps';

const Maps2 = () => {
  const [marker, setMarker] = useState({
    latitude: 33.64252919601249,
    longitude: 73.07839628309011,
  });

  const [markers, setMarkers] = useState([]);
  const handleMapPress = event => {
    const coordinate = event.nativeEvent.coordinate;
    setMarkers([...markers, coordinate]);
    console.log(markers);
    // console.log(coordinate)
    // setMarker(coordinate);
  };
  return (
    <View style={{flex: 1, alignContent: 'center', backgroundColor: 'white'}}>
      <Text style={{fontSize: 40, textAlign: 'center', color: 'blue'}}>
        My Map
      </Text>
      <MapView
        style={{width: 500, height: 700}}
        initialRegion={{
          latitude: 33.64252919601249,
          longitude: 73.07839628309011,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}>
        {markers.map(marker => (
          <Marker coordinate={marker} />
        ))}
        {markers.length > 2 && (
          <Polygon
            coordinates={markers}
            fillColor="rgba(28,110,168,0.3)"
            strokeColor="blue"
            strokeWidth={2}
          />
        )}
      </MapView>
    </View>
  );
};
export default Maps2;
