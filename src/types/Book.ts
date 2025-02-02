export interface BookType {
    id: string;
    Image: string;
    Title: string;
    Author: string;
    Category: string;
    Price: number;
    Pdf: File;
    CoverPhoto: string;
    Version: string;
    OlderVersion?: string;
    Edition?: string;
    ISBN: string;
    ReleaseDate?: Date;
    Notes: string;    
}
