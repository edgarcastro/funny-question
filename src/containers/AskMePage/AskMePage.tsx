import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, DocumentReference, getDoc } from 'firebase/firestore';

import { FunnyQuestion } from '../../components/FunnyQuestion';
import { db } from '../../firebase';
import { QuestionType } from '../../utils/types';

export const AskMePage: React.FC = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState('');
  const [option, setOption] = useState('');
  const [optionUnreachable, setOptionUnreachable] = useState('');

  const getQuestion = async (referenceId: string) => {
    const docRef = doc(
      db,
      'questions',
      referenceId
    ) as DocumentReference<QuestionType>;
    const querySnapshot = await getDoc<QuestionType>(docRef);
    const data = querySnapshot.data();
    return data;
  };

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
