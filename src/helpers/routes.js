import {Employee,EmployeeDetails,EmployeeCreate} from '../views/Administration/Employees';
import {Roles,RoleDetails,RoleCreate} from '../views/Administration/Roles';
import {Calendar} from '../views/Data-Management/Calendar';
import {ServiceCatalog,CreateServiceCatalog,UpdateServiceCatalog} from '../views/Data-Management/ServiceCatalog';
import {Projects, CreateProject, UpdateProject} from '../views/Data-Management/Projects';

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
    }
]

export default routes