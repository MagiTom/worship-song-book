export interface Song{
    title: string;
    text: string;
    link: string;
}

export interface SongRes extends Song{
    id: string;
}

export interface SongDb{
    title: string;
    text: string;
    columns: number;
    songId: string;
    transpose: number;
    link: string;
}

export interface SongDbRes extends SongDb{
    id: number;
}