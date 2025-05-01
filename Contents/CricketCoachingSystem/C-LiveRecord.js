// import React, {useState, useEffect, useRef} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
//   Dimensions,
//   Modal,
// } from 'react-native';
// import {Camera, useCameraDevices} from 'react-native-vision-camera';
// import LinearGradient from 'react-native-linear-gradient';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// const {width, height} = Dimensions.get('window');
// import {ip_adress} from './IP-config';

// const RecordLiveScreen = ({navigation, route}) => {
//   const {sessionId, coachId} = route.params;
//   const [isRecording, setIsRecording] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [recordedVideo, setRecordedVideo] = useState(null);
//   const [showUploadModal, setShowUploadModal] = useState(false);
//   const camera = useRef(null);
//   const devices = useCameraDevices();
//   const device = devices.back;

//   // Check camera and microphone permissions
//   useEffect(() => {
//     const checkPermissions = async () => {
//       try {
//         let cameraPermission = await Camera.getCameraPermissionStatus();
//         let microphonePermission = await Camera.getMicrophonePermissionStatus();

//         if (cameraPermission !== 'authorized') {
//           cameraPermission = await Camera.requestCameraPermission();
//         }

//         if (microphonePermission !== 'authorized') {
//           microphonePermission = await Camera.requestMicrophonePermission();
//         }

//         if (
//           cameraPermission !== 'authorized' ||
//           microphonePermission !== 'authorized'
//         ) {
//           Alert.alert(
//             'Permission Required',
//             'Please enable camera and microphone permissions in settings',
//             [{text: 'OK', onPress: () => navigation.goBack()}],
//           );
//           return;
//         }

//         setIsLoading(false);
//       } catch (error) {
//         console.error('Permission check failed:', error);
//         Alert.alert('Error', 'Failed to check permissions');
//         navigation.goBack();
//       }
//     };

//     checkPermissions();
//   }, [navigation]);

//   // const handleStartRecording = async () => {
//   //   if (!camera.current) {
//   //     Alert.alert('Error', 'Camera not available');
//   //     return;
//   //   }

//   //   try {
//   //     setIsRecording(true);
//   //     await camera.current.startRecording({
//   //       fileType: 'mp4',
//   //       onRecordingFinished: async video => {
//   //         console.log('Recording finished:', video.path);
//   //         setRecordedVideo({
//   //           uri: video.path,
//   //           type: 'video/mp4',
//   //           name: `session_${sessionId}_${Date.now()}.mp4`,
//   //         });
//   //         setShowUploadModal(true);
//   //       },
//   //       onRecordingError: error => {
//   //         console.error('Recording error:', error);
//   //         Alert.alert('Error', 'Failed to record video');
//   //       },
//   //     });
//   //   } catch (error) {
//   //     console.error('Start recording error:', error);
//   //     Alert.alert('Error', 'Failed to start recording');
//   //     setIsRecording(false);
//   //   }
//   // };
//   const handleStartRecording = async () => {
//     if (!camera.current) {
//       Alert.alert('Error', 'Camera not available');
//       return;
//     }

//     try {
//       setIsRecording(true);

//       const video = await camera.current.startRecording({
//         flash: 'off',
//         onRecordingFinished: video => {
//           console.log('Recording finished:', video.path);
//           setRecordedVideo({
//             uri: video.path,
//             type: 'video/mp4',
//             name: `session_${sessionId}_${Date.now()}.mp4`,
//           });
//           setShowUploadModal(true);
//         },
//         onRecordingError: error => {
//           console.error('Recording error:', error);
//           Alert.alert('Error', 'Failed to record video');
//           setIsRecording(false);
//         },
//       });
//     } catch (error) {
//       console.error('Start recording error:', error);
//       Alert.alert('Error', 'Failed to start recording');
//       setIsRecording(false);
//     }
//   };

//   const handleStopRecording = async () => {
//     try {
//       if (camera.current) {
//         await camera.current.stopRecording();
//       }
//     } catch (error) {
//       console.error('Stop recording error:', error);
//     } finally {
//       setIsRecording(false);
//     }
//   };

//   const uploadVideo = async () => {
//     if (!recordedVideo || !sessionId) {
//       Alert.alert('Error', 'No video recorded');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('video', {
//       uri: recordedVideo.uri,
//       type: recordedVideo.type,
//       name: recordedVideo.name,
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
//       if (!response.ok) throw new Error(data.message || 'Upload failed');

