import React from 'react';
import { Button } from 'react-native';
import styled from 'styled-components';
import apiService from '../services/ApiService';
const LoginSection = styled.View`
  flex: 1;
  background: #fff;
  flexDirection: column
  justifyContent: center;
  alignItems: center;
`;
const LoginInfo = styled.Text`
  padding: 10px;
  margin-bottom: 30px;
  color: gray;
`;

export default function(props) {
  return (
    <LoginSection>
      <LoginInfo>로그인이 필요합니다.</LoginInfo>
      <Button 
        title='로그인' 
        style={{padding: 10}}
        containerViewStyle={{ width: '300px', marginLeft: 0 }}
        onPress={() => {
          apiService.signin().then(resp => {
            apiService.setToken(resp.data.token);
            props.navigation.navigate('Main');
          });
        }}
      />
    </LoginSection>
  );
}