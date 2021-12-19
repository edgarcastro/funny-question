import React from 'react';
import { useNavigate } from 'react-router-dom';

import { FormQuestion } from '../../components/FormQuestion';
import { createQuestion } from '../../remotes';
import { QuestionType } from '../../utils/types';

export const CreatePage: React.FC = () => {
  const navigate = useNavigate();

  const onSubmit = async (data: QuestionType) => {
    try {
      const docRefId = await createQuestion(data);
      console.log('Document written with ID: ', docRefId);
      navigate(`/askme/${docRefId}`);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <>
      <FormQuestion onSubmit={onSubmit} />
    </>
  );
};
