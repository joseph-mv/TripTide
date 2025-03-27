import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import {  AiFillHome } from 'react-icons/ai';

import styles from '../styles/pages/NotFound.module.css';
import { ROUTES } from '../routes';
/**
 * NotFound Component:
 *  Renders a 404 "Page Not Found" error message when the application's router
 */
const NotFound = () => {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.notFoundContent}>
        <div className={styles.iconContainer}>
          <AlertCircle className={styles.errorIcon} />
        </div>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.errorTitle}>Page Not Found</h2>
        <p className={styles.errorMessage}>
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to={ROUTES.HOME} className={styles.homeLink}>
        <AiFillHome className={styles.homeIcon}/>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;