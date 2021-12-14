import { Button, Stack, Paper } from '@mui/material';
import React, { useState } from 'react';

import './FunnyQuestion.scss';

interface RequiredProps {
  question: string;
  option: string;
  optionUnreachable: string;
}

export type FunnyQuestionProps = RequiredProps;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const FunnyQuestion: React.FC<FunnyQuestionProps> = props => {
  const [isFirstMouseOver, setIsFirstMouseOver] = useState(false);
  const [buttonPositionStyles, setButtonPositionStyles] =
    useState<React.CSSProperties>({});

  const handleMouseOver = () => {
    if (!isFirstMouseOver) {
      setIsFirstMouseOver(true);
    }

    const { height, width } = getWindowDimensions();

    const top = getRandomArbitrary(0, height * 0.9);
    const left = getRandomArbitrary(0, width * 0.9);

    setButtonPositionStyles({ position: 'absolute', left, top });
  };

  const handleRequiredClick = () => {
    alert('Felicidades');
  };

  const buttonUnrecheableStyles: React.CSSProperties = {
    ...buttonPositionStyles,
    position: isFirstMouseOver ? 'absolute' : 'initial',
    transition: 'top 0.01s ease 0.01s, left 0.01s ease 0.01s',
  };

  return (
    <Paper className="FunnyQuestion">
      <h2>{props.question}</h2>
      <Stack
        className="FunnyQuestion__options"
        spacing={2}
        direction="row"
        justifyContent="flex-start">
        <Button onClick={handleRequiredClick} variant="contained">
          {props.option}
        </Button>
        <Button
          tabIndex={-1}
          style={buttonUnrecheableStyles}
          onMouseOver={handleMouseOver}
          onTouchStart={handleMouseOver}
          variant="contained">
          {props.optionUnreachable}
        </Button>
      </Stack>
    </Paper>
  );
};
