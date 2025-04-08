import { Service } from 'typedi';
import Log4js, { Logger } from 'log4js';

import { LogFactoryBase } from '../../contract/log-factory-base';

@Service({ id: LogFactoryBase })
export class LogFactory extends LogFactoryBase {

    private logger: Logger;

    constructor() {
        super()
        this.build()
    }

    public addField(msg: string) {
        console.log('addField:', msg)
        this.logger.error(msg)
    }

    public build() {
        Log4js.configure({
            appenders: {
                file: {
                    type: 'dateFile',
                    filename: 'logs/app.log',
                    pattern: 'yyyy-MM-dd',
                    maxLogSize: 10 * 1024 * 1024,
                    backups: 5
                },
            },
            categories: {
                default: {
                    appenders: ['file'],
                    level: 'info'
                }
            }
        })
        this.logger = Log4js.getLogger()
    }
}