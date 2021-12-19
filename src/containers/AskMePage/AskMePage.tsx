import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { FunnyQuestion } from '../../components/FunnyQuestion';
import { getQuestion } from '../../remotes';

export const AskMePage: React.FC = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState('');
  const [option, setOption] = useState('');
  const [optionUnreachable, setOptionUnreachable] = useState('');

  const setDefaultQuestion = () => {
    setQuestion('Do you want pizza?');
    setOption('No');
    setOptionUnreachable('Yes');
  };

  useEffect(() => {
    if (typeof id !== 'string') {
      setDefaultQuestion();
    } else {
      (async function () {
        const questionData = await getQuestion(id);
        console.log('response ', questionData);
        if (questionData) {
          setQuestion(questionData.questionDescription);
          setOption(questionData.option1);
          setOptionUnreachable(questionData.option2);
        } else {
          console.log('not found');
          setDefaultQuestion();
        }
      })();
    }
  }, [id]);

  return (
    <FunnyQuestion
      question={question}
      option={option}
      optionUnreachable={optionUnreachable}
    />
  );
};
