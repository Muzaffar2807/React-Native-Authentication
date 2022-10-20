import React from "react";
import { StatusBar } from "expo-status-bar";

import {
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  Line,
  WelcomeContainer,
  WelcomeImage,
  Avatar,
} from "./../components/styles";

const Welcome = ({ navigation, route }) => {

  const{ name, email } = route.params;

  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        <WelcomeImage
          resizeMode="cover"
          source={require("./../assets/img/img1.jpg")}
        />
        <WelcomeContainer>
          <PageTitle welcome={true}>Welcome Buddy</PageTitle>
          <SubTitle welcome={true}>{name || 'John'}</SubTitle>
          <SubTitle welcome={true}>{email || 'abc@gmail.com'}</SubTitle>
          <StyledFormArea>
            <Avatar
              resizeMode="cover"
              source={require("./../assets/img/img1.jpg")}
            />
            <Line />
            <StyledButton onPress={() => { navigation.navigate('Login') }}>
              <ButtonText>Logout</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default Welcome;
