import React, { useState } from 'react';
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
  const [errors, setErrors] = useState<
    Partial<Record<keyof QuestionType, string>>
  >({});

  const validateField = (name: keyof QuestionType, value: string): string => {
    const trimmed = value.trim();
    if (!trimmed) {
      return `${name === 'question' ? 'La pregunta' : name === 'option1' ? 'La opción 1' : 'La opción 2'} es requerida`;
    }
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<Record<keyof QuestionType, string>> = {};
    const questionError = validateField('question', question);
    const option1Error = validateField('option1', option1);
    const option2Error = validateField('option2', option2);

    if (questionError) newErrors.question = questionError;
    if (option1Error) newErrors.option1 = option1Error;
    if (option2Error) newErrors.option2 = option2Error;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    props.onSubmit({
      question: question.trim(),
      option1: option1.trim(),
      option2: option2.trim(),
    });
  };

  const handleBlur = (name: keyof QuestionType, value: string) => {
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <form className="FormQuestion" onSubmit={handleSubmit} autoComplete="off">
      <h2 className="FormQuestion__title">Crea tu pregunta</h2>

      <div className="FormQuestion__field">
        <label htmlFor="question" className="FormQuestion__label">
          ¿Cual es tu pregunta?
        </label>
        <textarea
          id="question"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          onBlur={() => handleBlur('question', question)}
          className={`FormQuestion__input ${errors.question ? 'FormQuestion__input--error' : ''}`}
          autoFocus
          rows={4}
          placeholder="Escribe tu pregunta aquí..."
        />
        {errors.question && (
          <span className="FormQuestion__error">{errors.question}</span>
        )}
      </div>

      <div className="FormQuestion__field">
        <label htmlFor="option1" className="FormQuestion__label">
          Ingresa la opción
        </label>
        <textarea
          id="option1"
          value={option1}
          onChange={e => setOption1(e.target.value)}
          onBlur={() => handleBlur('option1', option1)}
          className={`FormQuestion__input ${errors.option1 ? 'FormQuestion__input--error' : ''}`}
          rows={2}
          placeholder="Escribe la primera opción..."
        />
        {errors.option1 && (
          <span className="FormQuestion__error">{errors.option1}</span>
        )}
      </div>

      <div className="FormQuestion__field">
        <label htmlFor="option2" className="FormQuestion__label">
          Ingresa la opción que no sera alcanzable
        </label>
        <textarea
          id="option2"
          value={option2}
          onChange={e => setOption2(e.target.value)}
          onBlur={() => handleBlur('option2', option2)}
          className={`FormQuestion__input ${errors.option2 ? 'FormQuestion__input--error' : ''}`}
          rows={2}
          placeholder="Escribe la segunda opción..."
        />
        {errors.option2 && (
          <span className="FormQuestion__error">{errors.option2}</span>
        )}
      </div>

      <button type="submit" className="FormQuestion__button">
        Enviar
      </button>
    </form>
  );
};
