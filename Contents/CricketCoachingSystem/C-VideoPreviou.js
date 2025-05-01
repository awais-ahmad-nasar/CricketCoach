// import React, {useState, useEffect, useCallback} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   Dimensions,
//   Alert,
// } from 'react-native';
// import {ip_adress} from './IP-config';
// import LinearGradient from 'react-native-linear-gradient';
// import Video from 'react-native-video';
// import {launchImageLibrary} from 'react-native-image-picker';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const {width, height} = Dimensions.get('window');

// const VideoPreviewScreen = ({navigation, route}) => {
//   const {sessionId, coachId, videoFile: initialVideoFile, mode} = route.params;
//   const [videoFile, setVideoFile] = useState(initialVideoFile || null);
//   const [videoUri, setVideoUri] = useState(initialVideoFile?.uri || null);

//   // Memoize handleSelectVideo to prevent unnecessary re-renders
//   const handleSelectVideo = useCallback(async () => {
//     try {
//       const result = await launchImageLibrary({
//         mediaType: 'video',
//         quality: 1,
//         includeBase64: false,
//       });

//       if (result.didCancel) {
//         navigation.goBack();
//         return;
//       }

//       if (result.assets && result.assets[0].uri) {
//         const selectedVideo = result.assets[0];
//         setVideoUri(selectedVideo.uri);
//         setVideoFile({
//           uri: selectedVideo.uri,
//           type: selectedVideo.type || 'video/mp4',
//           name: selectedVideo.fileName || `gallery_video_${Date.now()}.mp4`,
//         });
//       } else {
//         Alert.alert('Error', 'No video selected');
//         navigation.goBack();
//       }
//     } catch (error) {
//       console.error('Gallery selection error:', error);
//       Alert.alert('Error', 'Failed to select video');
//       navigation.goBack();
//     }
//   }, [navigation]); // Dependency: navigation

//   // Select video from gallery if mode is 'gallery'
//   useEffect(() => {
//     if (mode === 'gallery') {
//       handleSelectVideo();
//     }
//   }, [mode, handleSelectVideo]); // Add handleSelectVideo to dependencies

//   // Upload video to backend
//   const uploadVideo = async () => {
//     if (!videoFile || !sessionId) {
//       Alert.alert('Error', 'No video or session selected');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('video', {
//       uri: videoFile.uri,
//       type: videoFile.type,
//       name: videoFile.name,
//     });
//     formData.append('session_id', sessionId);

//     try {
//       const response = await fetch(`${ip_adress}/coach/upload-session-video`, {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || 'Upload failed');
//       }

//       Alert.alert('Success', 'Video uploaded successfully', [
//         {
//           text: 'OK',
//           onPress: () => navigation.navigate('ViewArrangedSessions'),
//         },
//       ]);
//     } catch (error) {
//       console.error('Upload error:', error);
//       Alert.alert('Error', error.message || 'Failed to upload video');
//     }
//   };

//   if (!videoUri) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text style={styles.loadingText}>Loading Video...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <LinearGradient
//         colors={['#A8E6CF', '#DCEDC1']}
//         style={styles.gradientBackground}
//       />
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backButtonContainer}
//           onPress={() => navigation.goBack()}
//           activeOpacity={0.7}>
//           <Text style={styles.backButton}>Back</Text>
//         </TouchableOpacity>
//         <Text style={styles.title}>Preview Video</Text>
//       </View>
//       <View style={styles.previewContainer}>
//         <Video
//           source={{uri: videoUri}}
//           style={styles.videoPreview}
//           controls
//           resizeMode="contain"
//           paused={false}
//         />
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={[styles.actionButton, styles.cancelButton]}
//             onPress={() => navigation.goBack()}>
//             <Ionicons
//               name="close"
//               size={24}
//               color="#ffffff"
//               style={styles.icon}
//             />
//             <Text style={styles.buttonText}>Cancel</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.actionButton, styles.uploadButton]}
//             onPress={uploadVideo}>
//             <Ionicons
//               name="cloud-upload"
//               size={24}
//               color="#ffffff"
//               style={styles.icon}
//             />
//             <Text style={styles.buttonText}>Upload</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   gradientBackground: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     backgroundColor: 'transparent',
//   },
//   backButtonContainer: {
//     padding: 5,
//   },
//   backButton: {
//     color: '#0000FF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   title: {
//     color: '#0000FF',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginLeft: 10,
//   },
//   previewContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   videoPreview: {
//     width: width * 0.9,
//     height: height * 0.5,
//     borderRadius: 10,
//     backgroundColor: '#000',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: width * 0.9,
//     marginTop: 20,
//   },
//   actionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },
//   cancelButton: {
//     backgroundColor: '#FF6347',
//   },
//   uploadButton: {
//     backgroundColor: '#4CAF50',
//   },
//   icon: {
//     marginRight: 10,
//   },
//   buttonText: {
//     color: '#ffffff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   loadingText: {
//     color: '#000',
//     fontSize: 16,
//   },
// });

