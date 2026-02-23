import { Pathway } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/pathways`

const getPathway = async (id: string): Promise<Pathway> => {
    const res = await fetch(`${URL}/${id}`);
    return res.json();
}

export default getPathway;