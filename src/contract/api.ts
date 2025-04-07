export interface ReqOption {
    url: string,
}

export interface IApi {
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