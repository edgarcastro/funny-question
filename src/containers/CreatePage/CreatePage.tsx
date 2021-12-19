import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormQuestion } from '../../components/FormQuestion';
import { collection, addDoc, CollectionReference } from 'firebase/firestore';
import { db } from '../../firebase';
import { QuestionType } from '../../utils/types';

export const CreatePage: React.FC = () => {
  const navigate = useNavigate();

  const createQuestion = async (data: QuestionType) => {
    try {
      const docRef = await addDoc<QuestionType>(
        collection(db, 'questions') as CollectionReference<QuestionType>,
        data
      );
      console.log('Document written with ID: ', docRef.id);
      navigate(`/askme/${docRef.id}`);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <>
      <FormQuestion onSubmit={createQuestion} />
    </>
  );
};
