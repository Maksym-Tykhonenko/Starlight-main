import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, Image} from 'react-native';
import {usePlaybackState, State} from 'react-native-track-player';
import {toggleBackgroundMusic} from '../sound/setupPlayer';
import {Color} from '../../constants/color';

const VolumeControl = () => {
  const [offState, setOffState] = useState(false);
  const playbackState = usePlaybackState();
  const isPlaying = playbackState === State.Playing;

  const handleToggleSound = async () => {
    await toggleBackgroundMusic();
    setOffState(prev => !prev);
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {backgroundColor: offState ? 'red' : Color.soundBtn},
      ]}
      onPress={handleToggleSound}>
      <Image
        source={
          isPlaying
            ? require('../../assets/icon/volume.png')
            : require('../../assets/icon/volume_down.png')
        }
        style={[styles.icon, {}]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // padding: 7,
    borderRadius: 30,
    // backgroundColor: Color.soundBtn,
  },
  icon: {
    width: 50,
    height: 50,
    // tintColor:'#428092',
    tintColor: Color.soundBtnTint,
    // resizeMode: 'contain',
  },
});

export default VolumeControl;