// export default VideoPreviewScreen;

import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import {ip_adress} from './IP-config';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import {launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

const VideoPreviewScreen = ({navigation, route}) => {
  const {sessionId, coachId, videoFile: initialVideoFile, mode} = route.params;
  const [videoFile, setVideoFile] = useState(initialVideoFile || null);
  const [videoUri, setVideoUri] = useState(initialVideoFile?.uri || null);

  // Memoize handleSelectVideo to prevent unnecessary re-renders
  const handleSelectVideo = useCallback(async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'video',
        quality: 1,
        includeBase64: false,
      });

      if (result.didCancel) {
        navigation.goBack();
        return;
      }

      if (result.assets && result.assets[0].uri) {
        const selectedVideo = result.assets[0];
        setVideoUri(selectedVideo.uri);
        setVideoFile({
          uri: selectedVideo.uri,
          type: selectedVideo.type || 'video/mp4',
          name: selectedVideo.fileName || `gallery_video_${Date.now()}.mp4`,
        });
      } else {
        Alert.alert('Error', 'No video selected');
        navigation.goBack();
      }
    } catch (error) {
      console.error('Gallery selection error:', error);
      Alert.alert('Error', 'Failed to select video');
      navigation.goBack();
    }
  }, [navigation]);

  // Select video from gallery if mode is 'gallery'
  useEffect(() => {
    if (mode === 'gallery') {
      handleSelectVideo();
    }
  }, [mode, handleSelectVideo]);

  // Upload video to backend
  const uploadVideo = async () => {
    if (!videoFile || !sessionId) {
      Alert.alert('Error', 'No video or session selected');
      return;
    }

    const formData = new FormData();
    formData.append('video', {
      uri: videoFile.uri,
      type: videoFile.type,
      name: videoFile.name,
    });
    formData.append('session_id', sessionId);

    try {
      const response = await fetch(`${ip_adress}/coach/upload-session-video`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }

      Alert.alert('Success', 'Video uploaded successfully', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('ViewArrangedSessions'),
        },
      ]);
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', error.message || 'Failed to upload video');
    }
  };

  if (!videoUri) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading Video...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#90C299', '#DCEDC1']}
        style={styles.gradientBackground}
      />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={() => navigation.goBack()}
          activeOpacity={0.5}>
          <Text style={styles.backButton}>{'< Back'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Preview Video</Text>
      </View>

      {/* Main Content */}
      <View style={styles.menu}>
        <Video
          source={{uri: videoUri}}
          style={styles.videoPreview}
          controls
          resizeMode="contain"
          paused={false}
        />
        {/* <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.goBack()}>
          <View style={styles.buttonContent}>
            <Ionicons name="close" size={30} color="#000080" />
            <Text style={styles.menuText}>Cancel</Text>
          </View>
          <Text style={styles.dropdownIcon}>⋮</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={uploadVideo}>
          <View style={styles.buttonContent}>
            <Ionicons name="cloud-upload" size={30} color="#000080" />
            <Text style={styles.menuText}>Upload</Text>
          </View>
          <Text style={styles.dropdownIcon}>⋮</Text>
        </TouchableOpacity> */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => navigation.goBack()}>
            <View style={styles.buttonContent}>
              <Ionicons name="close" size={24} color="#000080" />
              <Text style={styles.menuText}>Cancel</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallButton} onPress={uploadVideo}>
            <View style={styles.buttonContent}>
              <Ionicons name="cloud-upload" size={24} color="#000080" />
              <Text style={styles.menuText}>Upload</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F2E6',
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#DFF4DF',
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 10,
  },
  backButtonContainer: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  backButton: {
    color: '#000080',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 25,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: '#000080',
    fontSize: 22,
    fontWeight: 'bold',
  },
  menu: {
    marginTop: 100, // Adjusted to fit the video preview above the buttons
    padding: 50,
    alignItems: 'center',
  },
  videoPreview: {
    width: width * 0.9,
    height: height * 0.4, // Adjusted height to fit within the layout
    borderRadius: 10,
    backgroundColor: '#000',
    marginBottom: 20,
  },
  menuItem: {
    backgroundColor: '#90C292',
    borderRadius: 10,
    padding: 25,
    marginBottom: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    position: 'relative',
    width: width * 0.8, // Match the button width to RecordSessionScreen
  },
  buttonContent: {
    alignItems: 'center',
  },
  menuText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000080',
    marginTop: 10,
  },
  dropdownIcon: {
    fontSize: 22,
    color: '#002D62',
    position: 'absolute',
    right: 30,
    top: 34,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loadingText: {
    color: '#000',
    fontSize: 16,
  },

  buttonRow: {
    top: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.9,
    marginTop: 10,
  },

  smallButton: {
    backgroundColor: '#90C292',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default VideoPreviewScreen;
