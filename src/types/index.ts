import {EventName as BaseEventName, IEvents, Subscriber} from '../components/base/events';

// Расширяем базовый тип событий
type EventName = BaseEventName
    | 'catalog:loaded'
    | 'card:click'
    | 'card:add'
    | 'basket:change'
    | 'basket:open'
    | 'basket:item:remove'
    | 'basket:item:update'
    | 'order:start'
    | 'form:submit'
    | 'form:validate'
    | 'order:success'
    | 'modal:open'
    | 'modal:close';

type EventCallback = Subscriber;

// Интерфейсы базовых классов
interface IComponent {
    render: () => void;
    destroy: () => void;
}

// Интерфейсы API
interface IApiResponse<T> {
    success: boolean;
    result: T;
    error?: string;
}

interface IApi {
    get: <T>(url: string) => Promise<IApiResponse<T>>;
    post: <T>(url: string, data: unknown) => Promise<IApiResponse<T>>;
    handleResponse: <T>(response: Response) => Promise<IApiResponse<T>>;
}

// Интерфейсы данных с сервера
interface IProductServer {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

interface IOrderServer {
    payment: string;
    email: string;
    phone: string;
    address: string;
    items: string[];
    total: number;
}

// Интерфейсы для отображения
interface IProduct extends IProductServer {
    selected?: boolean;
}

interface IBasketItem extends IProduct {
    quantity: number;
}

// Интерфейсы форм
type PaymentMethod = 'card' | 'cash';

interface IOrderFormData {
    email: string;
    phone: string;
    address: string;
    payment: PaymentMethod;
}

// Интерфейсы состояний
interface IAppState {
    catalog: IProduct[];
    basket: IBasketItem[];
    order: IOrderFormData | null;
    preview: string | null;
}

// Интерфейсы сервисов
interface IBasketService {
    add: (item: IProduct) => void;
    remove: (id: string) => void;
    update: (id: string, quantity: number) => void;
    clear: () => void;
    getItems: () => IBasketItem[];
    getTotal: () => number;
}

interface IModalService {
    open: (content: string) => void;
    close: () => void;
    render: () => void;
}

// Интерфейсы конструкторов компонентов
interface ICardConstructor {
    new (container: HTMLElement, data: IProduct): IComponent;
}

interface IBasketConstructor {
    new (container: HTMLElement, data: IBasketItem[]): IComponent;
}

interface IModalConstructor {
    new (container: HTMLElement): IModalService & IComponent;
}

export {
    EventName,
    EventCallback,
    IEvents,
    IComponent,
    IApiResponse,
    IApi,
    IProductServer,
    IOrderServer,
    IProduct,
    IBasketItem,
    PaymentMethod,
    IOrderFormData,
    IAppState,
    IBasketService,
    IModalService,
    ICardConstructor,
    IBasketConstructor,
    IModalConstructor
};