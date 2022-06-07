const modules = [
    {
        name:'dataManagement',
        label:'Data Management',
        route:'/data-management',
        subModules:[
            {
                name:'projectCode',
                route:'/data-management/project-code',
                label:'Project Codes'
            },
            {
                name:'serviceCatalog',
                route:'/data-management/service-catalog',
                label:'Service Catalogs'
            },
            {
                name:'calendar',
                route:'/data-management/calendar',
                label:'Calendar'
            }
        ]
    },
    {
        name:'administration',
        label:'Administration',
        route:'/administration',
        subModules:[
            {
                name:'users',
                route:'/administration/users',
                label:'Users'
            },
            {
                name:'roles',
                route:'/administration/roles',
                label:'Roles'
            }
        ]
    },
    {
        name:'workhours',
        label:'Work Hours',
        route:'/work-hours',
        subModules:[
            {
                name:'project',
                route:'/work-hours/project',
                label:'Project View'
            },
            {
                name:'project',
                route:'/work-hours/employee',
                label:'My Projects'
            }
        ]
    }
    // {
    //     name:'wbs',
    //     label:'Work Breakdown Schedule',
    //     route:'/wbs',
    //     subModules:[
    //         {
    //             name:'',
    //             route:'',
    //             label:''
    //         },
    //         {
    //             name:'',
    //             route:'',
    //             label:''
    //         },
    //         {
    //             name:'',
    //             route:'',
    //             label:''
    //         }
    //     ]
    // },
]

export default modules