import { Service } from 'typedi';
import { parse } from 'yaml';
import { readFileSync } from 'fs';
import { join } from 'path';

import { ConfigFactoryBase } from '../../contract/config-factory-base';


@Service({ id: ConfigFactoryBase })
export class ConfigFactory extends ConfigFactoryBase {
    private config: any;

    build() {
        if (this.config) {
            return this.config;
        }

        const configPath = join(process.cwd(), 'config.yaml');
        const fileContents = readFileSync(configPath, 'utf8');
        this.config = parse(fileContents);

        return this.config;
    }
}
