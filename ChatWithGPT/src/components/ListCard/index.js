import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

const ListCard = ({onPress, name, image}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <StyledView>
        <Content>
          <StyledImage source={{uri: image}} />
          <StyledTitle>{name}</StyledTitle>
        </Content>
      </StyledView>
    </TouchableOpacity>
  );
};

const StyledView = styled.View`
  padding: 5px;
  margin: 10px 0px;
  background-color: white;
  border-radius: 5px;
`;
const Content = styled.View`
  padding: 5px 15px;
  gap: 5px;
  flex-direction: row;
  align-items: center;
`;
const StyledImage = styled.Image`
  background-color: #e6e6e6;
  width: 50px;
  height: 50px;
  border-radius: 5px;
`;
const StyledText = styled.Text`
  font-weight: 700;
  font-size: 16px;
  color: grey;
`;
const StyledType = styled.Text`
  font-size: 15px;
  color: white;
`;

const TypeContainer = styled.View`
  align-self: flex-start;
  padding: 0px 20px;
  border-radius: 3px;
  background-color: ${props => props.backgroundColor};
`;

const StyledTitle = styled.Text`
  font-weight: 500;
  font-size: 25px;
  margin-left: 10px;
  color: black;
`;

export default ListCard;
