import moment from 'moment'

export default {
  methods: {
    gStoreGetAppointmentById (appointments, id) {
      return appointments.find((item) => {
        return item.id === id
      })
    },
    gStoreGetAppointmentsByStatus (appointments, statuses) {
      return appointments.filter((item) => {
        return statuses.indexOf(item.status) !== -1
      })
    },
    gStoreGetAppointmentsByDay (appointments, day) {
      return appointments.filter((item) => {
        let appDay = moment(item.start_time).format('YYYY-MM-DD')
        return appDay === day
      })
    }
  }
}
