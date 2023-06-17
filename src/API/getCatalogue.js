import { CATALOGUE_URL } from "../Helper/Constant";
export const getCatalogue = async () => {
    const data = await fetch(CATALOGUE_URL);
    const json = await data.json();
    return json;
}
