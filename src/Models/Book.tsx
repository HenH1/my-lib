import { Author } from "./Author";

export interface Book {
    /** The book's id */
    id: number;
    /** The book's name */
    bookName: string;
    /** Should the name be rendered in bold */
    authors: Author;
}

