import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  ArticleDetailScreen,
  ArticleScreen,
  ChooseStarlight,
  ExplorerScreen,
  MainScreen,
  WelcomeScreen,
} from './screen';
import {AppProvider} from './store/context';
import {TabArticle, TabConstell, TabUser} from './components/icon';
import {
  View,
  AppState,
  TouchableOpacity,
  Dimensions,
  Platform,
  Animated,
} from 'react-native';
import {resetPlayer, setupPlayer} from './components/sound/setupPlayer';
import {useEffect, useRef, useState} from 'react';
import StarlightProdactScreen from './screen/StarlightProdactScreen';
import VolumeControl from './components/sound/VolumeControl';
import ReactNativeIdfaAaid, {
  AdvertisingInfoResponse,
} from '@sparkfabrik/react-native-idfa-aaid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const {height} = Dimensions.get('window');
const SEphone = 670;

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        title: '',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'transparent',
          elevation: 0, // for Android
          shadowOpacity: 0, // for iOS
          borderTopWidth: 0,
          position: 'absolute',
          height: 80,
        },
        tabBarBackground: () => (
          <View
            style={{
              backgroundColor: 'gray',
              height: 70,
              justifyContent: 'center',
              bottom: height > SEphone ? 16 : 5,
              marginHorizontal: 10,
              borderRadius: 16,
            }}
          />
        ),
      }}>
      <Tab.Screen
        name="ChooseStarLight"
        component={ChooseStarlight}
        options={{tabBarIcon: ({focused}) => <TabConstell focused={focused} />}}
      />
      <Tab.Screen
        name="ExplorerScreen"
        component={ExplorerScreen}
        options={{tabBarIcon: ({focused}) => <TabUser focused={focused} />}}
      />
      <Tab.Screen
        name="ArticleScreen"
        component={ArticleScreen}
        options={{tabBarIcon: ({focused}) => <TabArticle focused={focused} />}}
      />

      <Tab.Screen
        name="Sound"
        component={VolumeControl}
        options={{
          tabBarIcon: () => <VolumeControl />,
          tabBarButton: props => (
            <TouchableOpacity {...props} onPress={() => {}} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const [route, setRoute] = useState(true);
  //console.log('route==>', route)
  const [idfa, setIdfa] = useState();
  console.log('idfa==>', idfa);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [
    idfa,
    //appsUid,
    //sab1,
    //pid,
    //adServicesToken,
    //adServicesAtribution,
    //adServicesKeywordId,
  ]);

  const setData = async () => {
    try {
      const data = {
        idfa,
        //appsUid,
        //sab1,
        //pid,
        //adServicesToken,
        //adServicesAtribution,
        //adServicesKeywordId,
      };
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem('App', jsonData);
      //console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      //console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('App');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('Дані дістаються в AsyncStorage');
        console.log('parsedData in App==>', parsedData);
        setIdfa(parsedData.idfa);
        //setAppsUid(parsedData.appsUid);
        //setSab1(parsedData.sab1);
        //setPid(parsedData.pid);
        //setAdServicesToken(parsedData.adServicesToken);
        //setAdServicesAtribution(parsedData.adServicesAtribution);
        //setAdServicesKeywordId(parsedData.adServicesKeywordId);
      } else {
        await fetchIdfa();
        //await requestOneSignallFoo();
        //await performAppsFlyerOperations();
        //await getUidApps();
        //await fetchAdServicesToken(); // Вставка функції для отримання токену
        //await fetchAdServicesAttributionData(); // Вставка функції для отримання даних

        //onInstallConversionDataCanceller();
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  ///////// IDFA
  const fetchIdfa = async () => {
    try {
      const res = await ReactNativeIdfaAaid.getAdvertisingInfo();
      if (!res.isAdTrackingLimited) {
        setIdfa(res.id);
        //console.log('setIdfa(res.id);');
      } else {
        //console.log('Ad tracking is limited');
        setIdfa(true); //true
        //setIdfa(null);
        fetchIdfa();
        //Alert.alert('idfa', idfa);
      }
    } catch (err) {
      //console.log('err', err);
      setIdfa(null);
      await fetchIdfa(); //???
    }
  };

  ///////// Route useEff
  //
  useEffect(() => {
    const checkUrl = `https://reactnative.dev/`;

    const targetData = new Date('2024-09-23T10:00:00'); //дата з якої поч працювати webView
    const currentData = new Date(); //текущая дата

    if (currentData <= targetData) {
      setRoute(false);
    } else {
      fetch(checkUrl)
        .then(r => {
          if (r.status === 200) {
            //console.log('status==>', r.status);
            setRoute(true);
          } else {
            setRoute(false);
          }
        })
        .catch(e => {
          //console.log('errar', e);
          setRoute(false);
        });
    }
  }, []);

  ///////// Route
  const Route = ({isFatch}) => {
    if (isFatch) {
      return (
        <Stack.Navigator>
          <Stack.Screen
            initialParams={
              {
                //idfa: idfa,
                //sab1: sab1,
                //pid: pid,
                //uid: appsUid,
                //adToken: adServicesToken,
                //adAtribution: adServicesAtribution,
                //adKeywordId: adServicesKeywordId,
              }
            }
            name="StarlightProdactScreen"
            component={StarlightProdactScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      );
    }
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom',
          animationDuration: 1800,
        }}>
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="ChooseStarlight" component={ChooseStarlight} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen
          name="ArticleDetailScreen"
          component={ArticleDetailScreen}
        />
      </Stack.Navigator>
    );
  };

  ///////// Louder
  const [louderIsEnded, setLouderIsEnded] = useState(false);
  const appearingAnim = useRef(new Animated.Value(0)).current;
  const appearingSecondAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(appearingAnim, {
      toValue: 1,
      duration: 3500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(appearingSecondAnim, {
        toValue: 1,
        duration: 3500,
        useNativeDriver: true,
      }).start();
      //setLouderIsEnded(true);
    }, 3500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLouderIsEnded(true);
    }, 8000);
  }, []);
  return (
    <AppProvider>
      <NavigationContainer>
        {!louderIsEnded ? (
          <View
            style={{
              position: 'relative',
              flex: 1,
              backgroundColor: 'rgba(0,0,0)',
            }}>
            <Animated.Image
              source={require('./assets/loaders/Loader1.png')}
              style={{
                //...props.style,
                opacity: appearingAnim,
                width: '100%',
                height: '100%',
                position: 'absolute',
              }}
            />
            <Animated.Image
              source={require('./assets/loaders/Loader2.png')}
              style={{
                //...props.style,
                opacity: appearingSecondAnim,
                width: '100%',
                height: '100%',
                position: 'absolute',
              }}
            />
          </View>
        ) : (
          <Route isFatch={route} />
        )}
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
{
  /**
   * 
  const [id, setItem] = useState(0);
  const animation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    setupPlayer();
    // getDeviceInfo();

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        resetPlayer();
      } else if (nextAppState === 'active') {
        setupPlayer();
      }
    });

    return () => {
      subscription.remove();
      resetPlayer();
    };
  }, []);

  useEffect(() => {
    fadeStart();
    const timeOut = setTimeout(() => {
      navigateToMenu();
    }, 6000);
    return () => clearTimeout(timeOut);
  }, []);
  
  const fadeStart = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => fadeFinish());
  };
  
  const fadeFinish = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      setItem(prevState => prevState + 1);
      fadeStart();
    });
  };
  const navigateToMenu = () => {
    setItem(2);
  };
  
  */
}
