import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';
import Login from '@/pages/Login/Login';
import ErrorPage from '@/pages/Error/Error';
//Pages


import PasswordPage from '@/pages/Password/Password';
import MaestroPage from '@/pages/Soporte/Maestro/Maestro';
import UsuarioPage from '@/pages/Soporte/Usuario/Usuario';


import AccountPage from '@/pages/Account/Account';


// Core
import TypographyPage from '@/pages/Typography/Typography';

// Tables
import TablesBasicPage from '@/pages/Tables/Basic';

// Maps
import GoogleMapPage from '@/pages/Maps/Google';

// Main
import AnalyticsPage from '@/pages/Dashboard/Dashboard';

// Charts
import ChartsPage from '@/pages/Charts/Charts';

// Ui
import IconsPage from '@/pages/Icons/Icons';
import NotificationsPage from '@/pages/Notifications/Notifications';
import PersonalPage from '@/pages/Soporte/Personal/Personal';
import GenerarOrdenPage from '@/pages/CompraMateriales/GenerarOrden';
import Formulario_Solicitud_Material from '@/pages/Formulario1/Formulario_Solicitud_Material';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/error',
      name: 'Error',
      component: ErrorPage,
    },
    {
      path: '/app',
      name: 'Layout',
      component: Layout,
      children: [
       
        {
          path: 'generarOrden',
          name: 'GenerarOrden',
          component: GenerarOrdenPage,
        },
        
        {
          path: 'solicitudMaterial',
          name: 'SolicitudMaterial',
          component: Formulario_Solicitud_Material,
        },
        
        
        {
          path: 'soporte/maestro',
          name: 'MaestroPage',
          component: MaestroPage,
        },
        {
          path: 'soporte/usuario',
          name: 'UsuarioPage',
          component: UsuarioPage,
        },
        {
          path: 'soporte/personal',
          name: 'PersonalPage',
          component: PersonalPage,
        },
        
        {
          path: 'account',
          name: 'AccountPage',
          component: AccountPage,
        },
        {
          path: 'password',
          name: 'PasswordPage',
          component: PasswordPage,
        },

        {
          path: 'dashboard',
          name: 'AnalyticsPage',
          component: AnalyticsPage,
        },
        {
          path: 'typography',
          name: 'TypographyPage',
          component: TypographyPage,
        },
        {
          path: 'components/icons',
          name: 'IconsPage',
          component: IconsPage,
        },
        {
          path: 'notifications',
          name: 'NotificationsPage',
          component: NotificationsPage,
        },
        {
          path: 'components/charts',
          name: 'ChartsPage',
          component: ChartsPage,
        },
        {
          path: 'tables',
          name: 'TablesBasicPage',
          component: TablesBasicPage,
        },
        {
          path: 'components/maps',
          name: 'GoogleMapPage',
          component: GoogleMapPage,
        },
      ],
    },
  ],
});
