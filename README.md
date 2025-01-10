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
- **Model** - отвечает за данные и бизнес-логику
- **View** - отвечает за отображение данных
- **Presenter** - связывает Model и View

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
    quantity: number;
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

### Модели данных

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

#### BasketService
Сервис управления корзиной. Отвечает за хранение и управление товарами в корзине.

**Конструктор**
- Не принимает параметров

**Поля**
- `items: IBasketItem[]` - массив товаров в корзине
- `total: number` - общая стоимость товаров

**Методы**
- `add(item: IProductServer): void` - добавление товара
- `remove(id: string): void` - удаление товара
- `clear(): void` - очистка корзины
- `getItems(): IBasketItem[]` - получение списка товаров
- `getTotal(): number` - получение общей стоимости

### Представление

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
- `render(): void` - отрисовка корзины

#### OrderForm
Компонент формы заказа. Наследуется от базового Component.

**Конструктор**
- `container: HTMLElement` - элемент-контейнер

**DOM-элементы**
- `form[name=order]` - форма заказа
- `input[name=email]` - поле email
- `input[name=phone]` - поле телефона
- `input[name=address]` - поле адреса
- `.order__buttons` - кнопки выбора оплаты

**Методы**
- `render(): void` - отрисовка формы
- `validate(): boolean` - проверка формы

### Взаимодействие компонентов

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