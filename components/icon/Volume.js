import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import TrackPlayer from 'react-native-track-player';

const Volume = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    setupPlayer();
    return () => TrackPlayer.destroy();
  }, []);

  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add({
        id: 'backgroundMusic',
        url: require('../../assets/background_music.mp3'), // Adjust the path as needed
        title: 'Background Music',
        artist: 'Your App',
      });
      await TrackPlayer.play(); // Start playing immediately
      setIsPlaying(true);
    } catch (error) {
      console.error('Error setting up player:', error);
    }
  };

  const toggleSound = async () => {
    try {
      if (isPlaying) {
        await TrackPlayer.pause();
      } else {
        await TrackPlayer.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Error toggling sound:', error);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={toggleSound}>
      {/* <Icon
        name={isPlaying ? 'volume-high' : 'volume-mute'}
        size={24}
        color="white"
      /> */}
      <Text>ON</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
});

export default Volume;
