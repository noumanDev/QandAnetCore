import React, { useEffect, useState } from 'react';
import { QuestionList } from './QuestionList';
import { getUnansweredQuestions, QuestionData } from './QuestionsData';
import { Page } from './Page';

export const HomePage = () => {
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const doGetUnansweredQuestions = async () => {
      const unAnsweredQuestions = await getUnansweredQuestions();
      setQuestions(unAnsweredQuestions);
      setLoading(false);
    };
    doGetUnansweredQuestions();
  }, []);

  const handleAskQuestionClick = () => {
    console.log('hello');
  };
  return (
    <Page>
      <h2>Unanswered Questions</h2>
      <button onClick={handleAskQuestionClick}>Ask a question</button>
      {loading ? <p>Loading...</p> : <QuestionList data={questions} />}
    </Page>
  );
};
