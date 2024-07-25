
export interface AuthorResponse {
    firstName: string;
    lastName: string;
    birthday: string;
    gender: string;
    _links: {
        self: {
            href: string;
        };
        author: {
            href: string;
        };
    }
}

export interface Author {
    firstName: string;
    lastName: string;
    birthday: string;
    gender: 'MALE' | 'FEMALE' | 'UNKNOWN';
}

export interface AuthorEntry {
    author: Author;
    link: string;
}