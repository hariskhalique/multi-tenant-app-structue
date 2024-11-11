import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTenantData1730707590000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Insert initial tenants
    await queryRunner.query(`
            INSERT INTO saas_admin.tenants (schema, tenant_name)
            VALUES 
            ('', 'Tenant 1'),
            ('', 'Tenant 2'),
            ('', 'Tenant 3')
            RETURNING id;
        `);

    // Update each inserted row to set the schema name based on the id
    await queryRunner.query(`
            UPDATE saas_admin.tenants
            SET schema = 'saas_tenant_' || id
            WHERE schema = '';
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Delete the inserted tenants (optional rollback)
    await queryRunner.query(`
            DELETE FROM saas_admin.tenants WHERE id IN ('1', '2', '3');
        `);
  }
}
