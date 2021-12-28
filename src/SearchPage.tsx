/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useSearchParams } from 'react-router-dom';
import { QuestionList } from './QuestionList';
import { searchQuestions } from './QuestionsData';
import React from 'react';
import { Page } from './Page';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppState,
  searchedQuestionsAction,
  searchingQuestionsAction,
} from './store';

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const questions = useSelector((state: AppState) => state.questions.searched);
  const search = searchParams.get('criteria') || '';
  const dispatch = useDispatch();

  React.useEffect(() => {
    const doSearch = async (criteria: string) => {
      dispatch(searchingQuestionsAction());
      const foundResults = await searchQuestions(criteria);
      dispatch(searchedQuestionsAction(foundResults));
    };
    doSearch(search);
  }, [search]);
  return (
    <Page title="Search Results">
      {' '}
      {search && (
        <p
          css={css`
            font-size: 16px;
            font-style: italic;
            margin-top: 0px;
          `}
        >
          for "{search}"
        </p>
      )}
      <QuestionList data={questions} />
    </Page>
  );
};
