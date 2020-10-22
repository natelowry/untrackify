import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, Keyboard, KeyboardAvoidingView, Linking, Platform, Share, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';

export default function App() {
  const [inputURL, setInputURL] = useState('www.yoursite.com/pricing?rand=123&q=123&id=432&utm_source=active%20users&utm_medium=email&utm_campaign=feature%20launch&utm_content=bottom%20cta%20button');

  var params = [{ key: "", val: "" }];
  let split = inputURL.split("?");
  var urlBase = inputURL;
  if (split.length === 2) {
    urlBase = split[0];
    params = split[1].split("&").map(s => {
      const x = s.split("=")
      return {
        key: x[0],
        val: x[1],
      }
    });

  }
  const goodiesList = ["id", "q", "s", "query", "search"];

  const goodies = params.filter(s => goodiesList.includes(s.key));
  // console.log("good");
  // console.log(goodies);

  const baddies = params.filter(s => s.key.startsWith("utm") || s.key == "ref");
  // console.log("bad");
  // console.log(baddies);

  const theRest = params.filter(p => !goodies.includes(p) && !baddies.includes(p))
  // console.log("rest");
  // console.log(theRest);

  const cleanedURL = `${urlBase}?${(goodies.concat(theRest).map(x => `${x.key}=${x.val}`).join("&"))}`;

  return (
    <KeyboardAvoidingView
      style={{ paddingTop: 25 }}
      behavior={Platform.OS == "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Button title="SHARE THE UNTRACKED" onPress={() => Share.share({ message: cleanedURL })} />

          <Text>Enter a URL:</Text>
          <TextInput
            multiline={true}
            style={{ height: 100 }}
            defaultValue={inputURL}
            onChangeText={text => setInputURL(text)}
            placeholder="https://f.me/?utm_source=123445"
          />

          <Button title="CLEAR" onPress={() => setInputURL('')} />

          {goodies.map(goodie =>
            <Text key={goodie.key} style={{ color: "green" }}>{goodie.key}</Text>
          )}

          {theRest.map(p =>
            <Text key={p.key}>{p.key}</Text>
          )}

          {baddies.map(baddie =>
            <Text key={baddie.key} style={{ color: "red" }}>{baddie.key}</Text>
          )}

          <Text>
            {cleanedURL}
          </Text>

          <Button title="SHARE THE UNTRACKED" onPress={() => Share.share({ message: cleanedURL })} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
