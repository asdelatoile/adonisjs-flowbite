import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/Permission'
import PermissionValidator from 'App/Validators/PermissionValidator'

export default class PermissionController {

  public async index({ view, bouncer, route }: HttpContextContract) {
    await bouncer.authorize('dynamic', route?.name)
    const permissions = await Permission.all()
    return view.render('permissions/index', { permissions })
  }

  public async create({ view, bouncer, route }: HttpContextContract) {
    await bouncer.authorize('dynamic', route?.name)
    return view.render('permissions/create')
  }

  public async store({ request, response, session, bouncer, route }: HttpContextContract) {
    await bouncer.authorize('dynamic', route?.name)
    const payload = await request.validate(PermissionValidator)
    await Permission.create(payload)
    session.flash('success', 'Permission created successfully')
    return response.redirect().back()
  }

  public async show({ response, params, bouncer, route }: HttpContextContract) {
    await bouncer.authorize('dynamic', route?.name)
    const permission = await Permission.findOrFail(params.id)
    return response.ok(permission)
  }

  public async edit({ params, view, bouncer, route }: HttpContextContract) {
    await bouncer.authorize('dynamic', route?.name)
    const { id } = params
    let record: Permission
    record = await Permission.findOrFail(id)
    return view.render('permissions/edit', { record })
  }

  public async update({ request, response, session, params, bouncer, route }: HttpContextContract) {
    await bouncer.authorize('dynamic', route?.name)
    const { id } = params
    const permission = await Permission.findOrFail(id)
    const payload = await request.validate(PermissionValidator)
    permission.merge(payload).save()
    session.flash('success', 'Permission updated successfully')
    return response.redirect().toRoute('permissions.index')
  }



  public async destroy({ response, params, bouncer, route }: HttpContextContract) {
    await bouncer.authorize('dynamic', route?.name)
    const permission = await Permission.findOrFail(params.id)
    permission.delete()
    return response.ok(permission)
  }
}
