export interface Billboard {
    id: string;
    label: string;
    imageUrl: string;
}

export interface Pathway {
    id: string;
    name: string;
    billboard: Billboard;
}

export interface Book {
    id: string;
    pathway: Pathway;
    name: string;
    price: string;
    isFeatured: boolean;
    grade: Grade;
    duration: Duration;
    description: string | null;
    images: Image[]
}

export interface Image {
    id: string;
    url: string;
}

export interface Grade {
    id: string;
    name: string;
    value: string;
}

export interface Duration {
    id: string;
    name: string;
    value: string;
}