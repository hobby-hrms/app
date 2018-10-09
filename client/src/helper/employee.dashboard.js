export const employeeConfig = [
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

export const employeeHome = [
  { text: 'Leave Type', value: 'leave' },
  { text: 'Start Date', value: 'startDate' },
  { text: 'End Date', value: 'endDate' },
  { text: 'Total Days', value: 'totalDays' },
  { text: 'Status', value: 'status' },
  { text: 'Info', value: '', sortable: false }
]
