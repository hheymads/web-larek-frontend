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

### Базовые классы и утилиты

#### EventEmitter
Базовый класс для работы с событиями. Реализует паттерн «Наблюдатель».

Методы:
- `on(event: EventName, callback: Function)` - подписка на событие
- `off(event: EventName, callback: Function)` - отписка от события
- `emit(event: EventName, data?: unknown)` - вызов события
- `once(event: EventName, callback: Function)` - одноразовая подписка

#### Api
Класс для работы с HTTP-запросами.

Методы:
- `get<T>(url: string): Promise<T>` - GET-запрос
- `post<T>(url: string, data: unknown): Promise<T>` - POST-запрос
- `handleResponse<T>(response: Response): Promise<T>` - обработка ответа

#### Component
Базовый класс для компонентов интерфейса.

Методы:
- `render(): void` - отрисовка компонента
- `destroy(): void` - удаление компонента

### Компоненты приложения

#### Card
Компонент карточки товара.

Интерфейс:
```typescript
interface IProduct {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    price: number;
}
```

События:
- `card:click` - клик по карточке
- `card:add` - добавление в корзину

#### Catalog
Компонент каталога товаров.

События:
- `catalog:loaded` - загрузка товаров

#### Basket
Компонент корзины.

Интерфейс:
```typescript
interface IBasketItem extends IProduct {
    quantity: number;
}
```

События:
- `basket:change` - изменение состава
- `basket:open` - открытие корзины
- `basket:item:remove` - удаление товара
- `basket:item:update` - обновление количества

#### OrderForm
Компонент формы заказа.

Интерфейс:
```typescript
interface IOrderFormData {
    email: string;
    phone: string;
    address: string;
    payment: 'card' | 'cash';
}
```

События:
- `form:submit` - отправка формы
- `form:validate` - валидация
- `order:success` - успешный заказ

#### Modal
Компонент модального окна.

События:
- `modal:open` - открытие
- `modal:close` - закрытие

### Сервисы

#### BasketService
Сервис управления корзиной.

Методы:
- `add(item: IProduct): void`
- `remove(id: string): void`
- `update(id: string, quantity: number): void`
- `clear(): void`
- `getItems(): IBasketItem[]`
- `getTotal(): number`

#### ModalService
Сервис управления модальными окнами.

Методы:
- `open(content: string): void`
- `close(): void`
- `render(): void`

### Взаимодействие компонентов

Пример цепочки событий при оформлении заказа:
1. `card:add` → добавление товара
2. `basket:change` → обновление корзины
3. `basket:open` → открытие корзины
4. `form:validate` → валидация формы
5. `form:submit` → отправка формы
6. `order:success` → успешное оформление
7. `modal:open` → показ подтверждения
8. `basket:change` → очистка корзины

### Типы данных

Все типы данных определены в `src/types/index.ts`:
- Интерфейсы API (`IApi`, `IApiResponse`)
- Серверные модели (`IProductServer`, `IOrderServer`)
- Клиентские модели (`IProduct`, `IBasketItem`)
- Формы (`IOrderFormData`)
- События (`EventName`)
- Состояния (`IAppState`)
- Сервисы (`IBasketService`, `IModalService`)