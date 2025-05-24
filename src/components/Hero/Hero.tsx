import Image from 'next/image';
import styles from './Hero.module.css';

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Быстрая доставка в любую точку России
          </h1>
          <p className={styles.subtitle}>
            Доставляем ваши отправления быстро и надежно. 
            Отслеживание посылки в режиме реального времени.
          </p>
          <div className={styles.features}>
            <div className={styles.feature}>
              <span className={styles.featureNumber}>24/7</span>
              <span className={styles.featureText}>Поддержка</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureNumber}>500+</span>
              <span className={styles.featureText}>Пунктов выдачи</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureNumber}>98%</span>
              <span className={styles.featureText}>Довольных клиентов</span>
            </div>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image 
            src="/images/hero.jpg"
            alt="Delivery Hero"
            fill
            style={{ objectFit: 'cover' }}
            className={styles.image}
            priority
          />
        </div>
      </div>
    </section>
  );
};