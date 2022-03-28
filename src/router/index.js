import Vue from 'vue'
import Router from 'vue-router'
import store from "@/store";
import ability from '../services/ability';

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard/View')
const RolePermission = () => import('@/views/RolePermissions/View')
const Customers = () => import('@/views/Customers/View')
const NewCustomers = () => import('@/views/Customers/NewCustomers')
const ImportCustomers = () => import('@/views/Customers/ImportCustomers')
const CustomerProfile = () => import('@/views/Customers/Profile/CustomerProfile')
const CustomerProjects = () => import('@/views/Customers/Profile/CustomerProjects')
const CustomerDocuments = () => import('@/views/Customers/Profile/CustomerDocuments')
const CustomerEstimate = () => import('@/views/Customers/Profile/CustomerEstimate')
const CustomerPayments = () => import('@/views/Customers/Profile/CustomerPayments')
const InsuranceProfile = () => import('@/views/Insurance/Profile/InsuranceProfile')
const SupplierProfile = () => import('@/views/Supplier/Profile/SupplierProfile')
const EditCustomerProjects = () => import('@/views/Customers/EditCustomerProjects')
const JobOrder = () => import('@/views/Sales/Job Order/View')
const EditJobOrder = () => import('@/views/Sales/Job Order/EditJobOrder')

const BillingStatement = () => import('@/views/Sales/Billing Statement/View')
const Monitoring = () => import('@/views/Sales/Monitoring/View')
const CreateBilling = () => import('@/views/Sales/Billing Statement/CreateBilling')
const EditBilling = () => import('@/views/Sales/Billing Statement/EditBillingStatement')
const Estimates = () => import('@/views/Sales/Estimates/View')
const CreateEstimates = () => import('@/views/Sales/Estimates/CreateNewEstimate')
const EditEstimates = () => import('@/views/Sales/Estimates/EditEstimate')
const Payments = () => import('@/views/Sales/Payments/View')
const Credit_Note = () => import('@/views/Sales/Credit Notes/View')
const Expenses = () => import('@/views/Expenses/View')
// const Accounting_Dashboard = () => import('@/views/Accounting/Dashboard/View')
const Login = () => import('@/views/Authentication/Login')
const Uploader = () => import('@/views/Authentication/Uploader')
const Page404 = () => import('@/views/Authentication/Page404')
const Forgot = () => import('@/views/Authentication/Forgot')
const Profile = () => import('@/views/Profile/View')
// const Items = () => import('@/views/Inventory/Items/View')
// const ImportItems = () => import('@/views/Inventory/Items/ImportItems/View')
// const Stockin = () => import('@/views/Inventory/StockIn/View')
// const Stockout = () => import('@/views/Inventory/StockOut/View')
// const Inventory = () => import('@/views/Inventory/Inventory/View')
const Report = () => import('@/views/Reports/View')
const Contracts = () => import('@/views/Contracts/View')
const AddContract = () => import('@/views/Contracts/AddContract')
const Tasks = () => import('@/views/Tasks/View')
const ExpensesReport = () => import('@/views/Reports/Expenses/View')
const ExpensesVsIncome = () => import('@/views/Reports/Expenses vs Income/View')
const Insurance = () => import('@/views/Insurance/View')
const Supplier = () => import('@/views/Supplier/View')

Vue.use(Router)

