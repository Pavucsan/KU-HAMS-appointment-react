import { createBrowserRouter } from 'react-router-dom';

// project imports
import MainRoutes from './MainRoutes';
import PublicRoutes from './PublicRoutes';
import LoginRoutes from './LoginRoutes';

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter([LoginRoutes, MainRoutes, PublicRoutes], { basename: import.meta.env.VITE_APP_BASE_NAME });

export default router;
