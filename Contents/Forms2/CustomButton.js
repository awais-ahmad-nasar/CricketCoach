import {Pressable, StyleSheet, Text, View} from 'react-native';

export const CustomBTN = ({title, onPress, style, txtStyle}) => {
  return (
    <Pressable
      android_ripple={{color: 'gray', foreground: true, borderless: false}}
      onPress={onPress}>
      <View style={[myStyle.btn, style]}>
        <Text style={[myStyle.txtStyle, txtStyle]}>{title}</Text>
      </View>
    </Pressable>
  );
};
const myStyle = StyleSheet.create({
  btn: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
});
