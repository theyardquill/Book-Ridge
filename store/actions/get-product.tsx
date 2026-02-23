
import { Book } from "@/types";
const URL = `${process.env.NEXT_PUBLIC_API_URL}/books`

const getProduct = async (id: string): Promise<Book> => {
    const res = await fetch(`${URL}/${id}`);
    return res.json();
}

export default getProduct;