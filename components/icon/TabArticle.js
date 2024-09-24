import {View, Image} from 'react-native';
import {Color} from '../../constants/color';

const TabArticle = ({focused}) => {
  return (
    <View
      style={{
        backgroundColor: focused ? Color.tabIconBg : 'transparent',
        padding: 7,
        borderRadius: 30,
      }}>
      <Image
        source={require('../../assets/tabBar/satellite.png')}
        style={{width: 50, height: 50}}
      />
    </View>
  );
};

export default TabArticle;
