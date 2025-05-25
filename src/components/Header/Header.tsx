'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import styles from './Header.module.css';

const AccountIcon = () => (
  <svg
    className={styles.accountIcon}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          FastDelivery
        </Link>
        
        {/* Десктопное меню */}
        <nav className={styles.nav}>
          <Link href="/tracking" className={styles.link}>
            Отследить заказ
          </Link>
          <Link href="/calculator" className={styles.link}>
            Рассчитать стоимость
          </Link>
          <Link href="/points" className={styles.link}>
            Пункты выдачи
          </Link>
        </nav>
        
        <div className={styles.auth}>
          {isAuthenticated ? (
            <>
              <Link href="/profile" className={styles.profileLink}>
                <AccountIcon />
                <span className={styles.userName}>{user?.name}</span>
              </Link>
              <button onClick={logout} className={styles.authButton}>
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.authButton}>
                Войти
              </Link>
              <Link href="/register" className={styles.authButton}>
                Регистрация
              </Link>
            </>
          )}
        </div>

        {/* Кнопка мобильного меню */}
        <button 
          className={`${styles.menuButton} ${isMenuOpen ? styles.menuOpen : ''}`}
          onClick={toggleMenu}
          aria-label="Открыть меню"
        >
          <div className={styles.menuIcon}>
            <span></span>
          </div>
        </button>

        {/* Мобильное меню */}
        <div className={`${styles.mobileNav} ${isMenuOpen ? styles.open : ''}`}>
          <Link href="/tracking" className={styles.mobileLink} onClick={closeMenu}>
            Отследить заказ
          </Link>
          <Link href="/calculator" className={styles.mobileLink} onClick={closeMenu}>
            Рассчитать стоимость
          </Link>
          <Link href="/points" className={styles.mobileLink} onClick={closeMenu}>
            Пункты выдачи
          </Link>
          
          <div className={styles.mobileAuth}>
            {isAuthenticated ? (
              <>
                <Link href="/profile" className={styles.mobileLink} onClick={closeMenu}>
                  <AccountIcon />
                  <span className={styles.userName}>{user?.name}</span>
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    closeMenu();
                  }} 
                  className={styles.authButton}
                >
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className={styles.authButton} onClick={closeMenu}>
                  Войти
                </Link>
                <Link href="/register" className={styles.authButton} onClick={closeMenu}>
                  Регистрация
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}; 