import login from '../components/login.vue'
import home from '../components/publication.vue'
import profile from '../components/profil.vue'

export default[
    {path: '/', component:login, meta: { guest: true}},
    {path: '/home', component:home, meta: { requiresAuth: true }},
    {path: '/profil', component:profile, meta: { requiresAuth: true }},
    
]