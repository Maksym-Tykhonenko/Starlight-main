import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import {MainLayout} from '../components/layout';
import {useAppContext} from '../store/context';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {Color} from '../constants/color';

const ArticleCard = ({theme, articles, onPress, isLocked}) => (
  <TouchableOpacity onPress={onPress}>
    <LinearGradient
      colors={[
        'rgba(25,25,25,0.9)',
        'rgba(25,25,25,0.8)',
        'rgba(25,25,25,0.7)',
        'rgba(25,25,25,0.65)',
        'rgba(25,25,25,0.5)',
        'rgba(25,25,25,0.3)',
        'rgba(25,25,25,0.1)',
      ]}
      style={styles.card}>
      <Text style={styles.cardTheme}>{theme.toUpperCase()}</Text>
      {isLocked ? (
        <Text style={styles.lockedText}>Locked (50 score to unlock)</Text>
      ) : (
        articles.map(article => (
          <View key={article.id} style={styles.articleItem}>
            <Text style={styles.articleTitle}>{article.title}</Text>
          </View>
        ))
      )}
    </LinearGradient>
  </TouchableOpacity>
);

const ArticleScreen = () => {
  const {articles, totalScore, unlockTheme} = useAppContext();
  const navigation = useNavigation();

  const handleCardPress = themeGroup => {
    if (themeGroup.isLocked) {
      if (totalScore >= 50) {
        unlockTheme(themeGroup.theme);
      } else {
        // Show an alert or message that the user doesn't have enough score
        alert("You don't have enough score to unlock this theme.");
      }
    } else {
      navigation.navigate('ArticleDetailScreen', {themeGroup});
    }
  };

  return (
    <MainLayout>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.totalScore}>Total Score: {totalScore}</Text>
        <ScrollView contentContainerStyle={styles.container}>
          {articles.map(themeGroup => (
            <ArticleCard
              key={themeGroup.theme}
              theme={themeGroup.theme}
              articles={themeGroup.article}
              isLocked={themeGroup.isLocked}
              onPress={() => handleCardPress(themeGroup)}
            />
          ))}
        </ScrollView>
        <View style={{height: 70}}></View>
      </SafeAreaView>
    </MainLayout>
  );
};

export default ArticleScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    // backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTheme: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    // color: '#333',
    color: 'black',
    color: Color.yellow,
  },
  articleItem: {
    marginBottom: 8,
  },
  articleTitle: {
    fontSize: 16,
    // color: '#666',
    color: 'white',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  safeArea: {
    flex: 1,
  },
  totalScore: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5,
  },
  lockedText: {
    fontSize: 16,
    color: Color.yellow,
    fontStyle: 'italic',
  },
});
