export interface ReqOption {
    url: string,
}

export interface IApi<THeader = any, TQuery = any, TParams = any, TBody = any, TFiles = any> {
    header?: THeader;
    query?: TQuery;
    params?: TParams;
    body?: TBody;
    files?: TFiles;
    call(): Promise<any>
}

type ApiClass<T> = {
    new(...args: any[]): T
}

export interface ReqMetaData {
    [route: string]: {
        api: ApiClass<IApi>
    }
}