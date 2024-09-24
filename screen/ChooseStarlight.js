import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  AppState,
} from 'react-native';
import {MainLayout} from '../components/layout';
import {useAppContext} from '../store/context';
import {IconReset} from '../components/icon';
import VolumeIcon from '../components/icon/VolumeIcon';
import VolumeControl from '../components/sound/VolumeControl';
import {resetPlayer, setupPlayer} from '../components/sound/setupPlayer';

const ChooseStarlight = ({navigation}) => {
  const {
    starlightData,
    unlockConstellation,
    totalScore,
    getUnlockCost,
    resetGame,
  } = useAppContext();
  {
    /** */
  }
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

  function navigateTo(id) {
    navigation.navigate('MainScreen', {constellationId: id});
  }

  function handlePress(star) {
    if (star.isActive) {
      navigateTo(star.id);
    } else {
      const unlockCost = getUnlockCost();
      Alert.alert(
        'Unlock Constellation',
        `Do you want to unlock ${star.name} for ${unlockCost} points?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Unlock',
            onPress: async () => {
              const success = await unlockConstellation(star.id);
              if (success) {
                Alert.alert('Success', `${star.name} has been unlocked!`);
              } else {
                Alert.alert('Error', 'Not enough points to unlock.');
              }
            },
          },
        ],
      );
    }
  }

  const handleReset = () => {
    Alert.alert(
      'Reset Game',
      'Are you sure you want to reset the game? All progress will be lost.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          onPress: async () => {
            await resetGame();
            Alert.alert('Game Reset', 'The game has been reset successfully.');
          },
        },
      ],
    );
  };

  return (
    <MainLayout>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <Text style={styles.totalScore}>Total Score: {totalScore}</Text>
          {/* <VolumeControl /> */}
          <IconReset onPress={handleReset} />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}>
          {starlightData.map((star, i) => {
            return (
              <TouchableOpacity
                onPress={() => handlePress(star)}
                key={i}
                style={[
                  styles.button,
                  !star.isActive && styles.inactiveButton,
                ]}>
                <Text
                  style={[styles.text, !star.isActive && styles.inactiveText]}>
                  {star.name}
                </Text>
                {star.score !== '0' && (
                  <Text style={styles.scoreText}>Score: {star.score}</Text>
                )}
                {!star.isActive && (
                  <Text style={styles.unlockText}>
                    Unlock for {getUnlockCost()} points
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </SafeAreaView>
      <View style={{height: 120}}></View>
    </MainLayout>
  );
};

export default ChooseStarlight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    padding: 20,
    borderWidth: 2,
    marginVertical: 25,
    borderRadius: 15,
    width: '90%',
    alignItems: 'center',
    borderColor: 'rgba(255, 255, 255, 0.6)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  inactiveButton: {
    backgroundColor: 'rgba(50, 50, 50, 0.5)',
    borderColor: 'rgba(100, 100, 100, 0.6)',
  },
  text: {
    fontSize: 28,
    letterSpacing: 2,
    color: '#fff',
    fontWeight: '900',
  },
  inactiveText: {
    color: 'rgba(200, 200, 200, 0.5)',
  },
  scoreText: {
    fontSize: 18,
    color: '#ffd700',
    marginTop: 5,
  },
  totalScore: {
    fontSize: 24,
    color: '#ffd700',
    textAlign: 'center',
    marginVertical: 10,
  },
  unlockText: {
    fontSize: 14,
    color: '#ffd700',
    marginTop: 5,
  },
});
