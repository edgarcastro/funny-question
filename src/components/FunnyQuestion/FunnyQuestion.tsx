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
  const { height, width } = getWindowDimensions();
  const [buttonPositionStyles, setButtonPositionStyles] =
    useState<React.CSSProperties>({
      left: width / 2 + 80,
    });

  const handleMouseOver = () => {
    console.log('handleMouseOver');
    const top = getRandomArbitrary(0, height * 0.7);
    const left = getRandomArbitrary(0, width * 0.7);

    setButtonPositionStyles({ left, top });
  };

  const handleRequiredClick = () => {
    alert('Felicidades');
  };

  return (
    <div className="FunnyQuestion">
      <h2>{props.question}</h2>
      <div className="FunnyQuestion__options">
        <button
          type="button"
          onClick={handleRequiredClick}
          className="FunnyQuestion__button FunnyQuestion__button--fixed">
          {props.option}
        </button>
        <button
          type="button"
          tabIndex={-1}
          style={buttonPositionStyles}
          onMouseOver={handleMouseOver}
          onTouchStart={handleMouseOver}
          className={`FunnyQuestion__button FunnyQuestion__button--unreachable`}>
          {props.optionUnreachable}
        </button>
      </div>
    </div>
  );
};
