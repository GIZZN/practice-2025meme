'use client';

import { useState, useEffect, ChangeEvent } from 'react';
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

interface User {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  telegram: string;
  whatsapp: string;
  preferredContact: string;
  language: string;
}

export const Profile = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<Section>('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [userData, setUserData] = useState<User>({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    telegram: '',
    whatsapp: '',
    preferredContact: '',
    language: ''
  });

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        birthDate: user.birthDate || '',
        address: user.address || '',
        city: user.city || '',
        country: user.country || '',
        postalCode: user.postalCode || '',
        telegram: user.telegram || '',
        whatsapp: user.whatsapp || '',
        preferredContact: user.preferredContact || '',
        language: user.language || ''
      });
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage('');

    try {
      // В реальном приложении здесь был бы API запрос
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSaveMessage('Изменения успешно сохранены');
      setIsEditing(false);
    } catch (error) {
      setSaveMessage('Ошибка при сохранении изменений');
    } finally {
      setIsSaving(false);
    }
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

  const renderPersonalSection = () => (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Личные данные</h3>
        <button
          onClick={() => {
            setIsEditing(!isEditing);
            setSaveMessage('');
          }}
          className={styles.editButton}
          disabled={isSaving}
        >
          {isEditing ? 'Отменить' : 'Редактировать'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGrid}>
          <div className={styles.formSection}>
            <h4 className={styles.formSectionTitle}>Основная информация</h4>
            <div className={styles.fieldsGroup}>
              <div className={styles.fieldContainer}>
                <label className={styles.fieldLabel}>Имя</label>
                <div className={styles.fieldBox}>
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
              </div>
              <div className={styles.fieldContainer}>
                <label className={styles.fieldLabel}>Email</label>
                <div className={styles.fieldBox}>
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
              </div>
              <div className={styles.fieldContainer}>
                <label className={styles.fieldLabel}>Дата рождения</label>
                <div className={styles.fieldBox}>
                  <input
                    type="date"
                    name="birthDate"
                    value={userData.birthDate}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={styles.input}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <h4 className={styles.formSectionTitle}>Контактная информация</h4>
            <div className={styles.fieldsGroup}>
              <div className={styles.fieldContainer}>
                <label className={styles.fieldLabel}>Телефон</label>
                <div className={styles.fieldBox}>
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
              <div className={styles.fieldContainer}>
                <label className={styles.fieldLabel}>Telegram</label>
                <div className={styles.fieldBox}>
                  <input
                    type="text"
                    name="telegram"
                    value={userData.telegram}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={styles.input}
                    placeholder="@username"
                  />
                </div>
              </div>
              <div className={styles.fieldContainer}>
                <label className={styles.fieldLabel}>WhatsApp</label>
                <div className={styles.fieldBox}>
                  <input
                    type="text"
                    name="whatsapp"
                    value={userData.whatsapp}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={styles.input}
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
              </div>
              <div className={styles.fieldContainer}>
                <label className={styles.fieldLabel}>Предпочитаемый способ связи</label>
                <div className={styles.fieldBox}>
                  <select
                    name="preferredContact"
                    value={userData.preferredContact}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={styles.input}
                  >
                    <option value="">Выберите способ связи</option>
                    <option value="phone">Телефон</option>
                    <option value="telegram">Telegram</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="email">Email</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <h4 className={styles.formSectionTitle}>Адрес</h4>
            <div className={styles.fieldsGroup}>
              <div className={styles.fieldContainer}>
                <label className={styles.fieldLabel}>Улица, дом, квартира</label>
                <div className={styles.fieldBox}>
                  <input
                    type="text"
                    name="address"
                    value={userData.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={styles.input}
                    placeholder="Введите ваш адрес"
                  />
                </div>
              </div>
              <div className={styles.fieldContainer}>
                <label className={styles.fieldLabel}>Город</label>
                <div className={styles.fieldBox}>
                  <input
                    type="text"
                    name="city"
                    value={userData.city}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={styles.input}
                    placeholder="Введите город"
                  />
                </div>
              </div>
              <div className={styles.fieldContainer}>
                <label className={styles.fieldLabel}>Страна</label>
                <div className={styles.fieldBox}>
                  <input
                    type="text"
                    name="country"
                    value={userData.country}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={styles.input}
                    placeholder="Введите страну"
                  />
                </div>
              </div>
              <div className={styles.fieldContainer}>
                <label className={styles.fieldLabel}>Почтовый индекс</label>
                <div className={styles.fieldBox}>
                  <input
                    type="text"
                    name="postalCode"
                    value={userData.postalCode}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={styles.input}
                    placeholder="Введите почтовый индекс"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <h4 className={styles.formSectionTitle}>Дополнительно</h4>
            <div className={styles.fieldsGroup}>
              <div className={styles.fieldContainer}>
                <label className={styles.fieldLabel}>Предпочитаемый язык</label>
                <div className={styles.fieldBox}>
                  <select
                    name="language"
                    value={userData.language}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={styles.input}
                  >
                    <option value="">Выберите язык</option>
                    <option value="ru">Русский</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isEditing && (
          <div className={styles.formActions}>
            <button 
              type="submit" 
              className={styles.saveButton}
              disabled={isSaving}
            >
              {isSaving ? 'Сохранение...' : 'Сохранить изменения'}
            </button>
            {saveMessage && (
              <p className={`${styles.saveMessage} ${
                saveMessage.includes('Ошибка') ? styles.error : styles.success
              }`}>
                {saveMessage}
              </p>
            )}
          </div>
        )}
      </form>
    </section>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'personal':
        return renderPersonalSection();
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