import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { collection, addDoc, CollectionReference } from 'firebase/firestore';
import { db } from '../../firebase';
import { QuestionType } from '../../utils/types';
import './FormQuestion.scss';

export const FormQuestion: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = await addDoc<QuestionType>(
        collection(db, 'questions') as CollectionReference<QuestionType>,
        {
          questionDescription: question,
          option1,
          option2,
        }
      );
      console.log('Document written with ID: ', docRef.id);
      navigate(`/askme/${docRef.id}`);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
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
