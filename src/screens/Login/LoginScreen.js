import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar
} from "react-native";
import firebase from "firebase";
import Input from "../../components/UI/Input/Input";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import validate from "../../Utility/Validation";
import Spinner from "../../components/UI/Spinner/Spinner";
import SplashScreen from "react-native-splash-screen";

class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
    drawerLabel: "Login"
  };
  state = {
    authMode: "login",
    error: "",
    loading: false,
    loggedIn: null,
    controls: {
      email: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
      password: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 8
        },
        touched: false
      },
      confirmPassword: {
        value: "",
        valid: false,
        validationRules: {
          equalTo: "password"
        },
        touched: false
      }
    }
  };

  componentDidMount() {
    SplashScreen.hide();
  }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyC41G9iL80Ttdy5_aGcS9tw18o1kdtHjRA",
      authDomain: "fastpay-88b86.firebaseapp.com",
      databaseURL: "https://fastpay-88b86.firebaseio.com",
      projectId: "fastpay-88b86",
      storageBucket: "fastpay-88b86.appspot.com",
      messagingSenderId: "440323320472"
    });
    firebase.auth().onAuthStateChanged(user => {
      user
        ? this.setState({ loggedIn: true })
        : this.setState({ loggedIn: false });

      console.log(this.state.loggedIn);
    });
    console.log(this.state.loggedIn);
  }

  goToQRScreen = () => {
    switch (this.state.loggedIn) {
      case true:
        return this.props.navigation.navigate("QRscanner", {
          onPress: () => firebase.auth().signOut()
        });
        break;
      case false:
        return this.props.navigation.navigate("Login");
        break;

      default:
        return <Spinner size="large" />;
        break;
    }
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === "login" ? "signup" : "login"
      };
    });
  };
  loggedInHandler = () => {
    const email = this.state.controls.email.value;
    const password = this.state.controls.password.value;
    this.setState({ error: "", loading: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onLogginSuccess.bind(this))
      .catch(this.onLogginFail.bind(this));
  };
  signUpHandler = () => {
    const email = this.state.controls.email.value;
    const password = this.state.controls.password.value;
    this.setState({ error: "", loading: true });
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(this.onLogginSuccess.bind(this))
      .catch(this.onLogginFail.bind(this));
  };

  onLogginFail = () => {
    this.setState({
      error: "Greska!!! Pokusajte ponovo!",
      loading: false
    });
  };
  onLogginSuccess = () => {
    this.setState({
      controls: {
        email: {
          value: "",
          valid: false,
          validationRules: {
            isEmail: true
          },
          touched: false
        },
        password: {
          value: "",
          valid: false,
          validationRules: {
            minLength: 8
          },
          touched: false
        },
        confirmPassword: {
          value: "",
          valid: false,
          validationRules: {
            equalTo: "password"
          },
          touched: false
        }
      },
      loading: false,
      error: ""
    });
  };
  updateInputStateHandler = (key, value) => {
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      const equalCtrl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalCtrl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }
    if (key === "password") {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid:
              key === "password"
                ? validate(
                    prevState.controls.confirmPassword.value,
                    prevState.controls.confirmPassword.validationRules,
                    connectedValue
                  )
                : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            ),
            touched: true
          }
        }
      };
    });
  };
  render() {
    let confirmPasswordControl = null;
    let buttonOrSpinner = null;
    if (this.state.authMode === "signup") {
      confirmPasswordControl = (
        <Input
          placeholder="Potvrdi Sifru"
          placeholderTextColor="#1DA1F2"
          style={styles.input}
          value={this.state.controls.confirmPassword.value}
          onChangeText={val =>
            this.updateInputStateHandler("confirmPassword", val)
          }
          valid={this.state.controls.confirmPassword.valid}
          touched={this.state.controls.confirmPassword.touched}
          secureTextEntry
        />
      );
    }

    if (this.state.loading) {
      buttonOrSpinner = <Spinner size="small" />;
    } else {
      buttonOrSpinner = (
        <CustomButton
          color="#1DA1F2"
          // width={"40%"}
          onPress={
            this.state.authMode === "login"
              ? this.loggedInHandler
              : this.signUpHandler
          }
          disabled={
            this.state.authMode === "login"
              ? !this.state.controls.password.valid ||
                !this.state.controls.email.valid
              : !this.state.controls.confirmPassword.valid ||
                !this.state.controls.password.valid ||
                !this.state.controls.email.valid
          }
        >
          {this.state.authMode === "login" ? "Login" : "SignUp"}
        </CustomButton>
      );
    }

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          <View style={styles.switch}>
            <CustomButton
              color="#1DA1F2"
              width={"20%"}
              onPress={this.switchAuthModeHandler}
            >
              {this.state.authMode === "login" ? "SignUp" : "Login"}
            </CustomButton>
          </View>
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Input
                placeholder="E-Mail"
                placeholderTextColor="#1DA1F2"
                style={styles.input}
                value={this.state.controls.email.value}
                onChangeText={val => this.updateInputStateHandler("email", val)}
                valid={this.state.controls.email.valid}
                touched={this.state.controls.email.touched}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
              />
              <Input
                placeholder="Sifra"
                placeholderTextColor="#1DA1F2"
                style={styles.input}
                value={this.state.controls.password.value}
                onChangeText={val =>
                  this.updateInputStateHandler("password", val)
                }
                valid={this.state.controls.password.valid}
                touched={this.state.controls.password.touched}
                secureTextEntry
              />
              {confirmPasswordControl}
            </View>
            {this.goToQRScreen()}
            <Text style={styles.errorTextStyle}>{this.state.error}</Text>
            {buttonOrSpinner}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  switch: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  container: {
    flex: 9,
    alignItems: "center",
    justifyContent: "center"
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  textHeading: {
    fontSize: 28,
    fontWeight: "bold"
  },
  input: {
    backgroundColor: "white",
    borderColor: "#1DA1F2"
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "red"
  }
});

export default LoginScreen;
