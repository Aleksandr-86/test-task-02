<h3 align="center">
  <a href="https://test-task-02.vercel.app/">
    💼 Тестовое задание № 2
  </a>
</h3>

<p align="center">
  <a href="https://vuejs.org/">
    <img src="https://img.shields.io/badge/Vue-3.2.47-blue?style=plastic&logo=vuedotjs"/>
  </a>
  <a href="https://vitejs.dev/">
    <img src="https://img.shields.io/badge/Vite-4.1.4-blue?style=plastic&logo=vite"/>
  </a>
  <a href="https://yandex.ru/dev/maps/jsapi/doc/2.1">
    <img src="https://img.shields.io/badge/Яндекс карты-2.1-blue?style=plastic"/>
  </a>
</p>

### Задача:  
Используя Яндек карты отобразить сегменты - метки дождевальных установок  

Условия:
- Центр каждой метки должен задаваться парой GPS-координат широта-долгота
- Должна быть возможность изменить радиус метки (в метрах)
- Должна быть возможность задать начальный и конечный угол метки
- Должна быть возможность задать цвет контура метки
- Должна быть возможность задать угол поворота промежутка (лейки) метки
- Характеристики меток можно изменять непосредственно в коде или с помощью полей ввода  

Ключевая задача состоит в отображении меток дождевальных установок на Яндекс карте.  

Результат:  

<div align="center">
  <a href="https://test-task-02.vercel.app/">
    <img src="https://user-images.githubusercontent.com/96790009/232298101-fb476414-9d98-4307-9411-a6315dda38f7.png"/>
  </a>
</div>


### Установка и запуск:

`npm i` - установка необходимых пакетов  
`npm run dev` - запуск сервера для разработки  

### Особенности:
- Динамическое изменение характеристик меток дождевальных установок через поля ввода
- Выпадающее меню по нажатию на метку, содержащее информацию о текущем состоянии дождевальной установки

