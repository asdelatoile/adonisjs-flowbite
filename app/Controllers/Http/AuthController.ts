import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Validators/LoginValidator'

export default class AuthController {

    public async login({ view }: HttpContextContract) {
        return view.render('login')
    }

    public async authenticate({ request, auth, session, response }: HttpContextContract) {
        await request.validate(LoginValidator)

        const email = request.input('email')
        const password = request.input('password')

        try {
            await auth.use('web').attempt(email, password)
            session.flash('success', 'Ok !')
            // return response.redirect().back()
            return response.redirect().toRoute('permissions.index')
        } catch {
            session.flash('email', email)
            session.flash('error', 'Error !')
            return response.redirect().back()
        }
    }
}
