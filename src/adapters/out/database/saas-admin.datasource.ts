import { DataSource, DataSourceOptions } from 'typeorm';
import { Tenants } from './entities/saas_admin/tenant.entity';

export class SaasAdminDataSource {
  private static instance: DataSource;

  static getInstance(): DataSource {
    if (!SaasAdminDataSource.instance) {
      SaasAdminDataSource.instance = SaasAdminDataSource.createDataSource();
    }
    return SaasAdminDataSource.instance;
  }

  private static createDataSource(): DataSource {
    const dataSourceOptions: DataSourceOptions = {
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: String(process.env.DATABASE_PASSWORD),
      database: process.env.DATABASE_NAME,
      logging: 'all',
      schema: 'saas_admin',
      entities: [Tenants],
      migrations: ['dist/adapters/out/database/migrations/saas_admin/**/*.js'],
    };
    const dataSource = new DataSource(dataSourceOptions);

    dataSource
      .initialize()
      .then(async () => {
        console.log('Admin DataSource initialized');
        await dataSource.createQueryRunner().createSchema('saas_admin', true); // Create schema if it doesn't exist
        await dataSource.runMigrations({ transaction: 'each' });
      })
      .catch((error) => {
        console.error('Error initializing Admin DataSource', error);
      });

    return dataSource;
  }
}
