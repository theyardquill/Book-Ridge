import { Pathway } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/pathways`;

const getPathways = async (): Promise<Pathway[]> => {
    const res = await fetch(URL, { cache: 'no-store' });

    if (!res.ok) {
        throw new Error(`Failed to fetch pathways: ${res.status}`);
    }

    return res.json();
};

export default getPathways;