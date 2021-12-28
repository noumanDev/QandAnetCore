/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { PrimaryButton } from './Styles';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionList } from './QuestionList';
import { getUnansweredQuestions } from './QuestionsData';
import { Page } from './Page';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppState,
  gettingUnansweredQuestionsAction,
  gotUnansweredQuestionsAction,
} from './store';

export const HomePage = () => {
  const questions = useSelector(
    (state: AppState) => state.questions.unanswered,
  );
  const loading = useSelector((state: AppState) => state.questions.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const doGetUnansweredQuestions = async () => {
      dispatch(gettingUnansweredQuestionsAction());
      const unAnsweredQuestions = await getUnansweredQuestions();
      dispatch(gotUnansweredQuestionsAction(unAnsweredQuestions));
    };
    doGetUnansweredQuestions();
  }, []);

  const handleAskQuestionClick = () => {
    navigate('ask');
  };
  return (
    <Page>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <h2>Unanswered Questions</h2>
        <PrimaryButton onClick={handleAskQuestionClick}>
          Ask a question
        </PrimaryButton>
      </div>
      {loading ? <p>Loading...</p> : <QuestionList data={questions} />}
    </Page>
  );
};
