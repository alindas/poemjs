import { Inject, Service } from 'typedi';
import { join } from 'path';

import { FileFactoryBase } from '../../contract/file-factory-base';
import { PersistentFile } from '../../contract/common';

const Mock_File_Save_Path = join(process.cwd(), 'public/files')

@Service()
export class FileManager {

    @Inject()
    public fileFactory: FileFactoryBase;

    public async handleFile(file: PersistentFile) {
        this.fileFactory.build(Mock_File_Save_Path)
        this.fileFactory.saveFile(file)
    }

}