import { api } from "../utilities";

export const getInterestCategories = async () => {
    const response = await api.get("interests/");
    const categories = response.data;
    return categories;
};