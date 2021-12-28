/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import React from 'react';
import { Header } from './Header';
import { HomePage } from './HomePage';
import { SignInPage } from './SignInPage';
import { SearchPage } from './SearchPage';
import { NotFoundPage } from './NotFoundPage';
import { QuestionPage } from './QuestionPage';
import { fontFamily, fontSize, gray2 } from './Styles';
import { Provider } from 'react-redux';
import { configureStore } from './store';

const AskPage = React.lazy(() => import('./AskPage'));

function App() {
  const store = configureStore();
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div
          css={css`
            font-family: ${fontFamily};
            font-size: ${fontSize};
            color: ${gray2};
          `}
        >
          <Header />
          <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route
              path="ask"
              element={
                <React.Suspense
                  fallback={
                    <div
                      css={css`
                        margin-top: 100px;
                        text-align: center;
                      `}
                    >
                      Loading...
                    </div>
                  }
                >
                  {' '}
                  <AskPage />
                </React.Suspense>
              }
            />
            <Route path="signin" element={<SignInPage />} />
            <Route path="question/:questionId" element={<QuestionPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
