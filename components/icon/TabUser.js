import {View, Image} from 'react-native';
import {Color} from '../../constants/color';

const TabUser = ({focused}) => {
  return (
    <View
      style={{
        backgroundColor: focused ?Color.tabIconBg : 'transparent',
        padding: 7,
        borderRadius: 30,
      }}>
      <Image
        source={require('../../assets/tabBar/austronaut.png')}
        style={{width: 50, height: 50}}
      />
    </View>
  );
};

export default TabUser;
