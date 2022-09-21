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
                label:'Level 1 Service Catalogs'
            },
            {
                name:'serviceCatalogL2',
                route:'/data-management/service-catalog-l2',
                label:'Level 2 Service Catalogs'  
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
                route:'/work-hours/gantt-chart',
                label:'Gantt Chart'
            },
            {
                name:'techHours',
                route:'/work-hours/tech-hours',
                label:'Tech Hours'
            }
        ]
    }
    
]

export default modules