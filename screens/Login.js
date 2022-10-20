import { View, Text, ActivityIndicator, AsyncStorage } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

//icons
import { Octicons, Ionicons, Fontisto } from "@expo/vector-icons";

//formik
import { Formik } from "formik";

import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  Colors,
  StyledButton,
  ButtonText,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from "./../components/styles";

//Colors
const { brand, darkLigth, primary } = Colors;

//keyboard avoiding wrapper
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

//API client
import axios from "axios";
import * as Google from "expo-google-app-auth";

 

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  //api call
  const handleLogin = (credentials, setSubmitting) => {
    handleMessage(null);
    const url = "https://whispering-headland-00232.herokuapp.com/user/signin";

    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { message, status, data } = result;

        if (status !== "SUCCESS") {
          handleMessage(message, status);
        } else {
          navigation.navigate("Welcome", { ...data[0] });
        }
        setSubmitting(false);
      })
      .catch((error) => {
        console.log(error.JSON());
        setSubmitting(false);
        handleMessage("An error occured. Check your network and try again");
      });
  };

  const handleMessage = (message, type = "FAILED") => {
    setMessage(message);
    setMessageType(type);
  };

  //Google Login

  const handleGoogleSignin = () => {
    setGoogleSubmitting(true);

    const config = {
      iosClientId: `892027722343-90pr5qkbi28r4up866mndj0d81imfnov.apps.googleusercontent.com`,
      androidClientId: `892027722343-e09gbtk956ngncs5j9lgve68bv1r09uh.apps.googleusercontent.com`,
      scopes: ["profile", "email"],
    };

    Google.logInAsync(config)
      .then((result) => {
        const { type, user } = result;

        if (type == "success") {
          const { email, name, photoUrl } = user;
          handleMessage("Google signin sucessful", "SUCCESS");
          setTimeout(
            () => navigation.navigate("Welcome", { email, name, photoUrl }),
            1000
          );
        } else {
          handleMessage("Google Signin Cancelled");
        }
        setGoogleSubmitting(false)
      })
      .catch((error) => {
        console.log(error);
        handleMessage("An error occured. ");
        setGoogleSubmitting(false);
      });
  };

  

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageLogo
            resizeMode="cover"
            source={require("./../assets/img/img1.jpg")}
          />
          <PageTitle>Flower Crib</PageTitle>
          <SubTitle>Account Login</SubTitle>

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.email == "" || values.password == "") {
                handleMessage("Please fill all the fields");
                setSubmitting(false);
              } else {
                handleLogin(values, setSubmitting);
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              isSubmitting,
            }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Email Address"
                  icon="mail"
                  placeholder="abcd@gmail.com"
                  placeholderTextColor={darkLigth}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                />
                <MyTextInput
                  label="Password"
                  icon="lock"
                  placeholder="******"
                  placeholderTextColor={darkLigth}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsgBox type={messageType}>{message}</MsgBox>
                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Login</ButtonText>
                  </StyledButton>
                )}

                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="small" color={primary} />
                  </StyledButton>
                )}

                <Line />

                {!googleSubmitting && (
                  <StyledButton google={true} onPress={handleGoogleSignin}>
                    <Fontisto name="google" color={primary} size={18} />
                    <ButtonText google={true}>Sign in with Google</ButtonText>
                  </StyledButton>
                )}

                {googleSubmitting && (
                  <StyledButton google={true} disabled={true}>
                      <ActivityIndicator size="small" color={primary} />
                  </StyledButton>
                )}

                <ExtraView>
                  <ExtraText>Don't have an account?</ExtraText>
                  <TextLink
                    onPress={() => {
                      navigation.navigate("Signup");
                    }}
                  >
                    <TextLinkContent>Signup</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({
  label,
  isPassword,
  hidePassword,
  setHidePassword,
  icon,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={22} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? "md-eye-off" : "md-eye"}
            size={22}
            color={darkLigth}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default Login;
