export interface PersistentFile extends File {
    /**文件在服务器上的临时路径 */
    filepath: string;
    name: string;
    size: number;
    mimetype: string;
    /**客户端上传时的原始文件名 */
    originalFilename: string;
    /**服务器生成的新文件名（如果有） */
    newFilename?: string;
    /**文件的哈希值(如果启用) */
    hash?: string;
    /**销毁文件 */
    destroy: () => void;
}
