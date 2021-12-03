import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { collection, addDoc, CollectionReference } from "firebase/firestore";
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { QuestionType } from '../../utils/types';

export const FormQuestion: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const navigate = useNavigate();


  const onClick = async () => {

    try {
      const docRef = await addDoc<QuestionType>(collection(db, "questions") as CollectionReference<QuestionType>, {
        questionDescription: question,
        option1,
        option2
      });
      console.log("Document written with ID: ", docRef.id);
      navigate(`/askme/${docRef.id}`);

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }


  return (
    <form>
      <TextField
        id="outlined-multiline-flexible"
        label="Multiline"
        multiline
        maxRows={4}
        value={question}
        onChange={e => setQuestion(e.target.value)}
      />
      <TextField
        id="outlined-multiline-flexible"
        label="Multiline"
        multiline
        maxRows={4}
        value={option1}
        onChange={e => setOption1(e.target.value)}
      />
      <TextField
        id="outlined-multiline-flexible"
        label="Multiline"
        multiline
        maxRows={4}
        value={option2}
        onChange={e => setOption2(e.target.value)}
      />

      <Button onClick={onClick} variant="contained">Submit</Button>
    </form>
  )
};

