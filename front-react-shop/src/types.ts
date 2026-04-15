export interface Products {
    id: number;
    documentId: string;
    title: string;
    price: number;
    description: string;
    stock: number;
    image?: {
        url: string;
        formats?: {
            small?: { url: string };
            medium?: { url: string };
            thumbnail?: { url: string };
        };
    };
}

export interface CartItem extends Products {
    quantity: number;
}

export interface CartState {
    items: CartItem[];
}

export interface ResponseProducts {
    data: Products[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

