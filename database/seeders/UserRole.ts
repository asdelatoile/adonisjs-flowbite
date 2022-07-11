import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    const user1 = await User.find(1)
    await user1?.related('roles').attach([1])
  }
}
