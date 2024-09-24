import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const IconReturn = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{alignSelf: 'flex-end', marginRight: 70, marginBottom: 0}}>
      <Image
        source={require('../../assets/icon/return.png')}
        style={{
          width: 50,
          height: 50,
          tintColor: '#ffffff',
          transform: [{rotate: '20deg'}],
          shadowColor: '#ffd700',
          shadowOffset: {width: 0, height: 0},
          shadowOpacity: 0.8,
          shadowRadius: 4,
        }}
      />
    </TouchableOpacity>
  );
};

export default IconReturn;

const styles = StyleSheet.create({});
