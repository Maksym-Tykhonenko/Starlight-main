import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ShootingStar = ({ delay = 0, duration = 1500, startX, startY, endX, endY }) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: endX - startX,
          duration: duration,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(translateY, {
          toValue: endY - startY,
          duration: duration,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: duration * 0.1,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: duration * 0.9,
          delay: duration * 0.1,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.star,
        {
          transform: [
            { translateX },
            { translateY },
          ],
          opacity,
          left: startX,
          top: startY,
        },
      ]}
    />
  );
};

const ShootingStarField = ({ count = 6, onAnimationEnd = () => {} }) => {
  const stars = Array.from({ length: count }, (_, i) => ({
    key: i,
    startX: Math.random() * width,
    startY: Math.random() * height * 0.5,
    endX: Math.random() * width,
    endY: height,
    delay: i * 300,
    duration: 1500 + Math.random() * 1000,
  }));

  useEffect(() => {
    const timer = setTimeout(onAnimationEnd, (count + 1) * 300 + 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={StyleSheet.absoluteFill}>
      {stars.map((star) => (
        <ShootingStar key={star.key} {...star} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  star: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#fff',
    position: 'absolute',
  },
});

export { ShootingStar, ShootingStarField };