<script>
export default {
  name: 'nav',
  computed: {
    sidebarItems() {
      return [{
        _name: 'CSidebarNav',
        _children: [
          {
            _name: 'CSidebarNavItem',
            name: 'Dashboard',
            to: '/dashboard',
            icon: 'cil-speedometer',
            gate: 'dashboard_access',
          },
          {
            _name: 'CSidebarNavItem',
            name: 'Customers',
            to: '/customers',
            icon: 'cil-group',
            gate: 'customers_access'
          },
          {
            _name: 'CSidebarNavItem',
            name: 'Insurance',
            to: '/insurance',
            icon: 'cil-institution',
            gate: 'insurance_access'
          },
          {
            _name: 'CSidebarNavItem',
            name: 'Supplier',
            to: '/supplier',
            icon: 'cil-industry',
            gate: 'supplier_access'
          },
          {
            _name: 'CSidebarNavItem',
            name: 'Users, Roles & Permissions',
            to: '/role_permission',
            icon: 'cil-shield-alt',
            gate: 'role_access'
          },
          {
            _name: 'CSidebarNavDropdown',
            name: 'Sales',
            route: '/dropdown',
            icon: 'cil-money',
            gate: 'sales_access',
            items: [
              {
                name: 'Monitoring',
                to: '/sales/monitoring',
                gate: 'monitoring_access',
              },
              {
                name: 'Billing Statement',
                to: '/sales/billing-statement',
                gate: 'payments_access',
              },
              {
                name: 'Job Order',
                to: '/sales/job-order',
                gate: 'job_order_access',
              },
              {
                name: 'Estimates',
                to: '/sales/estimates',
                gate: 'estimate_access',
              },
              // {
              //   name: 'Payments',
              //   to: '/sales/payments',
              //   gate: 'payment_access',
              // },
            ]
          },
          // {
          //   _name: 'CSidebarNavItem',
          //   name: 'Contracts',
          //   to: '/contracts',
          //   icon: 'cil-pen-nib',
          //   gate: 'sales_access',
          // },
          // {
          //   _name: 'CSidebarNavItem',
          //   name: 'Tasks',
          //   to: '/tasks',
          //   icon: 'cil-list-rich',
          // },
          // {
          //   _name: 'CSidebarNavItem',
          //   name: 'Expenses',
          //   to: '/expenses',
          //   icon: 'cil-wallet',
          // },
          {
            _name: 'CSidebarNavItem',
            to: '/report/sales',
            name: 'Reports',
            icon: 'cil-chart-line',
            gate: 'report_access',
          },
        ]
      }]
    }
  }
}
</script>
