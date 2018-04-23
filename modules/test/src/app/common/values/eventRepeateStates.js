angular
    .module('admin')
    .value('eventsRepeateStates', eventsRepeateStates)

function eventsRepeateStates() {
    return [{
            id: 0,
            name: "One time"
        },
        {
            id: 3,
            name: "Daily"
        },
        {
            id: 1,
            name: "Weekly"
        },
        {
            id: 2,
            name: "Monthly"
        }
    ]
}