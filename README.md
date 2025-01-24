# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Архитектура проекта

Проект реализован по архитектуре MVP (Model-View-Presenter):
### Model (Модели данных)
Отвечает за данные и бизнес-логику:
- Хранение данных (CatalogModel, UserModel)
- Управление состоянием (BasketService)
- Валидация данных
- Работа с API

### View (Представление)
Отвечает за отображение данных пользователю:
- Отрисовка компонентов
- Обработка пользовательского ввода
- Генерация событий при действиях пользователя

### Presenter (Презентер)
Связующее звено между Model и View:
- Подписка на события от View
- Обработка действий пользователя
- Обновление Model
- Обновление View при изменении Model

## Типы данных

### Модели данных
```typescript
// Данные товара с сервера
interface IProductServer {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

// Данные заказа для отправки на сервер
interface IOrderServer {
    payment: string;
    email: string;
    phone: string;
    address: string;
    items: string[];
    total: number;
}

// Товар в корзине
interface IBasketItem {
    id: string;
    title: string;
    price: number;
}

// Данные формы заказа
interface IOrderFormData {
    email: string;
    phone: string;
    address: string;
    payment: 'card' | 'cash';
}
```

## Классы

### Базовые классы

#### EventEmitter
Базовый класс для работы с событиями. Реализует паттерн «Наблюдатель».

**Конструктор**
- Не принимает параметров

**Поля**
- `_events: Map<string, Set<Function>>` - карта событий и подписчиков

**Методы**
- `on(event: string, callback: Function): void` - подписка на событие
- `off(event: string, callback: Function): void` - отписка от события
- `emit(event: string, data?: unknown): void` - вызов события
- `onAll(callback: Function): void` - подписка на все события
- `offAll(): void` - отписка от всех событий
- `trigger(event: string, context?: object): Function` - создание триггера события

#### Api
Класс для работы с HTTP-запросами.

**Конструктор**
- `baseUrl: string` - базовый URL API
- `options?: RequestInit` - настройки fetch

**Поля**
- `baseUrl: string` - базовый URL для запросов
- `options: RequestInit` - настройки запросов

**Методы**
- `get<T>(url: string): Promise<T>` - GET-запрос
- `post<T>(url: string, data: object): Promise<T>` - POST-запрос

#### Component
Базовый класс для всех компонентов представления. Определяет общий интерфейс и функциональность.

**Конструктор**
- `container: HTMLElement` - элемент-контейнер, в который будет отрисован компонент

**Поля**
- `container: HTMLElement` - элемент-контейнер компонента

**Методы**
- `render(): void` - отрисовка компонента
- `clear(): void` - очистка содержимого контейнера
- `destroy(): void` - удаление компонента

### Представление

#### Form
Базовый класс для работы с формами. Наследуется от Component.

**Конструктор**
- `container: HTMLElement` - элемент-контейнер

**DOM-элементы**
- `form` - форма
- `.form__errors` - элемент для отображения ошибок

**Методы**
- `render(): void` - отрисовка формы
- `validate(): boolean` - базовая валидация формы
- `showErrors(errors: string[]): void` - отображение ошибок
- `clearErrors(): void` - очистка ошибок

#### ContactsForm
Форма ввода контактных данных. Наследуется от Form.

**Конструктор**
- `container: HTMLElement` - элемент-контейнер

**DOM-элементы**
- `input[name=email]` - поле email
- `input[name=phone]` - поле телефона

**Методы**
- `render(): void` - отрисовка формы
- `validate(): boolean` - валидация формы контактов
- `getData(): { email: string, phone: string }` - получение данных формы

#### DeliveryForm
Форма оформления доставки. Наследуется от Form.

**Конструктор**
- `container: HTMLElement` - элемент-контейнер

**DOM-элементы**
- `input[name=address]` - поле адреса
- `.order__buttons` - кнопки выбора оплаты

**Методы**
- `render(): void` - отрисовка формы
- `validate(): boolean` - валидация формы доставки
- `getData(): { address: string, payment: string }` - получение данных формы

#### Card
Компонент карточки товара. Наследуется от базового Component.

**Конструктор**
- `container: HTMLElement` - элемент-контейнер
- `data: IProductServer` - данные товара

**DOM-элементы**
- `.card__title` - заголовок карточки
- `.card__price` - цена товара
- `.card__image` - изображение товара
- `.card__button` - кнопка добавления в корзину

**Методы**
- `render(): void` - отрисовка карточки

#### PreviewCard
Компонент карточки товара с подробным описанием. Наследуется от Card.

**Конструктор**
- `container: HTMLElement` - элемент-контейнер
- `data: IProductServer` - данные товара

**DOM-элементы**
- `.card__title` - заголовок карточки
- `.card__price` - цена товара
- `.card__image` - изображение товара
- `.card__description` - описание товара
- `.card__category` - категория товара
- `.card__button` - кнопка добавления в корзину

**Методы**
- `render(): void` - отрисовка карточки с подробным описанием

#### BasketCard
Компонент карточки товара в корзине. Наследуется от Card.

**Конструктор**
- `container: HTMLElement` - элемент-контейнер
- `data: IBasketItem` - данные товара

