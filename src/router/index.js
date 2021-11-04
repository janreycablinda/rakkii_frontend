import Vue from 'vue'
import Router from 'vue-router'
import store from "@/store";

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard/View')
const RolePermission = () => import('@/views/RolePermissions/View')
const Customers = () => import('@/views/Customers/View')
const NewCustomers = () => import('@/views/Customers/NewCustomers')
const ImportCustomers = () => import('@/views/Customers/ImportCustomers')
const CustomerProfile = () => import('@/views/Customers/CustomerProfile')
const CustomerProjects = () => import('@/views/Customers/CustomerProjects')

const Invoices = () => import('@/views/Sales/Invoices/View')
const CreateInvoice = () => import('@/views/Sales/Invoices/CreateInvoice')
const Estimates = () => import('@/views/Sales/Estimates/View')
const CreateEstimates = () => import('@/views/Sales/Estimates/CreateNewEstimate')
const Payments = () => import('@/views/Sales/Payments/View')
const Credit_Note = () => import('@/views/Sales/Credit Notes/View')
const Expenses = () => import('@/views/Expenses/View')
// const Accounting_Dashboard = () => import('@/views/Accounting/Dashboard/View')
const Login = () => import('@/views/Authentication/Login')
const Forgot = () => import('@/views/Authentication/Forgot')
const Profile = () => import('@/views/Profile/View')
// const Items = () => import('@/views/Inventory/Items/View')
// const ImportItems = () => import('@/views/Inventory/Items/ImportItems/View')
// const Stockin = () => import('@/views/Inventory/StockIn/View')
// const Stockout = () => import('@/views/Inventory/StockOut/View')
// const Inventory = () => import('@/views/Inventory/Inventory/View')
const SalesReport = () => import('@/views/Reports/Sales/View')
const Contracts = () => import('@/views/Contracts/View')
const Tasks = () => import('@/views/Tasks/View')
const ExpensesReport = () => import('@/views/Reports/Expenses/View')
const ExpensesVsIncome = () => import('@/views/Reports/Expenses vs Income/View')


Vue.use(Router)

