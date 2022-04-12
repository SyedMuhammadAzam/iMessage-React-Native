import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/MessageScreen";
import ChatScreen from "./screens/ChatScreen";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="iMessage" component={HomeScreen} />
        <Stack.Screen
          name="Chat Screen"
          component={ChatScreen}
          options={({ route }) => ({
            title: route.params.userName,
            headerBackTitleVisible: true,
            headerTitleAlign: "center",
            headerRight: () => (
              <View style={{ flexDirection: "row", paddingRight: 20 }}>
                <Ionicons
                  name="md-videocam"
                  style={{ right: 20 }}
                  size={28}
                  color="#0066CC"
                />
                <Ionicons name="ios-call" size={24} color="#0066CC" style={{top:1}} />
              </View>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
