import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Permission from 'App/Models/Permission'

export default class PermissionController {

  public async index({ request, response, view, bouncer, route }: HttpContextContract) {
    await bouncer.authorize('dynamic', route.name)
    const permissions = await Permission.all()
    return view.render('permissions/index', {permissions})
  }

  public async create({ response, view, bouncer, route }: HttpContextContract) {
    await bouncer.authorize('dynamic', route.name)
    return view.render('permissions/create')
  }

  public async store({ request, response, session, bouncer, route }: HttpContextContract) {
    await bouncer.authorize('dynamic', route.name)
    const newPermissionSchema = schema.create({
      name: schema.string()
    })
    const payload = await request.validate({
      schema: newPermissionSchema
    })
    await Permission.create(payload)
    session.flash('success', 'Permission created successfully')
    response.redirect().back()
  }

  public async show({ response, params, bouncer, route }: HttpContextContract) {
    await bouncer.authorize('dynamic', route.name)
    console.log(params)
    const permission = await Permission.findOrFail(params.id)
    return response.ok(permission)
  }

  public async update({ request, response, params, bouncer, route }: HttpContextContract) {
    await bouncer.authorize('dynamic', route.name)
    const permission = await Permission.findOrFail(params.id)
    // const payload = await request.validate(UpdateTaskValidator)
    permission.merge(payload).save()
    return response.ok(permission)
  }

  public async destroy({ response, params, bouncer, route }: HttpContextContract) {
    await bouncer.authorize('dynamic', route.name)
    const permission = await Permission.findOrFail(params.id)
    permission.delete()
    return response.ok(permission)
  }
}
