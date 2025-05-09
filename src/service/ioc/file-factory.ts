import { Service } from 'typedi';
import fs from 'fs';
import { join } from 'path';

import { FileFactoryBase } from '../../contract/file-factory-base';
import { PersistentFile } from '../../contract/common';

@Service({ id: FileFactoryBase, transient: true })
export class FileFactory extends FileFactoryBase {
    public path: string;

    // public constructor(public path: string) {
    //     super();
    // }

    public build(path: string) {
        this.path = path;
    }

    public exits(create = false) {
        if (!fs.existsSync(this.path)) {
            if (create) {
                fs.mkdirSync(this.path, { recursive: true });
                return true
            } else {
                return false;
            }
        }
        return true
    }

    public read() {
        return fs.readFileSync(this.path, { encoding: 'utf8' });
    }

    public async saveFile(file: PersistentFile) {
        this.exits(true)
        const newFilename = `${Date.now()}-${file.originalFilename}`;
        const filePath = join(this.path, newFilename);

        // 移动文件从临时位置到目标位置
        await fs.promises.rename(file.filepath, filePath);

    }

}