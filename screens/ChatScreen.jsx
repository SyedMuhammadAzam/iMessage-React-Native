import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import Pusher from "pusher-js/react-native";
import { ActivityIndicator, Colors } from "react-native-paper";
import moment from "moment";

const pusher = new Pusher("Your_key", {
  cluster: "ap2",
});

const ChatScreen = ({ route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [dataEnd, setDataEnd] = useState(false);

  const id = 1;
  var channel;
  const flatlistRef = useRef();

  //const channel = pusher
  useEffect(() => {
    channel = pusher.subscribe("1-2");

    pusher.connection.bind("error", function (err) {
      if (err.error.data.code === 4004) {
        console.log("Over limit!");
      }
    });

    channel.bind("my-event", (data) => {
      setMessages((old) => [data.message, ...old]);
    });
  }, []);

  const { userName } = route.params;

  const sendMessage = (message) => {
    Keyboard.dismiss();
    setInput("");
    // console.log(input);
    // console.log("sendddddddd messsageeee");
    fetch(
      `https://imessage-augmentler.herokuapp.com/api/message/store/1/2/${input}`,
      {
        method: "GET",
      }
    );
    // console.log(messages);
  };
  const getApi = () => {
    setLoading(true);

    fetch(
      `https://imessage-augmentler.herokuapp.com/api/message/fetch/1/2/${offset}&results=20`
    )
      .then((res) => res.json())
      .then((res) => {
        // json.forEach((item) =>
        setMessages([...messages, ...res]);
        if (res.length < 20) {
          setDataEnd(true);
        }
        setOffset(offset + 20);
        setLoading(false);
        // )
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getApi();
  }, []);

  const renderLoader = () => {
    return loading ? (
      <ActivityIndicator
        style={{ marginTop: 10 }}
        animating={true}
        color={Colors.grey800}
      />
    ) : null;
  };
  const loadMore = () => {
    console.log("load more items");
    if (dataEnd == false) {
      getApi();
    }
  };
  const onPressFunction = () => {
    flatlistRef.current.scrollToEnd({ animating: true });
  };

  const groupByDate = () => {
    // var items = messages
    // let msgs = items.reduce((groups, game) => {
    // let date = moment(items.created_at).calendar()
    //   if (!groups[date]) {
    //     groups[date] = [];
    //   }
    //   groups[date].push(game);
    //   return groups;
    // }, {});
    // var groupedMsg = []
    // const groupArrays = Object.keys(msgs).map((date) => {
    //   return {
    //     date,
    //     groupedMsg: msgs[date]
    //   };
    // });
    // console.log(groupArrays)
    // return groupedMsg


    let finalObj = {}
    let groupedData = []
    messages.map((item) => {
      const date = moment(item.created_at).format("dddd");
      if (finalObj[date] != undefined) {
        finalObj[date].push(item);
      } else {
        finalObj[date] = [item];
      }
    });
    Object.keys(finalObj).map((day) => {
      finalObj[day].map((msg) => {
        groupedData.push(msg)
      })
      groupedData.push({custom: true, msg: day})
    })    
    return groupedData;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "biscuit" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
        style={styles.container}
      >
        <>
          <View
            style={{
              flex: 1,
              right: 0,
              marginRight: 3,
              bottom: 0,
            }}
          >
            <>
              <View>
                {/* {messages.map((data) => (
                    <View style={styles.sender}>
                      <Text>{data}</Text>
                    </View>
                  ))} */}

                <FlatList
                  ref={flatlistRef}
                  data={groupByDate()}
                  ListFooterComponent={renderLoader}
                  onEndReached={loadMore}
                  onEndReachedThreshold={0}
                  inverted
                  keyExtractor={(item, index) => {
                    return index.toString();
                  }}
                  renderItem={({ item }) => (
                    <>
                    {item.custom ? (
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                      <View>
                        <Text style={{width: 90, textAlign: 'center', fontWeight:'700'}}>{item.msg}</Text>
                      </View>
                      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                    </View>
                    ): (
                      <View
                        style={[
                          item.sender_id === id
                            ? styles.sender
                            : styles.reciever,
                        ]}
                      >
                        {/* <FontAwesome  style={{ position:'absolute' , right:-12 ,top:18 }} name="user" size={30}  color="black"  /> */}
                        {/* <Text>{moment(item.created_at).calendar()}</Text> */}
                        <Text
                          style={[
                            item.sender_id === id
                              ? { color: "black", fontSize: 15 }
                              : { color: "white", fontSize: 15 },
                          ]}
                        >
                          {item.message}
                        </Text>
                        <Text
                          style={[
                            item.sender_id === id
                              ? {
                                  color: "black",
                                  fontSize: 11,
                                  alignSelf: "flex-start",
                                  right: -2,
                                  top: 4,
                                }
                              : {
                                  color: "white",
                                  fontSize: 11,
                                  alignSelf: "flex-end",
                                  left: -2,
                                  top: 4,
                                },
                          ]}
                        >
                          {moment(item.created_at).format("hh:mm")}
                        </Text>
                      </View>
                    )}
                    </>
                  )}
                />
                <Pressable
                  android_ripple
                  style={styles.button}
                  onPress={onPressFunction}
                >
                  <Text style={{ fontSize: 0 }}>A</Text>
                </Pressable>
              </View>
              {/*               
                <View style={{ alignItems: "flex-start" }}>
                  {reciever.map((data) => (
                    <View style={styles.reciever}>
                      <Text style={{ color: "white" }}>{data}</Text>
                    </View>
                  ))}
                </View> */}
            </>
          </View>
          <View style={styles.footer}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Type Your Message here ..."
              style={styles.textInput}
              onSubmitEditing={sendMessage}
            />
            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
              <MaterialCommunityIcons
                name="send-circle"
                size={36}
                color="#0066CC"
                style={{ bottom: 4 }}
              />
            </TouchableOpacity>
          </View>
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

// const renderSend = (props) => {
//     return(
//     <Send {...props}>
//         <View style={{justifyContent:'center' , alignItems:'center' , marginRight:8,marginBottom:4}}>
//         <MaterialCommunityIcons name="send-circle"  size={32} color='#51A0D5' />
//         </View>
//       </Send>
//     )
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  textInput: {
    bottom: 5,
    height: 40,
    flex: 1,
    borderRadius: 20,
    backgroundColor: "#D9D6D0",
    borderColor: "transparent",
    color: "grey",
    padding: 10,
    marginRight: 10,
  },
  sender: {
    padding: 15,
    alignSelf: "flex-end",
    backgroundColor: "#D9D6D0",
    borderColor: "transparent",
    borderRadius: 15,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  reciever: {
    padding: 15,
    alignSelf: "flex-start",
    backgroundColor: "#0066CC",
    color: "white",
    borderColor: "transparent",
    borderRadius: 15,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  button: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 50 / 2,
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
    right: 10,
    bottom: 30,
  },
});
