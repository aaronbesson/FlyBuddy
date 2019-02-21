import React from 'react';
import { DrawerItems, } from 'react-navigation';
import styled from 'styled-components/native';
import {
  RkButton,
  RkStyleSheet,
} from 'react-native-ui-kitten';
import {
  ScrollView, View, Image, Text, 
  StyleSheet, TouchableOpacity, RefreshControl,
} from 'react-native';

import Button from './Button';

const ContainerView = styled.View`
  flex: 1;
`;

const DrawerContainer = styled.View`
  flex: 8;
`;

const AvatarContainer = styled.View`
  flex: 2;
  top: 30;
  alignItems: center;
  justifyContent: center;
`;

const Avatar = styled.View`
  width: 120;
  height: 120;
  borderRadius: 60;
  backgroundColor: ${props => props.theme.PINK_100};
`;

const ItemContainer = styled.View`
  flex: 6;
`;

const ButtonContainer = styled.View`
  flex: 2;
  justifyContent: center;
  alignItems: center;
`;

const CustomDrawerContent = (props) => (
  <ContainerView style={styles.container}>
    <DrawerContainer>
      <ItemContainer>
        <DrawerItems {...props} />
      </ItemContainer>
    </DrawerContainer>
    <ButtonContainer>
      <Button text="Logout"
      onPress={() => props.navigation.navigate('Welcome')} />
    </ButtonContainer>
  </ContainerView>
);

const styles = RkStyleSheet.create(theme => ({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  root: {
    backgroundColor: theme.colors.screen.base,
    paddingTop: 0,
    flex: 1,
  },
}));

export default CustomDrawerContent;

