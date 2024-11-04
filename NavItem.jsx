import React from 'react';
import styles from './Header.module.css';

const NavItem = ({ text }) => (
  <div className={styles.navItem}>
    <div className={styles.navButton}>{text}</div>
  </div>
);

export default NavItem;