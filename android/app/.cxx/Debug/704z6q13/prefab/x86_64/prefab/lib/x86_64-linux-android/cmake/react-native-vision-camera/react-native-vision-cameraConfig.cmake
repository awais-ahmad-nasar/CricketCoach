if(NOT TARGET react-native-vision-camera::VisionCamera)
add_library(react-native-vision-camera::VisionCamera SHARED IMPORTED)
set_target_properties(react-native-vision-camera::VisionCamera PROPERTIES
    IMPORTED_LOCATION "D:/ReactNativeProject/CricketCoach/node_modules/react-native-vision-camera/android/build/intermediates/cxx/Debug/1d66441d/obj/x86_64/libVisionCamera.so"
    INTERFACE_INCLUDE_DIRECTORIES "D:/ReactNativeProject/CricketCoach/node_modules/react-native-vision-camera/android/build/headers/visioncamera"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

