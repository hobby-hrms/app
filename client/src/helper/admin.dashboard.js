export const adminConfig = [
  {
    icon: 'date_range',
    title: 'Attendance',
    items: [
      {
        title: 'New',
        route: {
          name: 'Attendance'
        }
      }
    ]
  },
  {
    icon: 'people',
    title: 'Employees',
    items: [
      {
        title: 'Manage',
        route: {
          name: 'ManageEmployee'
        }
      },
      {
        title: 'New',
        route: {
          name: 'NewEmployee'
        }
      }
    ]
  },
  {
    icon: 'attach_money',
    title: 'Claims',
    items: [
      {
        title: 'New',
        route: {
          name: 'Claims'
        }
      }
    ]
  },
  {
    icon: 'work',
    title: 'Leaves',
    items: [
      {
        title: 'New',
        route: {
          name: 'Leaves'
        }
      }
    ]
  },
  {
    icon: 'settings',
    title: 'Profile Settings',
    items: [
      {
        title: 'Personal Details',
        route: {
          name: 'ProfileDetails'
        }
      },
      {
        title: 'Change Password',
        route: {
          name: 'ProfilePassword'
        }
      }
    ]
  }
]

export const adminHome = [
  { text: 'Employee ID', value: 'employeeId' },
  { text: 'Employee Name', value: 'name' },
  { text: 'Leave Type', value: 'leaveType' },
  { text: 'Total Days', value: 'days' },
  { text: 'Status', value: 'status' },
  { text: 'Actions', value: '', sortable: false }
]
