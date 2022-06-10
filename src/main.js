import { createApp } from 'vue';
import { createRouter, createWebHistory} from 'vue-router'

import App from './App.vue';
import TeamsList from '@/components/teams/TeamsList';
import UsersList from '@/components/users/UsersList';
import TeamMembers from './components/teams/TeamMembers';
import NotFound from '@/components/nav/NotFound';


const router = createRouter({
  history: createWebHistory() ,
  routes: [
     {path:'/', redirect: '/teams'},
    { name:"teams", path: '/teams', component: TeamsList,  children: [
        { name:'team-members', path: ':teamId', component: TeamMembers},
      ]},
    {path: '/users', component: UsersList,
      beforeEnter(to,from,next){
        console.log(to, from);
        next()
      }
      },

    {path: '/:notFound(.*)' , component: NotFound ,} // catchall must come last.

    // {path: '/teams/new'}, // routes need to go above dynamic routes.

  ],
  scrollBehavior(to,from ,savedPostion){
    console.log(to, from , savedPostion);
    if(savedPostion){
      return savedPostion;
    }
    return {left: 0 , top: 0};
  }
});
// route guarding
router.beforeEach(function(to, from, next) {
  console.log(to, from );
  // redirect using next.
  /*
  if (to.name === 'team-members'){
    next();
  }else{
    next({name: 'team-members', params: {teamId: 't2'}})
  }*/

  next();
})




const app = createApp(App)
app.use(router)

app.mount('#app');

