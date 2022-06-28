import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Permission from 'App/Models/Permission'
import Role from 'App/Models/Role'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Permission, {
    pivotTable: 'permissions_users',
    pivotTimestamps: true,
  })
  public permissions: ManyToMany<typeof Permission>

  @manyToMany(() => Role, {
    pivotTable: 'roles_users',
    pivotTimestamps: true,
  })
  public roles: ManyToMany<typeof Role>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  public async getAuthorizations() {
    await this.load('permissions');
    await this.load('roles', (rolesQuery) => rolesQuery.preload('permissions'))
    const totalArr = [];
    if (this.roles && this.roles.length > 0)
      this.roles.forEach(role => {
        role.permissions.forEach(permission => {
          totalArr.push(permission.name);
        })
      });

    if (this.permissions && this.permissions.length > 0)
      this.permissions.forEach(permission => {
        totalArr.push(permission.name);
      })

    this['authorizations'] = [...new Set(totalArr)]
  }
}