**DOM-элементы**
- `.card__title` - название товара
- `.card__price` - цена товара
- `.basket__item-delete` - кнопка удаления
- `.basket__item-index` - порядковый номер

**Методы**
- `render(): void` - отрисовка карточки в корзине

#### SuccessModal
Компонент окна подтверждения успешной покупки. Наследуется от Component.

**Конструктор**
- `container: HTMLElement` - элемент-контейнер
- `orderData: { id: string, total: number }` - данные заказа

**DOM-элементы**
- `.success__title` - заголовок
- `.success__description` - описание
- `.success__order` - номер заказа
- `.success__total` - сумма заказа

**Методы**
- `render(): void` - отрисовка окна подтверждения

#### Basket
Компонент корзины. Наследуется от базового Component.

**Конструктор**
- `container: HTMLElement` - элемент-контейнер
- `items: IBasketItem[]` - список товаров

**DOM-элементы**
- `.basket__list` - список товаров
- `.basket__price` - общая стоимость
- `.basket__button` - кнопка оформления

**Методы**
- `render(items: IBasketItem[]): void` - отрисовка корзины с переданным списком товаров

### Модели данных

#### CatalogModel
Модель каталога товаров. Отвечает за хранение и управление списком доступных товаров.

**Конструктор**
- Не принимает параметров

**Поля**
- `items: IProductServer[]` - массив товаров каталога

**Методы**
- `getItems(): IProductServer[]` - получение всех товаров
- `getItem(id: string): IProductServer | undefined` - получение товара по id
- `setItems(items: IProductServer[]): void` - обновление списка товаров

#### UserModel
Модель пользовательских данных. Отвечает за хранение данных пользователя и заказа.

**Конструктор**
- Не принимает параметров

**Поля**
- `orderData: IOrderFormData | null` - данные текущего заказа

**Методы**
- `setOrderData(data: IOrderFormData): void` - сохранение данных заказа
- `getOrderData(): IOrderFormData | null` - получение данных заказа
- `clearOrderData(): void` - очистка данных заказа

#### BasketService
Сервис управления корзиной. Отвечает за хранение и управление товарами в корзине.

**Конструктор**
- Не принимает параметров

**Поля**
- `items: IBasketItem[]` - массив товаров в корзине

**Методы**
- `add(item: IProductServer): void` - добавление товара
- `remove(id: string): void` - удаление товара
- `clear(): void` - очистка корзины
- `getItems(): IBasketItem[]` - вычисление общей стоимости товаров
- `hasItem(id: string): boolean` - проверка наличия товара в корзине

### Взаимодействие компонентов

### Принцип взаимодействия слоев
1. View генерирует события при действиях пользователя
2. Presenter подписывается на события от View
3. Presenter обрабатывает события и вызывает методы Model
4. Model выполняет бизнес-логику и генерирует события при изменении данных
5. Presenter подписывается на события от Model
6. Presenter обновляет View при получении событий от Model

Пример цепочки событий при оформлении заказа:
1. `card:add` → добавление товара
   - Компонент представления Card при нажатии пользователем кнопки "Купить" генерирует событие card:add.
   - Презентер вызывает метод модели данных BasketService.add
   - Модель данных добавляет полученный в параметрах товар в массив товаров в корзине и генерирует событие basket:change
2. `basket:change` → обновление корзины
   - Модель данных генерирует событие после изменения данных
   - Презентер в обработчике события вызывает рендер компонента Basket для обновления отображения списка товаров в корзине.
3. `basket:open` → открытие корзины
   - Компонент представления генерирует событие при клике на иконку корзины
   - Презентер вызывает ModalService.open с компонентом Basket
   - Модель данных ModalService показывает модальное окно
   - Компонент представления (Modal, Basket) отрисовывает корзину в модальном окне
4. `form:validate` → валидация формы
   - Компонент представления OrderForm генерирует событие при вводе данных
   - Презентер проверяет валидность данных формы
   - Компонент представления OrderForm отображает ошибки или активирует кнопку отправки
5. `form:submit` → отправка формы
   - Компонент представления OrderForm генерирует событие при отправке формы
   - Презентер собирает данные и вызывает API.post
   - Модель данных Api отправляет запрос на сервер
6. `order:success` → успешное оформление
   - Модель данных Api генерирует событие при успешном ответе сервера
   - Презентер вызывает BasketService.clear и ModalService.open
   - Модель данных BasketService очищает корзину
7. `modal:open` → показ подтверждения
   - Презентер вызывает ModalService.open с сообщением об успехе
   - Модель данных ModalService показывает модальное окно
   - Компонент представления Modal отображает сообщение об успешном заказе
8. `basket:change` → очистка корзины
   - Модель данных BasketService генерирует событие после очистки
   - Презентер обновляет счетчик товаров
   - Компонент представления Basket очищает отображение корзины

### Типы данных

Все типы данных определены в `src/types/index.ts`:
- Интерфейсы API (`IApi`, `IApiResponse`)
- Серверные модели (`IProductServer`, `IOrderServer`)
- Клиентские модели (`IProduct`, `IBasketItem`)
- Формы (`IOrderFormData`)
- События (`EventName`)
- Состояния (`IAppState`)
- Сервисы (`IBasketService`, `IModalService`)