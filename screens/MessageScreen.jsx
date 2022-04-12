import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";

const Messages = [
  {
    id: "1",
    userName: "Salman",
    userImg: require("../user.jpeg"),
    messageTime: "4 mins ago",
    messageText: "Tap Here to start messaging ",
  },
  {
    id: "2",
    userName: "Max",
    userImg: require("../user.jpeg"),
    messageTime: "4 mins ago",
    messageText: "Tap Here to start messaging",
  },
  {
    id: "3",
    userName: "Finch",
    userImg: require("../user.jpeg"),
    messageTime: "4 mins ago",
    messageText: "Tap Here to start messaging",
  },
  {
    id: "4",
    userName: "Root",
    userImg: require("../user.jpeg"),
    messageTime: "4 mins ago",
    messageText: "Tap Here to start messaging ",
  },
  {
    id: "5",
    userName: "Jason",
    userImg: require("../user.jpeg"),
    messageTime: "4 mins ago",
    messageText: "Tap Here to start messaging",
  },
  {
    id: "6",
    userName: "Roy",
    userImg: require("../user.jpeg"),
    messageTime: "4 mins ago",
    messageText: "Tap Here to start messaging",
  },
];

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={Messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{}}
              onPress={() =>
                navigation.navigate("Chat Screen", { userName: item.userName })
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottomWidth: 1,
                  borderBottomColor: "#cccccc",
                }}
              >
                <View
                  style={{ paddingTop: 15, paddingBottom: 15, marginRight: 10 }}
                >
                  <Image
                    style={{ height: 45, width: 45, borderRadius: 30 }}
                    source={item.userImg}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: 15,
                    paddingLeft: 0,
                    marginLeft: 0,
                    width: 300,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 10,
                    }}
                  >
                    <Text style={{ fontSize: 18, fontWeight: "500" }}>
                      {item.userName}
                    </Text>
                    <Text
                      style={{
                        marginTop: 4,
                        fontSize: 12,
                        color: "#666",
                      }}
                    >
                      {item.messageTime}
                    </Text>
                  </View>
                  <Text
                    style={{ fontSize: 14, color: "#333333", marginTop: 0 }}
                  >
                    {item.messageText}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
});