//       Alert.alert('Success', 'Video uploaded successfully', [
//         {text: 'OK', onPress: () => navigation.goBack()},
//       ]);
//     } catch (error) {
//       console.error('Upload error:', error);
//       Alert.alert('Error', error.message || 'Failed to upload video');
//     } finally {
//       setShowUploadModal(false);
//     }
//   };

//   if (isLoading || !device) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#ffffff" />
//         <Text style={styles.loadingText}>
//           {!device ? 'Camera device not found' : 'Loading Camera...'}
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <LinearGradient
//         colors={['#A8E6CF', '#DCEDC1']}
//         style={styles.gradientBackground}
//       />

//       {/* <Camera
//         ref={camera}
//         style={StyleSheet.absoluteFill}
//         device={device}
//         isActive={!showUploadModal}
//         video={true}
//         audio={true}
//         photo={false}
//       /> */}
//       <Camera
//         ref={camera}
//         style={StyleSheet.absoluteFill}
//         device={device}
//         isActive={!showUploadModal}
//         video={true}
//         audio={true}
//         photo={false}
//         enableAudio={true} // <-- add this line
//       />

//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backButtonContainer}
//           onPress={() => navigation.goBack()}
//           activeOpacity={0.7}>
//           <Text style={styles.backButton}>Back</Text>
//         </TouchableOpacity>
//         <Text style={styles.title}>Live Recording</Text>
//       </View>

//       <View style={styles.overlay}>
//         {isRecording ? (
//           <TouchableOpacity
//             style={[styles.actionButton, styles.stopButton]}
//             onPress={handleStopRecording}>
//             <Ionicons name="stop-circle" size={30} color="#ffffff" />
//             <Text style={styles.buttonText}>Stop Recording</Text>
//           </TouchableOpacity>
//         ) : (
//           <TouchableOpacity
//             style={[styles.actionButton, styles.recordButton]}
//             onPress={handleStartRecording}>
//             <Ionicons name="videocam" size={30} color="#ffffff" />
//             <Text style={styles.buttonText}>Start Recording</Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       {/* Upload Confirmation Modal */}
//       <Modal
//         visible={showUploadModal}
//         transparent={true}
//         animationType="fade"
//         onRequestClose={() => setShowUploadModal(false)}>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <View style={styles.modalContent}>
//               <MaterialIcons name="video-library" size={60} color="#000080" />
//               <Text style={styles.modalTitle}>Recording Complete</Text>
//               <Text style={styles.modalText}>
//                 Do you want to upload this recording?
//               </Text>

//               <View style={styles.modalButtonRow}>
//                 <TouchableOpacity
//                   style={[styles.modalButton, styles.cancelButton]}
//                   onPress={() => setShowUploadModal(false)}>
//                   <Text style={styles.modalButtonText}>Cancel</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={[styles.modalButton, styles.uploadButton]}
//                   onPress={uploadVideo}>
//                   <Text style={styles.modalButtonText}>Upload</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   gradientBackground: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     opacity: 0.2,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   backButtonContainer: {
//     padding: 5,
//   },
//   backButton: {
//     color: '#ffffff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   title: {
//     color: '#ffffff',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginLeft: 10,
//   },
//   overlay: {
//     position: 'absolute',
//     bottom: 30,
//     left: 0,
//     right: 0,
//     alignItems: 'center',
//   },
//   actionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 30,
//   },
//   recordButton: {
//     backgroundColor: '#FF4500',
//   },
//   stopButton: {
//     backgroundColor: '#1E90FF',
//   },
//   buttonText: {
//     color: '#ffffff',
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginLeft: 10,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#000',
//   },
//   loadingText: {
//     color: '#ffffff',
//     fontSize: 16,
//     marginTop: 10,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     width: '80%',
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 20,
//     alignItems: 'center',
//   },
//   modalContent: {
//     alignItems: 'center',
//     padding: 10,
//   },
//   modalTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#000080',
//     marginVertical: 10,
//   },
//   modalText: {
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   modalButtonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//   },
//   modalButton: {
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 25,
//     marginHorizontal: 5,
//     minWidth: 120,
//     alignItems: 'center',
//   },
//   cancelButton: {
//     backgroundColor: '#FF4444',
//   },
//   uploadButton: {
//     backgroundColor: '#000080',
//   },
//   modalButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default RecordLiveScreen;

import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Dimensions,
  Modal,
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ip_adress} from './IP-config';

const {width, height} = Dimensions.get('window');

