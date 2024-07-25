import {Author, AuthorEntry, AuthorResponse} from "../types/author.type.ts";
import api from "../api.ts";

export const getAuthors = async (): Promise<AuthorResponse[]> => {
    const response = await api.get('/api/authors');
    return response.data._embedded.authors;
};

export const addAuthor = async (author: Author): Promise<AuthorResponse> => {
    const response = await api.post('/api/authors', author);
    return response.data;
};

export const updateAuthor = async (authorEntry: AuthorEntry): Promise<AuthorResponse> => {
    const response = await api.put(authorEntry.link, authorEntry.author);
    return response.data;
};

export const deleteAuthor = async (link: string): Promise<AuthorResponse> => {
    const response = await api.delete(link);
    return response.data;
}