import { Grade } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/grades`;

const getGrades = async (): Promise<Grade[]> => {
    const res = await fetch(URL, { cache: 'no-store' });

    if (!res.ok) {
        throw new Error(`Failed to fetch grades: ${res.status}`);
    }

    return res.json();
};

export default getGrades;