'use client';

import { useState } from 'react';
import styles from './Calculator.module.css';

export const Calculator = () => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [weight, setWeight] = useState('');
  const [size, setSize] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Calculating delivery cost...');
  };

  return (
    <section className={styles.calculator}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Рассчитать стоимость доставки</h2>
          <p className={styles.subtitle}>
            Введите параметры отправления для расчета стоимости
          </p>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label htmlFor="fromCity" className={styles.label}>
                Геде
                </label>
                <input
                  id="fromCity"
                  type="text"
                  className={styles.input}
                  placeholder="Город отправления"
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="toCity" className={styles.label}>
                  Что Геде
                </label>
                <input
                  id="toCity"
                  type="text"
                  className={styles.input}
                  placeholder="Город получения"
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="weight" className={styles.label}>
                  Вес (кг)
                </label>
                <input
                  id="weight"
                  type="number"
                  min="0.1"
                  step="0.1"
                  className={styles.input}
                  placeholder="Вес посылки"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="size" className={styles.label}>
                  Габариты (см)
                </label>
                <input
                  id="size"
                  type="text"
                  className={styles.input}
                  placeholder="ДxШxВ"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className={styles.button}>
              Рассчитать стоимость
            </button>
          </form>
        </div>

        <div className={styles.info}>
          <div className={styles.infoItem}>
            <h3 className={styles.infoTitle}>Экспресс-доставка</h3>
            <p className={styles.infoText}>от 1 дня</p>
          </div>
          <div className={styles.infoItem}>
            <h3 className={styles.infoTitle}>Стандартная доставка</h3>
            <p className={styles.infoText}>2-5 дней</p>
          </div>
          <div className={styles.infoItem}>
            <h3 className={styles.infoTitle}>Эконом-доставка</h3>
            <p className={styles.infoText}>5-10 дней</p>
          </div>
        </div>
      </div>
    </section>
  );
}; 