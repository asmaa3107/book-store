export interface BookType {
    id: string;
    Image: string;
    Title: string;
    Author: string;
    Publisher: string;
    Category: string;
    Price: number;
    Pdf: File;
    CoverPhoto: string;
    Version: string;
    OlderVersion?: string;
    Edition?: string;
    ISBN: string;
    ReleaseDate?: Date;
    Date?: string;
    Notes: string;    
    brief: string;    
}
