import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permission from 'App/Models/Permission'

export default class extends BaseSeeder {
  public async run () {
    await Permission.createMany([
      {
        name: 'permissions.index',
        description: 'perm1 description'
      },
      {
        name: 'permissions.create',
        description: 'perm1 description'
      },
      {
        name: 'permissions.store',
        description: 'perm2 description'
      },
      {
        name: 'permissions.edit',
        description: 'perm3 description'
      },
      {
        name: 'permissions.show',
        description: 'perm3 description'
      },
      {
        name: 'permissions.update',
        description: 'perm4 description'
      },
      {
        name: 'permissions.destroy',
        description: 'perm5 description'
      }
    ])
  }
}
