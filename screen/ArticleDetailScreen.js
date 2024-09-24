import React from 'react';
import {StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {MainLayout} from '../components/layout';
import {Color} from '../constants/color';
import {IconReturn} from '../components/icon';

const ArticleDetailScreen = () => {
  const route = useRoute();
  const {themeGroup} = route.params;

  return (
    <MainLayout>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.theme}>{themeGroup.theme.toUpperCase()}</Text>
          {themeGroup.article.map(article => (
            <View key={article.id} style={styles.articleCard}>
              <Text style={styles.articleTitle}>{article.title}</Text>
              {article.content.map((section, index) => (
                <View key={index} style={styles.section}>
                  <Text style={styles.subtitle}>
                    {section.subtitle.toUpperCase()}
                  </Text>
                  <Text style={styles.paragraph}>{section.paragraph}</Text>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
      <View style={{marginVertical:50}}>
        <IconReturn />
      </View>
    </MainLayout>
  );
};

export default ArticleDetailScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
  theme: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Color.yellow,
    marginBottom: 20,
    textAlign: 'center',
  },
  articleCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  articleTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.yellow,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
  },
});
