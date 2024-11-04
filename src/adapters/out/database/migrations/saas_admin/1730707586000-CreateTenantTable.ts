import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTenantTable1730707590000 implements MigrationInterface { 
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'tenants',
                schema: 'saas_admin',  // Specify the schema here
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                      },
                    {
                        name: 'tenant_name',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'schema',
                        type: 'varchar',
                    },
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('saas_admin.tenants');
    }
}