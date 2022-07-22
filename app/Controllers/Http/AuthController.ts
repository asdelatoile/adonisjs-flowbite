import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import LoginValidator from "App/Validators/LoginValidator";

export default class AuthController {
    public async login({ view }: HttpContextContract) {
        return view.render("login");
    }

    public async logout({ auth, response }: HttpContextContract) {
        await auth.use('web').logout()
        response.redirect('/login')
    }


    public async authenticate({
        request,
        auth,
        session,
        response,
    }: HttpContextContract) {

        const email = request.input("email");
        const password = request.input("password");

        await request.validate(LoginValidator);

        try {
            await auth.use("web").attempt(email, password);
            session.flash("success", "Ok !");
            return response.redirect().toRoute("permissions.index");
        } catch {
            session.flash("email", email);
            session.flash("error", "Error !");
            return response.redirect().withQs().back();
        }
    }
}
