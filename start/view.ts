import View from '@ioc:Adonis/Core/View'
import Env from '@ioc:Adonis/Core/Env'

View.global('app', {
    name: Env.get('APP_TITLE')
})