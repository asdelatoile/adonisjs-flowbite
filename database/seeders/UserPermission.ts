import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    // const userAdmin = await User.find(1)
    // await userAdmin?.related('permissions').attach([4, 5])
  }
}
