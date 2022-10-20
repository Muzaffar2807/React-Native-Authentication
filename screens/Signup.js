import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

//icons
import { Octicons, Ionicons, Fontisto } from "@expo/vector-icons";

//formik
import { Formik } from "formik";

//Datetimepicker
import DateTimePicker from "@react-native-community/datetimepicker";

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

//API Client
import axios from 'axios';
import * as Google from 'expo-google-app-auth';

const Signup = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);

  const [show, setShow] = useState(false);

  const [date, setDate] = useState(new Date(2000, 0, 1));

  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  //Actual date of birth to be sent
  const [dob, setDob] = useState();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDob(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };

  //api call from handling
  const handleSignup = (credentials, setSubmitting) => {
    handleMessage(null);
    const url = "https://whispering-headland-00232.herokuapp.com/user/signup";

    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { message, status, data } = result;

        if (status !== "SUCCESS") {
          handleMessage(message, status);
        } else {
          navigation.navigate("Welcome", { ...data });
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
    const config = {
      iosClientId : `892027722343-90pr5qkbi28r4up866mndj0d81imfnov.apps.googleusercontent.com`,
      androidClientId : `892027722343-e09gbtk956ngncs5j9lgve68bv1r09uh.apps.googleusercontent.com`,
      scopes: ['profile', 'email']
    };

    Google.logInAsync(config)
      .then((result) => {
        const { type, user } = result;

        if(type == 'success'){
          const {email, name, photoUrl} = user;
          handleMessage("Google signin sucessful" , 'SUCCESS');
          setTimeout(() => navigation.navigate('Welcome', {email, name, photoUrl}),)
        } else {
          handleMessage("Google Signin Cancelled")
        }
      })
      .catch(error => {
        console.log(error);
        handleMessage('An error occured. ')
      })
  }

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageTitle>Flower Crib</PageTitle>
          <SubTitle>Account Signup</SubTitle>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}

          <Formik
            initialValues={{
              name: "",
              email: "",
              dateOfBirth: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              values = {...values, dateOfBirth: dob}
              if (
                values.email == "" ||
                values.password == "" ||
                values.name == "" ||
                values.dateOfBirth == "" ||
                values.confirmPassword == ""
              ) {
                handleMessage("Please fill all the fields");
                setSubmitting(false);
              } else if (values.password !== values.confirmPassword) {
                handleMessage("Passwords do not match ");
                setSubmitting(false);
              } else {
                handleSignup(values, setSubmitting);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Full Name"
                  icon="person"
                  placeholder="John"
                  placeholderTextColor={darkLigth}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />

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
                  label="Date of Birth"
                  icon="calendar"
                  placeholder="YYYY - MM - DD"
                  placeholderTextColor={darkLigth}
                  onChangeText={handleChange("dateOfBirth")}
                  onBlur={handleBlur("dateOfBirth")}
                  value={dob ? dob.toDateString() : ""}
                  isDate={true}
                  editable={false}
                  showDatePicker={showDatePicker}
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

                <MyTextInput
                  label="Confirm Password"
                  icon="lock"
                  placeholder="******"
                  placeholderTextColor={darkLigth}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />

                <MsgBox type={messageType}>{message}</MsgBox>

                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Signup</ButtonText>
                  </StyledButton>
                )}

                {isSubmitting && (
                  <StyledButton disabled={true}>
                   <ActivityIndicator size="small" color={primary} />
                  </StyledButton>
                )}

                <Line />

                <ExtraView>
                  <ExtraText>Already have an account?</ExtraText>
                  <TextLink onPress={() => navigation.navigate("Login")}>
                    <TextLinkContent>Login</TextLinkContent>
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
  isDate,
  showDatePicker,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={22} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>

      {!isDate && <StyledTextInput {...props} />}

      {isDate && (
        <TouchableOpacity onPress={showDatePicker}>
          <StyledTextInput {...props} />
        </TouchableOpacity>
      )}

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

export default Signup;
