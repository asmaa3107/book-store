export interface BookType {
    title: string;
    author: string;
    category: string;
    price: number;
    pdf: File;
    coverPhoto: File;
    version: string;
    olderVersion?: string;
    edition?: string;
    isbn: string;
    releaseDate?: Date;
    brief: string;    
}