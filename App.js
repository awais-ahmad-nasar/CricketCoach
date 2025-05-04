// import React from 'react'; // this gives basic components and functionalities
// import {View, Text, StyleSheet, Button} from 'react-native';
// import Calculator from './Contents/Forms/Calculator';
// import Login from './Contents/Forms/Login';
// import Signup from './Contents/Forms/SingnUp';

// import QuizApp from './Contents/Forms/Assingment1';
// import TaskApp from './Contents/Forms/SuperLab5';
// import DBConnectivity from './Contents/Forms/DataBase';

// import RestApp from './Contents/Forms/Resturant';
// import AddUsers from './Contents/Forms/SingnUp';
// import Parking from './Contents/Forms/CatParkingSystem';
// import ElectricityBillCalculator from './Contents/Forms/MIDS Electricity Bill Calculator';
// import SocialAppForm from './Contents/Forms/MIDS Social App Form';
// import CarFindingApp from './Contents/Forms/MIDS Car Finding';
// import MovieApp from './Contents/Forms/MIDS Car Finding';
// import CarSearchApp from './Contents/Forms/MIDS Car Finding';
// import DeleteEmpFromFlatList from './Contents/Forms/DelEmpFromList';
// import TestCodes from './Contents/Forms/SirCode1';
// import HomeScreen from './Contents/Forms/SirCode2';
// import FlatListExample from './Contents/Forms/SirCode3';
// import EmployeeForm from './Contents/Forms/UnsuperLab5';
// import UnsuperLab10 from './Contents/Forms2/SuperLab10';
// import ImageOperations from './Contents/Forms2/SuperLab10';
// import MobileAppTask from './Contents/Forms/MobileShop';
// import TeamScreen from './Contents/CricketCoachingSystem/TeamScreen';
// import AddTeamScreen from './Contents/CricketCoachingSystem/AddTeam';
// import ViewTeamsScreen from './Contents/CricketCoachingSystem/ViewTeams';
// import PlayerScreen from './Contents/CricketCoachingSystem/PlayerScreen';
// import ViewPlayersScreen from './Contents/CricketCoachingSystem/ViewPlayers';
// import AddPlayerScreen from './Contents/CricketCoachingSystem/AddPlayer';
// import NavigationCode from './Contents/Forms2/SuperLab12';
// import Maps from './Contents/Forms2/MapViewCode';
// import Maps2 from './Contents/Forms2/MapViewCode2';
// import ImageOperations2 from './Contents/Forms2/SuperLab10_1';
// const App = () => {
//   return (
//     <View style={{flex: 1}}>
//       {/* <Calculator /> */}
//       {/* <Login /> */}
//       {/* <Signup /> */}
//       {/* <DeleteEmpFromFlatList /> */}
//       {/* <TestCodes /> */}
//       {/* <FlatListExample /> */}
//       {/* <EmployeeForm /> */}

//       {/* <TaskApp /> */}
//       {/* <DBConnectivity /> */}
//       {/* <RestApp /> */}
//       {/* <AddUsers /> */}
//       {/* <Parking /> */}

//       {/* <QuizApp /> */}

//       {/* <ElectricityBillCalculator /> */}
//       {/* <SocialAppForm /> */}
//       {/* <CarSearchApp /> */}

//       {/* <EmployeeForm /> */}
//       {/* <Calculator /> */}
//       {/* <MobileAppTask /> */}
//       {/* .......................After MIDS....................... */}
//       {/* <ImageOperations /> */}
//       {/* <ImageOperations2 /> */}

//       {/* <><><><><><><><>Project of MAP<><><><><><><><> */}
//       {/* <TeamScreen /> */}
//       {/* <AddTeamScreen /> */}
//       {/* <ViewTeamsScreen /> */}

//       {/* <PlayerScreen /> */}
//       {/* <ViewPlayersScreen />

//       <AddPlayerScreen /> */}
//       {/* <Maps /> */}
//       {/* <Maps2 /> */}
//     </View>

//     // <NavigationCode />
//   );
// };

// export default App;

// ************************ Assignment2 ************************

// import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import {
//   SignInScreen,
//   SignUpScreen,
//   HomeScreen,
// } from './Contents/Forms2/Navigation';

// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="SignIn"
//         screenOptions={{
//           headerShown: false, // This removes the header for all screens
//         }}>
//         <Stack.Screen name="SignIn" component={SignInScreen} />
//         <Stack.Screen name="SignUp" component={SignUpScreen} />
//         <Stack.Screen name="Home" component={HomeScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;