export default new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/dashboard',
      name: 'Home',
      component: TheContainer,
      children: [
        {
            path: '',
            name: 'Dashboard',
            component: Dashboard,
            beforeEnter: (to, from, next) => {
              if (!store.getters["auth/authenticated"]) {
                next({
                  name: "Login"
                });
              }
              next();
            },
            meta: {
              breadcrumb: [
                { text: 'Dashboard' }
              ]
            }
        }
      ]
    },
    {
      path: '/role_permission',
      component: TheContainer,
      children: [
        {
            path: '',
            name: 'RolePermission',
            component: RolePermission,
            beforeEnter: (to, from, next) => {
              if (!store.getters["auth/authenticated"]) {
                next({
                  name: "Login"
                });
              }
              next();
            },
            meta: {
              breadcrumb: [
                { text: 'Users, Roles & Permissions' }
              ]
            }
        }
      ]
    },
    {
      path: '/customers',
      component: TheContainer,
      children: [
        {
            path: '',
            name: 'Customers',
            component: Customers,
            beforeEnter: (to, from, next) => {
              if (!store.getters["auth/authenticated"]) {
                next({
                  name: "Login"
                });
              }
              next();
            },
            meta: {
              breadcrumb: [
                { text: 'Customers' }
              ]
            }
        },
        {
          path: '/customers/new-customer',
          name: 'New Customer',
          component: NewCustomers,
          beforeEnter: (to, from, next) => {
            if (!store.getters["auth/authenticated"]) {
              next({
                name: "Login"
              });
            }
            next();
          },
          meta: {
            breadcrumb: [
              { text: 'Customers', to: '/customers' },
              { text: 'New Customer' }
            ]
          }
        },
        {
          path: '/customers/import-customers',
          name: 'Import Customers',
          component: ImportCustomers,
          beforeEnter: (to, from, next) => {
            if (!store.getters["auth/authenticated"]) {
              next({
                name: "Login"
              });
            }
            next();
          },
          meta: {
            breadcrumb: [
              { text: 'Customers', to: '/customers' },
              { text: 'Import Customers' }
            ]
          }
        },
        {
          path: '/customers/customer-profile/:id/profile',
          name: 'Customer Profile',
          component: CustomerProfile,
          beforeEnter: (to, from, next) => {
            if (!store.getters["auth/authenticated"]) {
              next({
                name: "Login"
              });
            }
            next();
          },
          meta: {
            breadcrumb: [
              { text: 'Customers', to: '/customers' },
              { text: 'Customer Profile' }
            ]
          }
        },
        {
          path: '/customers/customer-profile/:id/projects',
          name: 'Customer Projects',
          component: CustomerProjects,
          beforeEnter: (to, from, next) => {
            if (!store.getters["auth/authenticated"]) {
              next({
                name: "Login"
              });
            }
            next();
          },
          meta: {
            breadcrumb: [
              { text: 'Customers', to: '/customers' },
              { text: 'Customer Projects' }
            ]
          }
        }
      ]
    },
    {
      path: '/sales',
      component: TheContainer,
      children: [
        {
            path: '/sales/invoices',
            name: 'Invoices',
            component: Invoices,
            beforeEnter: (to, from, next) => {
              if (!store.getters["auth/authenticated"]) {
                next({
                  name: "Login"
                });
              }
              next();
            },
            meta: {
              breadcrumb: [
                { text: 'Billing Statement' }
              ]
            }
        },
        {
            path: '/sales/invoices/create-invoice',
            name: 'Invoices',
            component: CreateInvoice,
            beforeEnter: (to, from, next) => {
              if (!store.getters["auth/authenticated"]) {
                next({
                  name: "Login"
                });
              }
              next();
            },
            meta: {
              breadcrumb: [
                { text: 'Billing Statement', to: '/sales/invoices' },
                { text: 'Create Billing Statement' }
              ]
            }
        },
        {
            path: '/sales/estimates',
            name: 'Estimates',
            component: Estimates,
            beforeEnter: (to, from, next) => {
              if (!store.getters["auth/authenticated"]) {
                next({
                  name: "Login"
                });
              }
              next();
            },
            meta: {
              breadcrumb: [
                { text: 'Estimates' }
              ]
            }
        },
        {
            path: '/sales/estimates/create-estimate',
            name: 'CreateEstimates',
            component: CreateEstimates,
            beforeEnter: (to, from, next) => {
              if (!store.getters["auth/authenticated"]) {
                next({
                  name: "Login"
                });
              }
              next();
            },
            meta: {
              breadcrumb: [
                { text: 'Estimates', to: '/sales/estimates' },
                { text: 'Create New Estimates' }
              ]
            }
        },
        {
          path: '/sales/payments',
          name: 'Payments',
          component: Payments,
          beforeEnter: (to, from, next) => {
            if (!store.getters["auth/authenticated"]) {
              next({
                name: "Login"
              });
            }
            next();
          },
          meta: {
            breadcrumb: [
              { text: 'Payments' }
            ]
          }
        },
        {
          path: '/sales/credit_note',
          name: 'Credit Note',
          component: Credit_Note,
          beforeEnter: (to, from, next) => {
            if (!store.getters["auth/authenticated"]) {
              next({
                name: "Login"
              });
            }
            next();
          },
          meta: {
            breadcrumb: [
              { text: 'Credit Note' }
            ]
          }
        }
      ]
    },
    // {
    //   path: '/inventory',
    //   component: TheContainer,
    //   children: [
    //     {
    //       path: '',
    //       name: 'Inventory',
    //       component: Inventory,
    //       beforeEnter: (to, from, next) => {
    //         if (!store.getters["auth/authenticated"]) {
    //           next({
    //             name: "Login"
    //           });
    //         }
    //         next();
    //       },
    //       meta: {
    //         breadcrumb: [
    //           { text: 'Items' }
    //         ]
    //       }
    //     },
    //     {
    //         path: '/inventory/items',
    //         name: 'Items',
    //         component: Items,
    //         beforeEnter: (to, from, next) => {
    //           if (!store.getters["auth/authenticated"]) {
    //             next({
    //               name: "Login"
    //             });
    //           }
    //           next();
    //         },
    //         meta: {
    //           breadcrumb: [
    //             { text: 'Items' }
    //           ]
    //         }
    //     },
    //     {
    //       path: '/inventory/import-items',
    //       name: 'ImportItems',
    //       component: ImportItems,
    //       beforeEnter: (to, from, next) => {
    //         if (!store.getters["auth/authenticated"]) {
    //           next({
    //             name: "Login"
    //           });
    //         }
    //         next();
    //       },
    //       meta: {
    //         breadcrumb: [
    //           { text: 'Items' }
    //         ]
    //       }
    //     },
    //     {
    //       path: '/inventory/stockin',
    //       name: 'Stockin',
    //       component: Stockin,
    //       beforeEnter: (to, from, next) => {
    //         if (!store.getters["auth/authenticated"]) {
    //           next({
    //             name: "Login"
    //           });
    //         }
    //         next();
    //       },
    //       meta: {
    //         breadcrumb: [
    //           { text: 'Items' }
    //         ]
    //       }
    //     },
    //     {
    //       path: '/inventory/stockout',
    //       name: 'Stockout',
    //       component: Stockout,
    //       beforeEnter: (to, from, next) => {
    //         if (!store.getters["auth/authenticated"]) {
    //           next({
    //             name: "Login"
    //           });
    //         }
    //         next();
    //       },
    //       meta: {
    //         breadcrumb: [
    //           { text: 'Items' }
    //         ]
    //       }
    //     },
        
    //   ]
    // },
    
    {
      path: '/tasks',
      component: TheContainer,
      children: [
        {
            path: '',
            name: 'Tasks',
            component: Tasks,
            beforeEnter: (to, from, next) => {
              if (!store.getters["auth/authenticated"]) {
                next({
                  name: "Login"
                });
              }
              next();
            },
            meta: {
              breadcrumb: [
                { text: 'Tasks' }
              ]
            }
        },
      ]
    },
    {
      path: '/contracts',
      component: TheContainer,
      children: [
        {
            path: '',
            name: 'Contracts',
            component: Contracts,
            beforeEnter: (to, from, next) => {
              if (!store.getters["auth/authenticated"]) {
                next({
                  name: "Login"
                });
              }
              next();
            },
            meta: {
              breadcrumb: [
                { text: 'Contracts' }
              ]
            }
        },
      ]
    },
    {
      path: '/expenses',
      component: TheContainer,
      children: [
        {
            path: '',
            name: 'Expenses',
            component: Expenses,
            beforeEnter: (to, from, next) => {
              if (!store.getters["auth/authenticated"]) {
                next({
                  name: "Login"
                });
              }
              next();
            },
            meta: {
              breadcrumb: [
                { text: 'Expenses' }
              ]
            }
        },
      ]
    },
    // {
    //   path: '/acounting',
    //   component: TheContainer,
    //   children: [
    //     {
    //         path: '/accounting/dashboard',
    //         name: 'Account Dashboard',
    //         component: Accounting_Dashboard,
    //         beforeEnter: (to, from, next) => {
    //           if (!store.getters["auth/authenticated"]) {
    //             next({
    //               name: "Login"
    //             });
    //           }
    //           next();
    //         },
    //         meta: {
    //           breadcrumb: [
    //             { text: 'Dashboard' }
    //           ]
    //         }
    //     },
    //   ]
    // },
    {
      path: '/profile',
      component: TheContainer,
      children: [
        {
            path: '',
            name: 'Profile',
            component: Profile,
            beforeEnter: (to, from, next) => {
              if (!store.getters["auth/authenticated"]) {
                next({
                  name: "Login"
                });
              }
              next();
            },
            meta: {
              breadcrumb: [
                { text: 'Profile' }
              ]
            }
        },
      ]
    },
    {
      path: '/report',
      component: TheContainer,
      children: [
        {
            path: '/report/sales',
            name: 'Sales Report',
            component: SalesReport,
            beforeEnter: (to, from, next) => {
              if (!store.getters["auth/authenticated"]) {
                next({
                  name: "Login"
                });
              }
              next();
            },
            meta: {
              breadcrumb: [
                { text: 'Sales Report' }
              ]
            }
        },
        {
          path: '/report/expenses',
          name: 'Expenses Report',
          component: ExpensesReport,
          beforeEnter: (to, from, next) => {
            if (!store.getters["auth/authenticated"]) {
              next({
                name: "Login"
              });
            }
            next();
          },
          meta: {
            breadcrumb: [
              { text: 'Expenses Report' }
            ]
          }
        },
        {
          path: '/report/expensesvsincome',
          name: 'Expenses vs Income',
          component: ExpensesVsIncome,
          beforeEnter: (to, from, next) => {
            if (!store.getters["auth/authenticated"]) {
              next({
                name: "Login"
              });
            }
            next();
          },
          meta: {
            breadcrumb: [
              { text: 'Expenses vs Income' }
            ]
          }
        },
      ]
    },
    {
      path: '/',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '',
          name: 'Login',
          component: Login
        },
      ]
    },
    {
      path: '/',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: 'forgot',
          name: 'Forgot',
          component: Forgot
        },
      ]
    }
  ]
})
