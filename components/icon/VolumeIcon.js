import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { usePlaybackState, State } from 'react-native-track-player';
import { toggleBackgroundMusic } from '../sound/setupPlayer';

const VolumeIcon = () => {
  const playbackState = usePlaybackState();
  const isPlaying = playbackState === State.Playing;

  const handleToggleSound = async () => {
    await toggleBackgroundMusic();
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleToggleSound}>
      <Image
        source={
          isPlaying
            ? require('../../assets/icon/star.png')
            : require('../../assets/icon/volume_down.png')
        }
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 5,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default VolumeIcon;