const RecordLiveScreen = ({navigation, route}) => {
  const {sessionId, coachId} = route.params;
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    const checkPermissions = async () => {
      try {
        let cameraPermission = await Camera.getCameraPermissionStatus();
        let microphonePermission = await Camera.getMicrophonePermissionStatus();

        if (cameraPermission !== 'authorized') {
          cameraPermission = await Camera.requestCameraPermission();
        }
        if (microphonePermission !== 'authorized') {
          microphonePermission = await Camera.requestMicrophonePermission();
        }

        if (
          cameraPermission !== 'authorized' ||
          microphonePermission !== 'authorized'
        ) {
          Alert.alert(
            'Permission Required',
            'Please enable camera and microphone permissions in settings',
            [{text: 'OK', onPress: () => navigation.goBack()}],
          );
          return;
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Permission check failed:', error);
        Alert.alert('Error', 'Failed to check permissions');
        navigation.goBack();
      }
    };
    checkPermissions();
  }, [navigation]);

  const handleStartRecording = async () => {
    if (!camera.current) {
      Alert.alert('Error', 'Camera not available');
      return;
    }
    try {
      setIsRecording(true);
      await camera.current.startRecording({
        onRecordingFinished: video => {
          console.log('Recording finished:', video.path);
          setRecordedVideo({
            uri: video.path,
            type: 'video/mp4',
            name: `session_${sessionId}_${Date.now()}.mp4`,
          });
          setShowUploadModal(true);
        },
        onRecordingError: error => {
          console.error('Recording error:', error);
          Alert.alert('Error', 'Failed to record video');
          setIsRecording(false);
        },
      });
    } catch (error) {
      console.error('Start recording error:', error);
      Alert.alert('Error', 'Failed to start recording');
      setIsRecording(false);
    }
  };

  const handleStopRecording = async () => {
    try {
      if (camera.current) {
        await camera.current.stopRecording();
      }
    } catch (error) {
      console.error('Stop recording error:', error);
    } finally {
      setIsRecording(false);
    }
  };

  const uploadVideo = async () => {
    if (!recordedVideo || !sessionId) {
      Alert.alert('Error', 'No video recorded');
      return;
    }
    const formData = new FormData();
    formData.append('video', {
      uri: recordedVideo.uri,
      type: recordedVideo.type,
      name: recordedVideo.name,
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
      if (!response.ok) throw new Error(data.message || 'Upload failed');

      Alert.alert('Success', 'Video uploaded successfully', [
        {text: 'OK', onPress: () => navigation.goBack()},
      ]);
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', error.message || 'Failed to upload video');
    } finally {
      setShowUploadModal(false);
    }
  };

  if (isLoading || !device) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>
          {!device ? 'Camera device not found' : 'Loading Camera...'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#A8E6CF', '#DCEDC1']}
        style={styles.gradientBackground}
      />

      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={!showUploadModal}
        video={true}
        audio={true}
        photo={false}
        enableAudio={true}
      />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Live Recording</Text>
      </View>

      <View style={styles.overlay}>
        {isRecording ? (
          <TouchableOpacity
            style={[styles.actionButton, styles.stopButton]}
            onPress={handleStopRecording}>
            <Ionicons name="stop-circle" size={30} color="#ffffff" />
            <Text style={styles.buttonText}>Stop Recording</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.actionButton, styles.recordButton]}
            onPress={handleStartRecording}>
            <Ionicons name="videocam" size={30} color="#ffffff" />
            <Text style={styles.buttonText}>Start Recording</Text>
          </TouchableOpacity>
        )}
      </View>

      <Modal
        visible={showUploadModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowUploadModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <MaterialIcons name="video-library" size={60} color="#000080" />
              <Text style={styles.modalTitle}>Recording Complete</Text>
              <Text style={styles.modalText}>
                Do you want to upload this recording?
              </Text>

              <View style={styles.modalButtonRow}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setShowUploadModal(false)}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, styles.uploadButton]}
                  onPress={uploadVideo}>
                  <Text style={styles.modalButtonText}>Upload</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backButtonContainer: {
    padding: 5,
  },
  backButton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  overlay: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  recordButton: {
    backgroundColor: '#FF4500',
  },
  stopButton: {
    backgroundColor: '#1E90FF',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalContent: {
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#000080',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',
  },
  modalButtonRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  uploadButton: {
    backgroundColor: '#000080',
  },
  modalButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RecordLiveScreen;
