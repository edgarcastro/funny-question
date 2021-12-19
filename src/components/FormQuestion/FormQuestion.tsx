import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

import { QuestionType } from '../../utils/types';
import './FormQuestion.scss';

interface RequiredProps {
  onSubmit: (data: QuestionType) => void;
}

type FormQuestionProps = RequiredProps;

export const FormQuestion: React.FC<FormQuestionProps> = props => {
  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.onSubmit({
      questionDescription: question,
      option1,
      option2,
    });
  };

  return (
    <form className="FormQuestion" onSubmit={onSubmit} method="POST">
      <TextField
        id="input-question"
        className="FormQuestion__input"
        label="¿Cual es tu pregunta?"
        multiline
        maxRows={4}
        value={question}
        onChange={e => setQuestion(e.target.value)}
      />
      <TextField
        id="input-option"
        className="FormQuestion__input"
        label="Ingresa la opcion"
        multiline
        maxRows={2}
        value={option1}
        onChange={e => setOption1(e.target.value)}
      />
      <TextField
        id="input-option-unreachable"
        className="FormQuestion__input"
        label="Ingresa la opcion que no sera alcanzable"
        multiline
        maxRows={2}
        value={option2}
        onChange={e => setOption2(e.target.value)}
      />

      <Button type="submit" variant="contained">
        Enviar
      </Button>
    </form>
  );
};
