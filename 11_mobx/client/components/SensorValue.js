import React from 'react';
import styled from 'styled-components/native';

const SensorText = styled.View`
  background: ${props => props.bg || 'gray'};
  padding: 20px;
  margin: 0px;
`;
const Type = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #ddd;
`;
const Value = styled.Text`
  font-weight: bold;
  font-size: 40px;
  color: white;
`;

export default ({ type, value, bg }) => {
  return (
    <SensorText bg={bg}>
      <Type>{type}</Type>
      <Value>{value}</Value>
    </SensorText>
  );
};