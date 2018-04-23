angular
    .module('admin')
    .value('announcementGroups', announcementGroups)

function announcementGroups() {
    return [{
            id: 1,
            name: "All"
        },
        {
            id: 2,
            name: "Only employee"
        },
        {
            id: 3,
            name: "Only dependent"
        }
    ]
}