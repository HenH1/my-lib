import { Book } from "./Book";

export interface User {
    /** The user's id */
    id: number;
    /** The user's name */
    userName: string;
    /** The user's favorite book id */
    favoriteBookId: number;
    /** Should the name be rendered in bold */
    books: Array<Book>;
}

