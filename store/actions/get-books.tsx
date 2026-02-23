import { Book } from "@/types";
import qs from 'query-string';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/books`;

interface Query {
    pathwayId?: string;
    gradeId?: string;
    durationId?: string;
    isFeatured?: boolean;
}

const getBooks = async (query: Query): Promise<Book[]> => {
    const url = qs.stringifyUrl({
        url: URL,
        query: {
            pathwayId: query.pathwayId,
            gradeId: query.gradeId,
            durationId: query.durationId,
            isFeatured: query.isFeatured
        }
    })
    const res = await fetch(url);
    return res.json();
}

export default getBooks;