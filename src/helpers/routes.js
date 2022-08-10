import {Employee,EmployeeDetails,EmployeeCreate}                    from '../views/Administration/Employees';
import {Roles,RoleDetails,RoleCreate}                               from '../views/Administration/Roles';
import {Calendar}                                                   from '../views/Data-Management/Calendar';
import {ServiceCatalog,CreateServiceCatalog,UpdateServiceCatalog}   from '../views/Data-Management/ServiceCatalog';
import {ServiceCatalogL2}                                           from '../views/Data-Management/ServiceCatalogL2';
import {Projects, CreateProject, UpdateProject}                     from '../views/Data-Management/Projects';
import {GanttChart} from'../views/Work-Hours/Chart';
import {Techhours}                                                  from '../views/Work-Hours/TechHours_v2';
//import {TechHours}                                                  from '../views/Work-Hours/TechHours';


const routes = [
    {
        path:'/administration/users',
        children:[
            {
                index:true,
                element:<Employee/>
            },
            {   
                path:"details/:employee_id",
                element:<EmployeeDetails/>
            },
            {
                path:'create',
                element:<EmployeeCreate/>
            }
        ]
    },
    {
        path:'/administration/roles',
        children:[
            {
                index:true,
                element:<Roles/>
            },
            {
                path:'details/:role_id',
                element:<RoleDetails/>
            },
            {
                path:'create',
                element:<RoleCreate/>
            }
        ]
    },
    {
        path:'/data-management/calendar',
        children:[
            {
                index:true,
                element:<Calendar/>
            }
        ]
    },
    {
        path:'/data-management/service-catalog',
        children:[
            {
                index:true,
                element:<ServiceCatalog/>
            },
            {
                path:'create',
                element:<CreateServiceCatalog/>
            },
            {
                path:'details/:catalog_id',
                element:<UpdateServiceCatalog/>
            }
        ]
    },
    {
        path:'/data-management/service-catalog-l2',
        children:[
            {
                index:true,
                element:<ServiceCatalogL2/>
            }
        ]
    },
    {
        path:'/data-management/project-code',
        children:[
            {
                index:true,
                element:<Projects/>
            },
            {
                path:'create',
                element:<CreateProject/>
            },
            {
                path:'details/:project_code',
                element:<UpdateProject/>
            }
        ]
    },
    {
        path:'/work-hours/tech-hours',
        children:[
            {
                index:true,
                element:<Techhours/>
            }
        ]
    },
    {
        path:'/work-hours/gantt-chart',
        children:[
            {
                index:true,
                element:<GanttChart/>
            }
        ]
    }
]

export default routes