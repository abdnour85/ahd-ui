export interface ListResponse<T> {
    length: number,
    items: Array<T>
}

export enum RequestStatus {
    NotSent, Sending, Suceess, Failed
}

export interface ResultResponse{
    result: string
}