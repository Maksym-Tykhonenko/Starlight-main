import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AccLayout} from '../components/layout';
import PickImage from '../components/ui/PickImage';
import {Color} from '../constants/color';
import {Volume} from '../components/icon';

const {width, height} = Dimensions.get('window');
const image_width = width * 0.8;
const image_height = height * 0.3;

const ExplorerScreen = () => {
  const [username, setUsername] = useState('');
  const [userPhoto, setUserPhoto] = useState(null);
  const [userExists, setUserExists] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const savedUsername = await AsyncStorage.getItem('username');
      const savedUserPhoto = await AsyncStorage.getItem('userPhoto');
      if (savedUsername) setUsername(savedUsername);
      if (savedUserPhoto) setUserPhoto(savedUserPhoto);
      setUserExists(savedUsername && savedUserPhoto ? true : false);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const saveUserData = async () => {
    try {
      await AsyncStorage.setItem('username', username);
      if (userPhoto) {
        await AsyncStorage.setItem('userPhoto', userPhoto);
      }
      setUserExists(true);
      setIsEditing(false);
      alert('User data saved successfully!');
    } catch (error) {
      console.error('Error saving user data:', error);
      alert('Failed to save user data. Please try again.');
    }
  };

  const handleImagePick = images => {
    if (images && images.length > 0) {
      setUserPhoto(images[0]);
    }
  };

  const renderUserData = () => (
    <View style={styles.userDataContainer}>
      <Image source={{uri: userPhoto}} style={styles.photo} />
      {isEditing ? (
        <TextInput
          style={styles.editInput}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your username"
          placeholderTextColor="#999"
        />
      ) : (
        <Text style={styles.usernameText}>Welcome, {username}!</Text>
      )}
      <View style={styles.buttonContainer}>
        {isEditing ? (
          <>
            <TouchableOpacity style={styles.editButton} onPress={saveUserData}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditing(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={styles.editProfileBtn}
            onPress={() => setIsEditing(true)}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        )}
      </View>
      {isEditing && (
        <PickImage
          handleImage={handleImagePick}
          btnStyle={styles.changePhotoBtn}>
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </PickImage>
      )}
    </View>
  );

  const renderLoginForm = () => (
    <View style={styles.userDataContainer}>
      <Text style={styles.title}>Space Explorer Login</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.photoContainer}>
        {userPhoto ? (
          <Image source={{uri: userPhoto}} style={styles.photo} />
        ) : (
          <View style={styles.photoPlaceholder} />
        )}
        <PickImage
          style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}
          handleImage={handleImagePick}
          btnStyle={styles.pickImageBtn}>
          {userPhoto ? 'Change Photo' : 'Add Photo'}
        </PickImage>
        <TouchableOpacity style={styles.saveButton} onPress={saveUserData}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <AccLayout>
      <View style={styles.container}>
        {userExists ? renderUserData() : renderLoginForm()}
        {/* <Volume /> */}
      </View>
    </AccLayout>
  );
};

export default ExplorerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 30,
  },
  inputContainer: {
    width: '90%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 10,
    fontSize: 24,
    fontWeight: 'bold',
    borderWidth: 3,
    borderColor: Color.tabIconBg,
  },
  photoContainer: {
    alignItems: 'center',
  },
  photo: {
    width: image_width,
    height: image_height,
    borderRadius: 20,
    marginBottom: 20,
  },
  photoPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#2c3e50',
    marginBottom: 10,
  },
  pickImageBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: Color.tabIconBg,
    width: 200,
  },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    backgroundColor: Color.tabIconBg,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    width: 150,
    textAlign: 'center',
  },
  userDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 20,
  },
  usernameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  editInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 10,
    fontSize: 18,
    color: '#ffffff',
    width: '100%',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  editButton: {
    // backgroundColor: 'rgba(52, 152, 219, 0.7)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: Color.tabIconBg,
    width: '35%',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  changePhotoBtn: {
    // backgroundColor: 'rgba(46, 204, 113, 0.7)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: Color.tabIconBg,
  },
  changePhotoText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editProfileText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  editProfileBtn: {
    marginTop: 150,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: Color.tabIconBg,
    width: '35%',
    // marginTop: 20,
  },
});
