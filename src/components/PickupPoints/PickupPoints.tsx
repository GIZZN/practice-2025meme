'use client';

import { useEffect, useState } from 'react';
import styles from './PickupPoints.module.css';

interface PickupPoint {
  id: string;
  address: string;
  coordinates: [number, number];
  workingHours: string;
  phone: string;
}

// Моковые данные для примера
const mockPickupPoints: PickupPoint[] = [
  {
    id: '1',
    address: 'ул. Ленина, 10',
    coordinates: [55.751574, 37.573856],
    workingHours: '09:00-21:00',
    phone: '+7 (999) 123-45-67'
  },
  {
    id: '2',
    address: 'пр. Мира, 25',
    coordinates: [55.762374, 37.583856],
    workingHours: '10:00-22:00',
    phone: '+7 (999) 765-43-21'
  },
  {
    id: '3',
    address: 'ул. Тверская, 15',
    coordinates: [55.759574, 37.563856],
    workingHours: '08:00-20:00',
    phone: '+7 (999) 987-65-43'
  }
];

export const PickupPoints = () => {
  const [selectedPoint, setSelectedPoint] = useState<PickupPoint | null>(null);
  const [map, setMap] = useState<ymaps.Map | null>(null);

  useEffect(() => {
    // Загружаем API Яндекс.Карт
    const loadYandexMaps = () => {
      const script = document.createElement('script');
      script.src = `https://api-maps.yandex.ru/2.1/?apikey=ВАШ_API_КЛЮЧ&lang=ru_RU`;
      script.async = true;
      script.onload = initMap;
      document.body.appendChild(script);
    };

    const initMap = () => {
      // @ts-ignore
      window.ymaps.ready(() => {
        // @ts-ignore
        const ymap = new window.ymaps.Map('map', {
          center: [55.751574, 37.573856],
          zoom: 11,
          controls: ['zoomControl', 'geolocationControl']
        });

        // Создаем метки для каждой точки выдачи
        mockPickupPoints.forEach(point => {
          // @ts-ignore
          const placemark = new window.ymaps.Placemark(
            point.coordinates,
            {
              balloonContentLayout: window.ymaps.templateLayoutFactory.createClass(
                `<div class="${styles.balloon}">
                  <h3 class="${styles.balloonTitle}">${point.address}</h3>
                  <p class="${styles.balloonText}">Режим работы: ${point.workingHours}</p>
                  <p class="${styles.balloonText}">Телефон: ${point.phone}</p>
                </div>`
              )
            },
            {
              preset: 'islands#blueDeliveryIcon'
            }
          );

          placemark.events.add('click', () => {
            setSelectedPoint(point);
          });

          ymap.geoObjects.add(placemark);
        });

        setMap(ymap);
      });
    };

    loadYandexMaps();

    return () => {
      if (map) {
        map.destroy();
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h2 className={styles.title}>Пункты выдачи</h2>
        <div className={styles.pointsList}>
          {mockPickupPoints.map(point => (
            <div
              key={point.id}
              className={`${styles.pointCard} ${
                selectedPoint?.id === point.id ? styles.selected : ''
              }`}
              onClick={() => {
                setSelectedPoint(point);
                map?.setCenter(point.coordinates, 15);
              }}
            >
              <h3 className={styles.pointAddress}>{point.address}</h3>
              <p className={styles.pointDetails}>
                <span className={styles.workingHours}>{point.workingHours}</span>
                <span className={styles.phone}>{point.phone}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
      <div id="map" className={styles.map}></div>
    </div>
  );
}; 