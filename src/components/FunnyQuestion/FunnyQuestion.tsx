import React, { useState } from 'react';

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
      height
    };
  }

  function getRandomArbitrary(min: number, max:number) {
    return Math.random() * (max - min) + min;
  }

export const FunnyQuestion: React.FC<FunnyQuestionProps> = props => {
    const [isFirstMouseOver, setIsFirstMouseOver] = useState(false);
    const [buttonPositionStyles, setButtonPositionStyles] = useState<React.CSSProperties>({});

    const handleMouseOver = () => {
        if(!isFirstMouseOver){
            setIsFirstMouseOver(true);
        }

        const { height, width} = getWindowDimensions();

        const top = getRandomArbitrary(0, height);
        const left = getRandomArbitrary(0, width)

        setButtonPositionStyles({position: 'absolute', left, top});
    }

    const buttonUnrecheableStyles: React.CSSProperties = { ...buttonPositionStyles, 
        position: isFirstMouseOver ? 'absolute': 'initial', 
        transition: 'top 2s ease 1s, left 2s ease 1s;'}

    return <div>
        <h2>{props.question}</h2>
        <div>
            <button>{props.option}</button>
            <button tabIndex={-1} style={buttonUnrecheableStyles} onMouseOver={handleMouseOver}>{props.optionUnreachable}</button>
        </div>
    </div>
}