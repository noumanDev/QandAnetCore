import React from 'react';
import styles from './Header.module.css';

export const Header = () => {
  const handleSearchInputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
  };
  return (
    <div className={styles.container}>
      <a href="./">Q & A</a>
      <input
        onChange={handleSearchInputchange}
        type="text"
        placeholder="Search..."
      />
      <a href="./signin">Sign In</a>
    </div>
  );
};
