import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Permission from "App/Models/Permission";
import PermissionValidator from "App/Validators/PermissionValidator";
import customConfig from "Config/custom";
import Route from "@ioc:Adonis/Core/Route";

export default class PermissionController {
  public async index({
    request,
    response,
    view,
    bouncer,
    route,
    session,
  }: HttpContextContract) {
    await bouncer.authorize("dynamic", route?.name);

    const page = request.input("page", session.get("permissions.page", 1));
    if (session.get("permissions.page") !== page)
      session.put("permissions.page", page);

    const sort = request.input(
      "sort",
      session.get("permissions.sort", customConfig.pagination.field)
    );
    if (session.get("permissions.sort") !== sort)
      session.put("permissions.sort", sort);

    const dir = request.input(
      "dir",
      session.get("permissions.dir", customConfig.pagination.dir)
    );
    if (session.get("permissions.dir") !== dir)
      session.put("permissions.dir", dir);

    let limit = request.input(
      "limit",
      session.get("permissions.limit", customConfig.pagination.limit)
    );
    if (session.get("permissions.limit") !== limit)
      session.put("permissions.limit", limit);
    if (limit === "-1") limit = Infinity;

    const permissions = await Database.from(Permission.table)
      .orderBy(sort, dir)
      .paginate(page, limit);
    if (permissions.currentPage > permissions.lastPage) {
      return response
        .redirect()
        .toRoute("permissions.index", { qs: { page: permissions.lastPage } });
    }
    const url = Route.builder().make("permissions.index");
    permissions.baseUrl(url);
    return view.render("permissions/index", { permissions });
  }

  public async create({ view, bouncer, route }: HttpContextContract) {
    await bouncer.authorize("dynamic", route?.name);
    return view.render("permissions/create");
  }

  public async store({
    request,
    response,
    session,
    bouncer,
    route,
  }: HttpContextContract) {
    await bouncer.authorize("dynamic", route?.name);
    const payload = await request.validate(PermissionValidator);
    await Permission.create(payload);
    session.flash("success", "Permission created successfully");
    return response.redirect().toRoute("permissions.index");
  }

  public async show({ response, params, bouncer, route }: HttpContextContract) {
    await bouncer.authorize("dynamic", route?.name);
    const permission = await Permission.findOrFail(params.id);
    return response.ok(permission);
  }

  public async edit({ params, view, bouncer, route }: HttpContextContract) {
    await bouncer.authorize("dynamic", route?.name);
    const { id } = params;
    let record: Permission;
    record = await Permission.findOrFail(id);
    return view.render("permissions/edit", { record });
  }

  public async update({
    request,
    response,
    session,
    params,
    bouncer,
    route,
  }: HttpContextContract) {
    await bouncer.authorize("dynamic", route?.name);
    const { id } = params;
    const permission = await Permission.findOrFail(id);
    const payload = await request.validate(PermissionValidator);
    permission.merge(payload).save();
    session.flash("success", "Permission updated successfully");
    return response.redirect().toRoute("permissions.index");
  }

  public async destroy({
    response,
    params,
    session,
    bouncer,
    route,
  }: HttpContextContract) {
    await bouncer.authorize("dynamic", route?.name);
    const permission = await Permission.findOrFail(params.id);
    permission.delete();
    session.flash("success", "Permission deleted successfully");
    return response.redirect().withQs().back();
  }
}
