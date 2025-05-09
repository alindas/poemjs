import { Inject, Service } from 'typedi';

import { IApi } from '../../contract/api';
import { Post } from '../../decorator';
import { PersistentFile } from '../../contract/common';
import { FileManager } from '../../service/fs/file-manager';

@Post('/test-file')
@Service({ transient: true })
export class TestFileAPI implements IApi {

    @Inject()
    public fileManager: FileManager;

    public files: { file: PersistentFile };

    public async call() {
        this.fileManager.handleFile(this.files.file)
    }

}