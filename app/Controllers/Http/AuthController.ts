import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import LoginValidator from "App/Validators/LoginValidator";
// import Mail from '@ioc:Adonis/Addons/Mail'

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

    public async forgotpassword({}){
        // await Mail.sendLater((message) => {
        //     message
        //       .from('info@example.com')
        //       .to('virk@adonisjs.com')
        //       .subject('Welcome Onboard!')
        //       .htmlView('emails/forgotpassword', {
        //         user: { fullName: 'Some Name' },
        //         url: 'https://your-app.com/verification-url',
        //       })
              
        //   })
    }

    
}
