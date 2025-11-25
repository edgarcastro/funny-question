import React from 'react';
import './App.scss';
import { FormQuestion } from './components/FormQuestion';
import { FunnyQuestion } from './components/FunnyQuestion';
import { decode, encode } from './utils/format';
import { AppStatus, QuestionType } from './utils/types';

const App: React.FC = () => {
  const [appStatus, setAppStatus] = React.useState<AppStatus>(AppStatus.IDLE);
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hasQuestion =
      params.has('question') && params.has('option1') && params.has('option2');
    if (hasQuestion) {
      setAppStatus(AppStatus.FUNNY_QUESTION);
    } else {
      setAppStatus(AppStatus.FORM_QUESTION);
    }
  }, []);

  if (appStatus === AppStatus.IDLE) {
    return <div>Loading...</div>;
  }

  if (appStatus === AppStatus.FUNNY_QUESTION) {
    const params = new URLSearchParams(window.location.search);
    const question = decode(params.get('question') || '');
    const option1 = decode(params.get('option1') || '');
    const option2 = decode(params.get('option2') || '');
    return (
      <FunnyQuestion
        question={question}
        option={option1}
        optionUnreachable={option2}
      />
    );
  }

  const onSubmit = (data: QuestionType) => {
    const params = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, encode(value));
      }
    });
    const url = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, '', url);
    setAppStatus(AppStatus.FUNNY_QUESTION);
  };

  return (
    <div className="App">
      <main>
        <FormQuestion onSubmit={onSubmit} />
      </main>
    </div>
  );
};

export default App;
