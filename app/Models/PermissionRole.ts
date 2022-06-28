import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Permission from 'App/Models/Permission'
import Role from 'App/Models/Role'

export default class PermissionRole extends BaseModel {

  public static table = 'permissions_roles'

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'permission_id', serializeAs: 'permissionId' })
  public permissionId: number

  @belongsTo(() => Permission, {
    foreignKey: 'permissionId',
  })
  public permission: BelongsTo<typeof Permission>

  @column({ columnName: 'role_id', serializeAs: 'roleId' })
  public roleId: number

  @belongsTo(() => Role, {
    foreignKey: 'roleId',
  })
  public role: BelongsTo<typeof Role>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
