import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ShootingStar } from './ShootingStar';

const { width, height } = Dimensions.get('window');

const ContinuousShootingStars = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newStar = {
        id: Date.now(),
        startX: Math.random() * width,
        startY: -10,
        endX: Math.random() * width,
        endY: height + 10,
        duration: 2000 + Math.random() * 1000,
      };
      setStars(prevStars => [...prevStars, newStar]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (stars.length > 5) {
      setStars(prevStars => prevStars.slice(1));
    }
  }, [stars]);

  return (
    <View style={[StyleSheet.absoluteFill, styles.starContainer]}>
      {stars.map(star => (
        <ShootingStar key={star.id} {...star} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  starContainer: {
    pointerEvents: 'none',
    zIndex: 0,
  },
});

export default ContinuousShootingStars;
