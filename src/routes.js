import React, {
  Suspense,
  Fragment,
  lazy
} from 'react';
import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import LoadingScreen from 'src/components/LoadingScreen';
import AuthGuard from 'src/components/AuthGuard';
import GuestGuard from 'src/components/GuestGuard';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes
                    ? renderRoutes(route.routes)
                    : <Component {...props} />}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes = [
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('src/views/errors/NotFoundView'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/login',
    component: lazy(() => import('src/views/auth/LoginView'))
  },
  {
    exact: true,
    path: '/login-unprotected',
    component: lazy(() => import('src/views/auth/LoginView'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/register',
    component: lazy(() => import('src/views/auth/RegisterView'))
  },
  {
    exact: true,
    path: '/register-unprotected',
    component: lazy(() => import('src/views/auth/RegisterView'))
  },
  {
    path: '/app',
    guard: AuthGuard,
    layout: DashboardLayout,
    routes: [
      {
        exact: true,
        path: '/app/account',
        component: lazy(() => import('src/views/account/AccountView'))
      },
      {
        exact: true,
        path: '/app/calendar',
        component: lazy(() => import('src/views/calendar/CalendarView'))
      },
      {
        exact: true,
        path: '/app/kanban',
        component: lazy(() => import('src/views/kanban/KanbanView'))
      },
      {
        exact: true,
        path: '/app/management/customers',
        component: lazy(() => import('src/views/customer/CustomerListView'))
      },
      {
        exact: true,
        path: '/app/management/customers/:customerId',
        component: lazy(() => import('src/views/customer/CustomerDetailsView'))
      },
      {
        exact: true,
        path: '/app/management/customers/:customerId/edit',
        component: lazy(() => import('src/views/customer/CustomerEditView'))
      },
      {
        exact: true,
        path: '/app/management/invoices',
        component: lazy(() => import('src/views/invoice/InvoiceListView'))
      },
      {
        exact: true,
        path: '/app/management/invoices/:invoiceId',
        component: lazy(() => import('src/views/invoice/InvoiceDetailsView'))
      },
      {
        exact: true,
        path: '/app/management/orders',
        component: lazy(() => import('src/views/order/OrderListView'))
      },
      {
        exact: true,
        path: '/app/management/orders/:orderId',
        component: lazy(() => import('src/views/order/OrderDetailsView'))
      },
      {
        exact: true,
        path: '/app/management/products',
        component: lazy(() => import('src/views/product/ProductListView'))
      },
      {
        exact: true,
        path: '/app/management/products/create',
        component: lazy(() => import('src/views/product/ProductCreateView'))
      },
      {
        exact: true,
        path: '/app/management',
        component: () => <Redirect to="/app/management/customers" />
      },
      {
        exact: true,
        path: '/app/projects/overview',
        component: lazy(() => import('src/views/project/OverviewView'))
      },
      {
        exact: true,
        path: '/app/projects/browse',
        component: lazy(() => import('src/views/project/ProjectBrowseView'))
      },
      {
        exact: true,
        path: '/app/projects/create',
        component: lazy(() => import('src/views/project/ProjectCreateView'))
      },
      {
        exact: true,
        path: '/app/projects/:id',
        component: lazy(() => import('src/views/project/ProjectDetailsView'))
      },
      {
        exact: true,
        path: '/app/projects',
        component: () => <Redirect to="/app/projects/browse" />
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  },
  {
    path: '*',
    routes: [
      {
        exact: true,
        guard: GuestGuard,
        path: '/',
        component: lazy(() => import('src/views/auth/LoginView'))
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  }
];

export default routes;
