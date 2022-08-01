import { DataSource } from 'typeorm';
import { ConfigType } from '@nestjs/config';
import { DataSourceEnum } from '@shared/enums';
import config from '../config/config';

export const databaseProviders = [
  {
    provide: DataSourceEnum.PG_DATA_SOURCE,
    inject: [config.KEY],
    useFactory: async (configService: ConfigType<typeof config>) => {
      const { username, host, database, password, port, schemaAuth } =
        configService.database;
      const dataSource = new DataSource({
        type: 'postgres',
        host,
        port,
        username,
        password,
        database,
        schema: schemaAuth,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        // entities: [UserEntity, StudentEntity, CatalogueEntity],
        // migrations: ['src/database/migrations/*.ts'],
        // migrationsTableName: 'migrations',
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