// <><><><><><><><><><><><><><><> MAP PROJECT <><><><><><><><><><><><><><><>

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  SignInScreen,
  SignUpScreen,
  HomeScreen,
} from './Contents/Forms2/Navigation';
import TeamScreen from './Contents/CricketCoachingSystem/M_MainTeamScreen';
import AddTeamScreen from './Contents/CricketCoachingSystem/M-AddTeam';
import ViewTeamsScreen from './Contents/CricketCoachingSystem/M_ViewTeams';
import PlayerScreen from './Contents/CricketCoachingSystem/M_MainPlayerScreen';
import AddPlayerScreen from './Contents/CricketCoachingSystem/M-AddPlayer';
import ViewPlayersScreen from './Contents/CricketCoachingSystem/M_ViewPlayers';
import ViewManagersScreen from './Contents/CricketCoachingSystem/ViewManagers';
import CoachScreen from './Contents/CricketCoachingSystem/M_MainCoachScreen';
import ViewCoachesScreen from './Contents/CricketCoachingSystem/M_ViewCoaches';
import AddCoachScreen from './Contents/CricketCoachingSystem/M-AddCoach';
import LandingScreen from './Contents/CricketCoachingSystem/LandingScreeen';
import SigInScreen from './Contents/CricketCoachingSystem/SingInScreen';

import ManagerDashboard from './Contents/CricketCoachingSystem/Manager Dashboard';
import CoachDashboard from './Contents/CricketCoachingSystem/Coach Dashboard';
import PlayerDashboard from './Contents/CricketCoachingSystem/Player Dashboard';

import ArrangeSessionScreen from './Contents/CricketCoachingSystem/C-ArrangeSession';
import ViewArrangedSessionsScreen from './Contents/CricketCoachingSystem/C-ViewArrangedSession';
import CoachViewTeamScreen from './Contents/CricketCoachingSystem/C-ViewTeam';
import CoachViewPlayersScreen from './Contents/CricketCoachingSystem/C-ViewPlayersScreen';
import RecordSessionScreen from './Contents/CricketCoachingSystem/C-RecordSessionScreen';
import RecordLiveScreen from './Contents/CricketCoachingSystem/C-LiveRecord';
import VideoPreviewScreen from './Contents/CricketCoachingSystem/C-VideoPreviou';
import PerformanceScreen from './Contents/CricketCoachingSystem/C-PlayerPerformanceScreen';
import ShotDetailScreen from './Contents/CricketCoachingSystem/C-ShotByShot-DetailScreen';

import ViewJoinedSessionScreen from './Contents/CricketCoachingSystem/P-ViewJoinedSessionScreen';
import PlayerPerformanceScreen from './Contents/CricketCoachingSystem/P-PlayerPerformanceScreen';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LandingScreen"
        // initialRouteName="managerdashboard"
        screenOptions={{
          headerShown: false, // This removes the header for all screens
        }}>
        <Stack.Screen name="LandingScreen" component={LandingScreen} />
        <Stack.Screen name="SignIn" component={SigInScreen} />

        {/* ****** Admin Dashbord Screens flow ***** */}
        <Stack.Screen name="managerdashboard" component={ManagerDashboard} />

        <Stack.Screen name="CoachScreen" component={CoachScreen} />
        <Stack.Screen name="ViewCoachesScreen" component={ViewCoachesScreen} />
        <Stack.Screen name="AddCoacheScreen" component={AddCoachScreen} />

        <Stack.Screen name="TeamScreen" component={TeamScreen} />
        <Stack.Screen name="AddTeamScreen" component={AddTeamScreen} />
        <Stack.Screen name="ViewTeamsScreen" component={ViewTeamsScreen} />

        <Stack.Screen name="PlayerScreen" component={PlayerScreen} />
        <Stack.Screen name="AddPlayerScreen" component={AddPlayerScreen} />
        <Stack.Screen name="ViewPlayersScreen" component={ViewPlayersScreen} />

        {/* ****** Coach Dashbord Screens flow ***** */}
        <Stack.Screen name="Coachdashboard" component={CoachDashboard} />
        <Stack.Screen name="ArrangeSession" component={ArrangeSessionScreen} />
        <Stack.Screen
          name="ViewArrangedSessions"
          component={ViewArrangedSessionsScreen}
        />
        <Stack.Screen name="CoachViewTeam" component={CoachViewTeamScreen} />
        <Stack.Screen
          name="CoachViewPlayers"
          component={CoachViewPlayersScreen}
        />
        <Stack.Screen
          name="RecordSessionScreen"
          component={RecordSessionScreen}
        />

        <Stack.Screen name="RecordLiveScreen" component={RecordLiveScreen} />
        <Stack.Screen
          name="VideoPreviewScreen"
          component={VideoPreviewScreen}
        />
        <Stack.Screen name="PerformanceScreen" component={PerformanceScreen} />
        <Stack.Screen name="ShotDetailScreen" component={ShotDetailScreen} />

        {/* ****** Player Dashbord Screens flow ***** */}
        <Stack.Screen name="Playerdashboard" component={PlayerDashboard} />
        <Stack.Screen
          name="ViewJoinedSession"
          component={ViewJoinedSessionScreen}
        />
        <Stack.Screen
          name="PlayerPerformanceScreen"
          component={PlayerPerformanceScreen}
        />

        {/* 
        <Stack.Screen
          name="ViewManagersScreen"
          component={ViewManagersScreen}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
