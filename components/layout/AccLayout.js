import {ImageBackground, SafeAreaView} from 'react-native';

const AccLayout = ({children}) => {
  return (
    <ImageBackground
      // source={require('../../assets/img/bg/accBg.jpg')}
      source={require('../../assets/newbg/bg.png')}
      
      style={{flex: 1}}>
        <SafeAreaView></SafeAreaView>
      {children}
    </ImageBackground>
  );
};

export default AccLayout;
