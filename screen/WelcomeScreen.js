import React, {useRef, useEffect, useState} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {MainLayout, WelcomeLayout} from '../components/layout';

const WelcomeScreen = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const [shootingStars, setShootingStars] = useState([]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
        duration: 1500,
      }),
    ]).start(() => {
      setTimeout(() => navigation.navigate('TabNavigator'), 1500);
    });

    // Add shooting star every second
    const interval = setInterval(() => {
      setShootingStars(prev => [...prev, Date.now()]);
    }, 1000);

    return () => clearInterval(interval);
  }, [fadeAnim, scaleAnim]);

  const renderShootingStar = (key) => {
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    const endX = startX + 20;
    const endY = startY + 20;

    return (
      <Animated.View
        key={key}
        style={[
          styles.shootingStar,
          {
            left: `${startX}%`,
            top: `${startY}%`,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.shootingStarTail,
            {
              transform: [
                {
                  translateX: new Animated.Value(0).interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, endX - startX],
                  }),
                },
                {
                  translateY: new Animated.Value(0).interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, endY - startY],
                  }),
                },
              ],
            },
          ]}
        />
      </Animated.View>
    );
  };

  return (
    <WelcomeLayout>
      <View style={styles.container}>
        <View style={styles.starsContainer}>
          {[...Array(50)].map((_, i) => (
            <View
              key={i}
              style={[
                styles.star,
                {
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                },
              ]}
            />
          ))}
          {shootingStars.map(renderShootingStar)}
        </View>
        <View style={styles.contentContainer}>
          <Animated.View
            style={{opacity: fadeAnim, transform: [{scale: scaleAnim}]}}>
            <Text style={styles.title}>Starlight</Text>
            <Text style={styles.subtitle}>Constellation Quest</Text>
          </Animated.View>
        </View>
      </View>
    </WelcomeLayout>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#0f0c29',
  },
  starsContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  star: {
    position: 'absolute',
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 56,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 32,
    color: '#e0e0e0',
    textAlign: 'center',
  },
  shootingStar: {
    position: 'absolute',
    width: 2,
    height: 2,
    backgroundColor: 'white',
    borderRadius: 1,
  },
  shootingStarTail: {
    position: 'absolute',
    width: 40,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 1,
  },
});
