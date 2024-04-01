export interface Song{
    title: string;
    text: string;
}

export interface SongRes extends Song{
    id: string;
}