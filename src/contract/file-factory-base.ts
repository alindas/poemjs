import { PersistentFile } from './common';

export abstract class FileFactoryBase {
    abstract build(path: string): void;
    abstract exits(): Boolean;
    abstract read(): String;
    abstract saveFile(file: PersistentFile): Promise<void>;
}