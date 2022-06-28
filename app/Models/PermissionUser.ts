import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Permission from 'App/Models/Permission'
import User from 'App/Models/User'

export default class PermissionUser extends BaseModel {

  public static table = 'permissions_users'

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'permission_id', serializeAs: 'permissionId' })
  public permissionId: number

  @belongsTo(() => Permission, {
    foreignKey: 'permissionId',
  })
  public permission: BelongsTo<typeof Permission>

  @column({ columnName: 'user_id', serializeAs: 'userId' })
  public userId: number

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
