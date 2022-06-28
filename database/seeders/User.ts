import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    
    await User.createMany([
      {
        email: 'admin@test.com',
        password: 'password',
      },
      {
        email: 'user@test.com',
        password: 'password',
      }
    ])
  }
}
