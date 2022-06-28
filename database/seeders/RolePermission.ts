import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'

export default class extends BaseSeeder {
  public async run () {
    const roleAdmin = await Role.find(1)
    // await roleAdmin?.related('permissions').attach([1, 2, 3, 4, 5])
    await roleAdmin?.related('permissions').attach([1, 2, 3, 4, 5, 6, 7])
  }
}
