import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

const getBillboard = async (id: string): Promise<Billboard> => {
    const res = await fetch(`${URL}/${id}`, { cache: 'no-store' });

    if (!res.ok) {
        throw new Error(`Failed to fetch billboard: ${res.status}`);
    }

    return res.json();
};

export default getBillboard;