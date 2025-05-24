import styles from './Testimonials.module.css';

export const Testimonials = () => {
  const testimonials = [
    {
      name: 'Анна Петрова',
      company: 'ООО "Техно-Старт"',
      text: 'Регулярно пользуемся услугами FastDelivery для отправки товаров нашим клиентам. Всегда быстро, надежно и с отличным сервисом.',
      rating: 5
    },
    {
      name: 'Иван Сергеев',
      company: 'Интернет-магазин "Digital Store"',
      text: 'Очень удобное отслеживание посылок и всегда вежливые курьеры. Доставка точно в срок, что важно для нашего бизнеса.',
      rating: 5
    },
    {
      name: 'Мария Иванова',
      company: 'Сеть магазинов "Beauty Shop"',
      text: 'Отправляем косметику по всей России через FastDelivery. Ни одной потерянной посылки за год сотрудничества. Рекомендуем!',
      rating: 5
    }
  ];

  return (
    <section className={styles.testimonials}>
      <div className={styles.container}>
        <h2 className={styles.title}>Отзывы наших клиентов</h2>
        <div className={styles.grid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.testimonial}>
              <div className={styles.rating}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="#FFD700"
                  >
                    <path d="M10 1l2.598 6.866h6.402l-5 3.634 2.598 6.866-5-3.634-5 3.634 2.598-6.866-5-3.634h6.402z" />
                  </svg>
                ))}
              </div>
              <p className={styles.text}>{testimonial.text}</p>
              <div className={styles.author}>
                <div className={styles.avatar}>
                  {testimonial.name[0]}
                </div>
                <div className={styles.info}>
                  <strong className={styles.name}>{testimonial.name}</strong>
                  <span className={styles.company}>{testimonial.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 