import {useState, useEffect, useContext, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Starlight as initialStarlight} from '../data/data';
import {articleData} from '../data/articleData';

export const AppContext = createContext({});

export const AppProvider = ({children}) => {
  const [starlightData, setStarlightData] = useState(initialStarlight);
  const [totalScore, setTotalScore] = useState(0);
  const [unlockedCount, setUnlockedCount] = useState(1); // Start with 1 as the first constellation is unlocked by default
  const [articles, setArticles] = useState(
    articleData.map(theme => ({
      ...theme,
      isLocked:
        theme.theme === 'Planets' ||
        theme.theme === 'Galaxy' ||
        theme.theme === 'constellation',
    })),
  );

  useEffect(() => {
    initStarlightData();
  }, []);

  const initStarlightData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('starlightData');
      const storedTotalScore = await AsyncStorage.getItem('totalScore');
      const storedUnlockedCount = await AsyncStorage.getItem('unlockedCount');
      if (storedData) {
        setStarlightData(JSON.parse(storedData));
      } else {
        await AsyncStorage.setItem(
          'starlightData',
          JSON.stringify(initialStarlight),
        );
      }
      if (storedTotalScore) {
        setTotalScore(parseInt(storedTotalScore));
      } else {
        await AsyncStorage.setItem('totalScore', '0');
      }
      if (storedUnlockedCount) {
        setUnlockedCount(parseInt(storedUnlockedCount));
      } else {
        await AsyncStorage.setItem('unlockedCount', '1');
      }
    } catch (error) {
      console.error('Error initializing Starlight data:', error);
    }
  };

  const updateScore = async (id, newScore) => {
    try {
      const updatedData = starlightData.map(constellation =>
        constellation.id === id
          ? {...constellation, score: newScore.toString()}
          : constellation,
      );
      setStarlightData(updatedData);
      await AsyncStorage.setItem('starlightData', JSON.stringify(updatedData));

      const newTotalScore = updatedData.reduce(
        (sum, constellation) => sum + parseInt(constellation.score),
        0,
      );
      setTotalScore(newTotalScore);
      await AsyncStorage.setItem('totalScore', newTotalScore.toString());
    } catch (error) {
      console.error('Error updating score:', error);
    }
  };

  const getUnlockCost = () => {
    return 60 + (unlockedCount - 1) * 50;
  };

  const unlockConstellation = async id => {
    const unlockCost = getUnlockCost();
    if (totalScore < unlockCost) {
      return false; // Not enough score to unlock
    }
    try {
      const updatedData = starlightData.map(constellation =>
        constellation.id === id
          ? {...constellation, isActive: true}
          : constellation,
      );
      setStarlightData(updatedData);
      await AsyncStorage.setItem('starlightData', JSON.stringify(updatedData));

      const newTotalScore = totalScore - unlockCost;
      setTotalScore(newTotalScore);
      await AsyncStorage.setItem('totalScore', newTotalScore.toString());

      const newUnlockedCount = unlockedCount + 1;
      setUnlockedCount(newUnlockedCount);
      await AsyncStorage.setItem('unlockedCount', newUnlockedCount.toString());

      return true; // Successfully unlocked
    } catch (error) {
      console.error('Error unlocking constellation:', error);
      return false;
    }
  };

  const resetGame = async () => {
    try {
      // Reset starlightData to initial state
      setStarlightData(initialStarlight);
      await AsyncStorage.setItem(
        'starlightData',
        JSON.stringify(initialStarlight),
      );

      // Reset totalScore to 0
      setTotalScore(0);
      await AsyncStorage.setItem('totalScore', '0');

      // Reset unlockedCount to 1 (first constellation unlocked by default)
      setUnlockedCount(1);
      await AsyncStorage.setItem('unlockedCount', '1');

      console.log('Game reset successfully');
    } catch (error) {
      console.error('Error resetting game:', error);
    }
  };

  const unlockTheme = async themeName => {
    if (totalScore >= 50) {
      try {
        const updatedArticles = articles.map(theme =>
          theme.theme === themeName ? {...theme, isLocked: false} : theme,
        );
        setArticles(updatedArticles);

        const newTotalScore = totalScore - 50;
        setTotalScore(newTotalScore);
        await AsyncStorage.setItem('totalScore', newTotalScore.toString());

        // Save the updated articles state to AsyncStorage
        await AsyncStorage.setItem('articles', JSON.stringify(updatedArticles));

        return true; // Successfully unlocked
      } catch (error) {
        console.error('Error unlocking theme:', error);
        return false;
      }
    }
    return false; // Not enough score to unlock
  };

  // Add this to load saved articles state on app start
  useEffect(() => {
    const loadArticles = async () => {
      try {
        const savedArticles = await AsyncStorage.getItem('articles');
        if (savedArticles) {
          setArticles(JSON.parse(savedArticles));
        }
      } catch (error) {
        console.error('Error loading articles:', error);
      }
    };
    loadArticles();
  }, []);

  const value = {
    starlightData,
    updateScore,
    unlockConstellation,
    totalScore,
    getUnlockCost,
    resetGame, // Add this to the context value
    articles,
    unlockTheme,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    console.error('Error, check your context');
  }
  return context;
};
