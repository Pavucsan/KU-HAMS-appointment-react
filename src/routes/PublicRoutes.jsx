import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import PublicLayout from 'layout/Public';
import AppointmentPage from '../pages/extra-pages/appointment';

// render- Dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));

// render - color
const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/appointment')));

// ==============================|| MAIN ROUTING ||============================== //

const PublicRoutes = {
  path: '/public',
  element: <PublicLayout />,
  children: [
    {
      path: '/public/dashboard',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: '/public/appointment',
      element: <AppointmentPage />
    }
  ]
};

export default PublicRoutes;