const router = new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/dashboard',
      component: TheContainer,
      children: [
        {
            path: '',
            name: 'Dashboard',
            component: Dashboard,
            meta: {
              breadcrumb: [
                { text: 'Dashboard' }
              ],
              requiresAuth: true
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
            name: 'Users, Roles & Permissions',
            component: RolePermission,
            meta: {
              breadcrumb: [
                { text: 'Users, Roles & Permissions' }
              ],
              requiresAuth: true
            }
        }
      ]
    },
    {
      path: '/insurance',
      component: TheContainer,
      children: [
        {
            path: '',
            name: 'Insurance',
            component: Insurance,
            meta: {
              breadcrumb: [
                { text: 'Insurance' }
              ],
              requiresAuth: true
            }
        },
        {
            path: '/insurance/insurance-profile/:id/profile',
            name: 'Insurance Profile',
            component: InsuranceProfile,
            meta: {
              breadcrumb: [
                { text: 'Insurance', to: '/insurance' },
                { text: 'Insurance Profile' }
              ],
              requiresAuth: true
            }
        },
        
      ]
    },
    {
      path: '/supplier',
      component: TheContainer,
      children: [
        {
            path: '',
            name: 'Supplier',
            component: Supplier,
            meta: {
              breadcrumb: [
                { text: 'Supplier' }
              ],
              requiresAuth: true
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
            meta: {
              breadcrumb: [
                { text: 'Customers' }
              ],
              requiresAuth: true
            }
        },
        {
          path: '/customers/new-customer',
          name: 'New Customer',
          component: NewCustomers,
          meta: {
            breadcrumb: [
              { text: 'Customers', to: '/customers' },
              { text: 'New Customer' }
            ],
            requiresAuth: true
          }
        },
        {
          path: '/customers/import-customers',
          name: 'Import Customers',
          component: ImportCustomers,
          meta: {
            breadcrumb: [
              { text: 'Customers', to: '/customers' },
              { text: 'Import Customers' }
            ],
            requiresAuth: true
          }
        },
        {
          path: '/customers/customer-profile/:id/profile',
          name: 'Customer Profile',
          component: CustomerProfile,
          meta: {
            breadcrumb: [
              { text: 'Customers', to: '/customers' },
              { text: 'Customer Profile' }
            ],
            requiresAuth: true
          }
        },
        {
          path: '/customers/customer-profile/:id/documents',
          name: 'Customer Documents',
          component: CustomerDocuments,
          meta: {
            breadcrumb: [
              { text: 'Customers', to: '/customers' },
              { text: 'Customer Documents' }
            ],
            requiresAuth: true
          }
        },
        {
          path: '/customers/customer-profile/:id/estimate',
          name: 'Customer Estimate',
          component: CustomerEstimate,
          meta: {
            breadcrumb: [
              { text: 'Customers', to: '/customers' },
              { text: 'Customer Estimate' }
            ],
            requiresAuth: true
          }
        },
        {
          path: '/customers/customer-profile/:id/payments',
          name: 'Customer Payments',
          component: CustomerPayments,
          meta: {
            breadcrumb: [
              { text: 'Customers', to: '/customers' },
              { text: 'Customer Payments' }
            ],
            requiresAuth: true
          }
        },
        {
          path: '/customers/customer-profile/:id/projects',
          name: 'Customer Projects',
          component: CustomerProjects,
          meta: {
            breadcrumb: [
              { text: 'Customers', to: '/customers' },
              { text: 'Customer Projects' }
            ],
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '/sales',
      component: TheContainer,
      children: [
        {
            path: '/sales/billing-statement',
            name: 'Billing Statement',
            component: BillingStatement,
            meta: {
              breadcrumb: [
                { text: 'Billing Statement', to: '/sales/billing-statement' },
              ],
              requiresAuth: true
            }
        },
        {
            path: '/sales/billing-statement/create',
            name: 'Create Billing Statement',
            component: CreateBilling,
            meta: {
              breadcrumb: [
                { text: 'Billing Statement', to: '/sales/billing-statement' },
                { text: 'Create Billing Statement' }
              ],
              requiresAuth: true
            }
        },
        {
            path: '/sales/billing-statement/edit/:id',
            name: 'Edit Billing Statement',
            component: EditBilling,
            meta: {
              breadcrumb: [
                { text: 'Billing Statement', to: '/sales/billing-statement' },
                { text: 'Edit Billing Statement' }
              ],
              requiresAuth: true
            }
        },
        {
            path: '/sales/estimates',
            name: 'Estimates',
            component: Estimates,
            meta: {
              breadcrumb: [
                { text: 'Estimates' }
              ],
              requiresAuth: true
            }
        },
        {
            path: '/sales/estimates/create-estimate',
            name: 'CreateEstimates',
            component: CreateEstimates,
            meta: {
              breadcrumb: [
                { text: 'Estimates', to: '/sales/estimates' },
                { text: 'Create New Estimates' }
              ],
              requiresAuth: true
            }
        },
        {
            path: '/sales/job-order',
            name: 'Job Order',
            component: JobOrder,
            meta: {
              breadcrumb: [
                { text: 'Job Order' }
              ],
              requiresAuth: true
            }
        },
        {
            path: '/sales/job-order/edit-job-order/:id',
            name: 'EditJobOrder',
            component: EditJobOrder,
            meta: {
              breadcrumb: [
                { text: 'Edit Job Order' }
              ],
              requiresAuth: true
            }
        },
        {
            path: '/sales/estimates/edit-estimate/:id',
            name: 'Edit Estimates',
            component: EditEstimates,
            meta: {
              breadcrumb: [
                { text: 'Estimates', to: '/sales/estimates' },
                { text: 'Edit Estimates' }
              ],
              requiresAuth: true
            }
        },
        {
          path: '/sales/payments',
          name: 'Payments',
          component: Payments,
          meta: {
            breadcrumb: [
              { text: 'Payments' }
            ],
            requiresAuth: true
          }
        },
        {
          path: '/sales/credit_note',
          name: 'Credit Note',
          component: Credit_Note,
          meta: {
            breadcrumb: [
              { text: 'Credit Note' }
            ],
            requiresAuth: true
          }
        },
        {
          path: '/sales/monitoring',
          name: 'Monitoring',
          component: Monitoring,
          meta: {
            breadcrumb: [
              { text: 'Monitoring' }
            ],
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '/tasks',
      component: TheContainer,
      children: [
        {
            path: '',
            name: 'Tasks',
            component: Tasks,
            meta: {
              breadcrumb: [
                { text: 'Tasks' }
              ],
              requiresAuth: true
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
            meta: {
              breadcrumb: [
                { text: 'Contracts' }
              ],
              requiresAuth: true
            }
        },
        {
            path: '/contracts/add_contracts',
            name: 'AddContract',
            component: AddContract,
            meta: {
              breadcrumb: [
                { text: 'Contracts', to: '/contracts' },
                { text: 'ADD CONTRACTS' }
              ],
              requiresAuth: true
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
            meta: {
              breadcrumb: [
                { text: 'Expenses' }
              ],
              requiresAuth: true
            }
        },
      ]
    },
    {
      path: '/profile',
      component: TheContainer,
      children: [
        {
            path: '',
            name: 'Profile',
            component: Profile,
            meta: {
              breadcrumb: [
                { text: 'Profile' }
              ],
              requiresAuth: true
            }
        },
      ]
    },
    {
      path: '/reports',
      component: TheContainer,
      children: [
        {
            path: '',
            name: 'Reports',
            component: Report,
            meta: {
              breadcrumb: [
                { text: 'Sales Report' }
              ],
              requiresAuth: true
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
          component: Login,
          meta: {
            requiresAuth: false
          },
        },
      ]
    },
    {
      path: '/404',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '',
          name: 'Page404',
          component: Page404,
          meta: {
            requiresAuth: false
          },
        },
      ]
    },
    {
      path: '/uploader/:signature',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '',
          name: 'Uploader',
          component: Uploader,
          meta: {
            requiresAuth: false
          },
        },
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){
    if (!store.getters["auth/authenticated"]) {
      next({
        name: "Login"
      });
    }

    if(to.name == 'Profile'){
      next();
    }else{
      if(ability.can('read', to.name)){
        next();
      }else{
        next({
          name: "Page404"
        });
      }
    }
  }else{
    next();
  }
});

export default router;