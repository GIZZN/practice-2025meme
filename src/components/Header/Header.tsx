'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import styles from './Header.module.css';

export const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          FastDelivery
        </Link>
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
                <span className={styles.userName}>
                  {user?.name}
                </span>
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
      </div>
    </header>
  );
}; 