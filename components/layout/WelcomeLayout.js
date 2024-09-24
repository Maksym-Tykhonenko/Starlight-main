import {ImageBackground} from 'react-native';

const WelcomeLayout = ({children}) => {
  return (
    <ImageBackground
      // source={require('../../assets/img/bg/skyClear.jpg')}
      source={require('../../assets/newbg/bg.png')}
      style={{flex: 1, paddingBottom: 100}}>
      {children}
    </ImageBackground>
  );
};

export default WelcomeLayout;
