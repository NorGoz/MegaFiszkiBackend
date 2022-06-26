export interface Word{
    id?: string;
    polish: string;
    english: string;
    category: string;
    remember?: boolean;
    create?: string;
}

export interface WordForResponse{
    id:string;
    polish:string;
    english: string;
    category: string;
    remember: boolean;
}
