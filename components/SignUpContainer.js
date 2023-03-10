import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

export default function SignUpContainer({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const validateEmail = (val) => {
    if (val.includes("@")) {
      setEmailIsValid(true);
      setEmail(val);
    } else {
      setEmailIsValid(false);
    }
  };

  const validatePassword = (val) => {
    if (val.length >= 8) {
      setPasswordIsValid(true);
      setPassword(val);
    } else {
      setPasswordIsValid(false);
    }
  };

  useEffect(() => {
    if (emailIsValid && passwordIsValid) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [emailIsValid, passwordIsValid]);

  const handlePress = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.navigate("Chatroom");
      })

      .catch(() => console.log("Failed"));
  };

  const loginHandler = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          onChangeText={validateEmail}
          defaultValue={email}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          textContentType="password"
          secureTextEntry="true"
          onChangeText={validatePassword}
          defaultValue={password}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              fontWeight: "700",
              width: "100%",
              textAlign: "center",
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            textAlign: "center",
            marginTop: 20,
          }}
          onPress={loginHandler}
        >
          Already a member? Click here to login.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(166, 130, 80, 0.2)",
    justifyContent: "center",
  },
  content: {
    justifyContent: "center",
    padding: 20,
  },
  input: {
    backgroundColor: "#fff",

    borderRadius: 10,
    padding: 20,
    margin: 10,
  },
  button: {
    backgroundColor: "#A68250",
    color: "#fff",
    fontWeight: "800",
    borderRadius: 20,
    padding: 15,
    marginTop: 20,
    marginHorizontal: 10,
  },
});
