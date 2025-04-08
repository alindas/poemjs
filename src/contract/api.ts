export interface ReqOption {
    url: string,
}

export interface IApi<THeader = any, TParams = any, TBody = any> {
    header?: THeader;
    params?: TParams;
    body?: TBody;
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