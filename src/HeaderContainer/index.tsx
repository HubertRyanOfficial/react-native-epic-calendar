import React, {memo} from 'react';

// * modules

// * components

import {Container, DayContainer, DayText} from './styles';

// * utils

//

function HeaderContainer() {
  return (
    <Container
      style={{
        elevation: 1,
      }}>
      <DayContainer>
        <DayText>D</DayText>
      </DayContainer>
      <DayContainer>
        <DayText>S</DayText>
      </DayContainer>
      <DayContainer>
        <DayText>T</DayText>
      </DayContainer>
      <DayContainer>
        <DayText>Q</DayText>
      </DayContainer>
      <DayContainer>
        <DayText>Q</DayText>
      </DayContainer>
      <DayContainer>
        <DayText>S</DayText>
      </DayContainer>
      <DayContainer>
        <DayText>S</DayText>
      </DayContainer>
    </Container>
  );
}

export default memo(HeaderContainer);
// Desenvolvido por Hubert Ryan
