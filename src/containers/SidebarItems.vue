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
          },
          {
            _name: 'CSidebarNavItem',
            name: 'Customers',
            to: '/customers',
            icon: 'cil-group',
          },
          {
            _name: 'CSidebarNavItem',
            name: 'Insurance',
            to: '/insurance',
            icon: 'cil-institution',
          },
          {
            _name: 'CSidebarNavItem',
            name: 'Supplier',
            to: '/supplier',
            icon: 'cil-industry',
          },
          {
            _name: 'CSidebarNavItem',
            name: 'Users, Roles & Permissions',
            to: '/role_permission',
            icon: 'cil-shield-alt',
          },
          {
            _name: 'CSidebarNavDropdown',
            name: 'Sales',
            route: '/dropdown',
            icon: 'cil-money',
            items: [
              {
                name: 'Monitoring',
                to: '/sales/monitoring',
              },
              {
                name: 'Billing Statement',
                to: '/sales/invoices',
              },
              {
                name: 'Estimates',
                to: '/sales/estimates',
              },
              {
                name: 'Payments',
                to: '/sales/payments',
              },
            ]
          },
          {
            _name: 'CSidebarNavItem',
            name: 'Contracts',
            to: '/contracts',
            icon: 'cil-pen-nib',
          },
          {
            _name: 'CSidebarNavItem',
            name: 'Tasks',
            to: '/tasks',
            icon: 'cil-list-rich',
          },
          {
            _name: 'CSidebarNavItem',
            name: 'Expenses',
            to: '/expenses',
            icon: 'cil-wallet',
          },
          {
            _name: 'CSidebarNavDropdown',
            name: 'Reports',
            route: '/dropdown',
            icon: 'cil-chart-line',
            items: [
              {
                name: 'Sales',
                to: '/report/sales',
              },
              {
                name: 'Expenses',
                to: '/report/expenses',
              },
              {
                name: 'Expenses vs Income',
                to: '/report/expensesvsincome',
              },
            ]
          },

        ]
      }]
    }
  }
}
</script>
