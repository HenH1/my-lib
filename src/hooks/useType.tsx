import { Author } from '../models/Author';
import { Book } from '../models/Book';
import { User } from '../models/User';

const useType = (object: any): string => {
    if (object) {
        if ((object as User).userName) {
            return 'user';
        } else if ((object as Book).bookName) {
            return 'book';
        }
        else if ((object as Author).authorName) {
            return 'author';
        }
    }
    return '';
}

export default useType;