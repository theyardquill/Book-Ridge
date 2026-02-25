import { Book } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/books`;

const getBook = async (id: string): Promise<Book> => {
    const res = await fetch(`${URL}/${id}`, { cache: 'no-store' });

    if (!res.ok) {
        throw new Error(`Failed to fetch book: ${res.status}`);
    }

    return res.json();
};

export default getBook;