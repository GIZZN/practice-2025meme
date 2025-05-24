'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './Profile.module.css';

interface OrderType {
  id: string;
  date: string;
  status: 'pending' | 'delivered' | 'in_transit';
  trackingNumber: string;
  from: string;
  to: string;
  price: number;
}

type Section = 'personal' | 'orders' | 'addresses';

const mockOrders: OrderType[] = [
  {
    id: '1',
    date: '2024-02-20',
    status: 'delivered',
    trackingNumber: 'TR123456789',
    from: 'Москва',
    to: 'Санкт-Петербург',
    price: 1200
  },
  {
    id: '2',
    date: '2024-02-25',
    status: 'in_transit',
    trackingNumber: 'TR987654321',
    from: 'Екатеринбург',
    to: 'Казань',
    price: 1500
  }
];

export const Profile = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<Section>('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // В реальном приложении здесь был бы API запрос для обновления данных
    setIsEditing(false);
  };

  const getStatusText = (status: OrderType['status']) => {
    switch (status) {
      case 'delivered':
        return 'Доставлен';
      case 'in_transit':
        return 'В пути';
      case 'pending':
        return 'Обработка';
      default:
        return status;
    }
  };

  const getStatusClass = (status: OrderType['status']) => {
    switch (status) {
      case 'delivered':
        return styles.statusDelivered;
      case 'in_transit':
        return styles.statusInTransit;
      case 'pending':
        return styles.statusPending;
      default:
        return '';
    }
  };

  if (!user) {
    return (
      <div className={styles.loading}>
        <p>Для доступа к профилю необходимо войти в систему</p>
      </div>
    );
  }


  
  const renderContent = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Личные данные</h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={styles.editButton}
              >
                {isEditing ? 'Отменить' : 'Редактировать'}
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Имя</label>
                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={styles.input}
                    placeholder="Введите ваше имя"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={styles.input}
                    placeholder="Введите ваш email"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Телефон</label>
                  <input
                    type="tel"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={styles.input}
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
              </div>
              {isEditing && (
                <button type="submit" className={styles.saveButton}>
                  Сохранить изменения
                </button>
              )}
            </form>
          </section>
        );

      case 'orders':
        return (
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>История заказов</h3>
            <div className={styles.orders}>
              {mockOrders.map(order => (
                <div key={order.id} className={styles.order}>
                  <div className={styles.orderHeader}>
                    <span className={styles.orderDate}>
                      {new Date(order.date).toLocaleDateString('ru-RU', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </span>
                    <span className={`${styles.orderStatus} ${getStatusClass(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                  <div className={styles.orderDetails}>
                    <div className={styles.orderInfo}>
                      <p className={styles.orderNumber}>
                        Трек-номер: {order.trackingNumber}
                      </p>
                      <p className={styles.orderRoute}>
                        {order.from} → {order.to}
                      </p>
                    </div>
                    <div className={styles.orderPrice}>
                      {order.price.toLocaleString('ru-RU')} ₽
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case 'addresses':
        return (
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Адреса доставки</h3>
            <p className={styles.emptyState}>
              У вас пока нет сохраненных адресов доставки
            </p>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.sidebar}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            {userData.name[0]?.toUpperCase()}
          </div>
          <h2 className={styles.userName}>{userData.name}</h2>
          <p className={styles.userEmail}>{userData.email}</p>
        </div>
        <nav className={styles.navigation}>
          <button 
            className={`${styles.navButton} ${activeSection === 'personal' ? styles.active : ''}`}
            onClick={() => setActiveSection('personal')}
          >
            <span>Мои данные</span>
          </button>
          <button 
            className={`${styles.navButton} ${activeSection === 'orders' ? styles.active : ''}`}
            onClick={() => setActiveSection('orders')}
          >
            <span>История заказов</span>
          </button>
          <button 
            className={`${styles.navButton} ${activeSection === 'addresses' ? styles.active : ''}`}
            onClick={() => setActiveSection('addresses')}
          >
            <span>Адреса доставки</span>
          </button>
          <Link href="/" className={styles.homeButton}>
            <span>На главную</span>
          </Link>
          <button onClick={handleLogout} className={styles.logoutButton}>
            <span>Выйти</span>
          </button>
        </nav>
      </div>

      <div className={styles.content}>
        {renderContent()}
      </div>
    </div>
  );
}; 