import { createWebHistory, createRouter } from "vue-router";
import TrendC from '../components/TrendC.vue';
import TvSeries from '../components/TvSeries.vue';
import ShowComp from '../components/ShowComp.vue';
import ShowInfo from '../components/ShowInfo.vue';
import ShowSeason from '../components/ShowSeason.vue';
import CastD from '../components/CastD.vue';
//import pageNotFound from '../components/PageNotFound.vue';

const routes = [
    {
       path: '/',
      name: 'TrendC',
      component: TrendC
    
   },
     {
       path: '/genre/:data',
      name: 'TvSeries',
      component: TvSeries
    
    },
      {
        path: '/show/:data',
        name: 'ShowComp',
        component: ShowComp
      
      },
       {
        path: '/showInfo/:data',
         name: 'ShowInfo',
       component: ShowInfo
      
       },
       {
         path: '/show/:data/seasons',
         name: 'ShowSeason',
         component: ShowSeason
      
       },
       {
        path:'/show/:data/cast',
        name:'CastD',
        component:CastD
       }
      // {
      //   path:  '/:pathMatch(.*)*',
      //   name: 'pageNotFound',
      //   component: pageNotFound
      // },
    
];
const router = createRouter({
    history: createWebHistory(),
    routes:routes,
  });
  
  export default router;