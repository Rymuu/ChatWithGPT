import React, {useState, useEffect} from 'react';
import {Animated, Easing} from 'react-native';
import styled from 'styled-components/native';

const Timer = () => {
  const [progress] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 10000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Circle>
      <Animated.View
        style={{
          transform: [
            {
              rotate: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
        }}>
        <CircleInner progress={progress} />
      </Animated.View>
    </Circle>
  );
};
const Circle = styled.View`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: #ccc;
  overflow: hidden;
`;

const CircleInner = styled.View`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: #f00;
  transform: rotate(
    ${props => {
      const progressValue = props.progress.__getValue();
      return progressValue * 360 + 'deg';
    }}
  );
`;

export default Timer;