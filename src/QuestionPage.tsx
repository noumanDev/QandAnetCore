/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { gray3, gray6 } from './Styles';
import { Page } from './Page';
import { useParams } from 'react-router-dom';
import { getQuestion, QuestionData } from './QuestionsData';
import React, { useState, useEffect } from 'react';
import { AnswerList } from './AnswerList';

export function QuestionPage() {
  const { questionId } = useParams();
  const [question, setQuestion] = useState<QuestionData | null>(null);

  useEffect(() => {
    const doGetQuestion = async (questionId: number) => {
      const foundQuestion = await getQuestion(questionId);
      setQuestion(foundQuestion);
    };
    if (questionId) {
      doGetQuestion(Number(questionId));
    }
  }, [questionId]);

  return (
    <Page>
      <div
        css={css`
          background-color: white;
          padding: 15px 20px 20px 20px;
          border-radius: 4px;
          border: 1px solid ${gray6};
          box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
        `}
      >
        <div
          css={css`
            font-size: 19px;
            font-weight: bold;
            margin: 10px 0px 5px;
          `}
        >
          {question === null ? '' : question.title}
        </div>
        {question !== null && (
          <React.Fragment>
            <p
              css={css`
                margin-top: 0px;
                background-color: white;
              `}
            >
              {question.content}
            </p>
            <div
              css={css`
                font-size: 12px;
                font-style: italic;
                color: ${gray3};
              `}
            >
              {`Asked by ${question.userName} on
 ${question.created.toLocaleDateString()} 
 ${question.created.toLocaleTimeString()}`}
            </div>
            <AnswerList data={question.answers} />
          </React.Fragment>
        )}
      </div>
    </Page>
  );
}