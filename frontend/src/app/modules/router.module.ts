import {Routes, RouterModule} from '@angular/router';

//site
import {SiteComponent} from '../components/site/site.component';

import {AppComponent} from '../app.component';
import {ServiceComponent} from '../components/service/service.component';
import {AboutComponent} from '../components/about/about.component';
import {ContactsComponent} from '../components/contacts/contacts.component';
import {MainPageComponent} from '../components/main-page/main-page.component';
import {OrderFormComponent} from '../components/order-form/order-form.component';
import {TaskFormComponent} from '../components/order-form/task/task-form.component';
import {ContactFormComponent} from '../components/order-form/contact/contact-form.component';
import {CompleteOrderComponent} from '../components/order-form/complete/complete-order.component';

//admin
import {AdminGuard}   from '../guards/admin.guard';

import {AdminLoginComponent} from '../components/admin-login/admin-login.component';

import {AdminPanelComponent} from '../components/admin-panel/admin-panel.component';

//admin index
import {AdminIndexComponent} from '../components/admin-index/admin-index.component';

//admin applications
import {AdminApplicationsComponent} from '../components/admin-applications/admin-applications.component';
import {AdminApplicationsListComponent} from '../components/admin-applications-list/admin-applications-list.component';
import {AdminApplicationsEditComponent} from '../components/admin-applications-edit/admin-applications-edit.component';

//admin employees
import {AdminEmployeesComponent} from '../components/admin-employees/admin-employees.component';
import {AdminEmployeesListComponent} from '../components/admin-employees-list/admin-employees-list.component';
import {AdminEmployeesAddComponent} from '../components/admin-employees-add/admin-employees-add.component';


const orderRoutes: Routes = [
    {path: '', component: TaskFormComponent},
    {path: 'contact', component: ContactFormComponent},
    {path: 'complete', component: CompleteOrderComponent}
];

const adminEmployeesRoutes: Routes = [
    {path: '', component: AdminEmployeesListComponent},
    {path: 'add', component: AdminEmployeesAddComponent}
];

const adminApplicationsRoutes: Routes = [
    {path: '', component: AdminApplicationsListComponent},
    {path: 'edit/:id', component: AdminApplicationsEditComponent}
];

const adminRoutes: Routes = [
    {path: '', component: AdminIndexComponent},
    {path: 'applications', component: AdminApplicationsComponent, children: adminApplicationsRoutes},
    {path: 'employees', component: AdminEmployeesComponent, children: adminEmployeesRoutes}
];

const publicRoutes: Routes = [
    {path: 'home', component: MainPageComponent},
    {path: 'service', component: ServiceComponent},
    {path: 'about', component: AboutComponent},
    {path: 'contacts', component: ContactsComponent},
    {path: 'order', component: OrderFormComponent, children: orderRoutes},

];

const appRoutes: Routes = [
    {path: '', redirectTo: '/home', pathMatch:'full'},
    {path: '', component: SiteComponent, children: publicRoutes},
    {path: 'adminauth', component: AdminLoginComponent},
    {path: 'admin', component: AdminPanelComponent, children: adminRoutes, canActivate: [AdminGuard]},
    {path: '', redirectTo: '/site', pathMatch: 'full'},
    //{path: '**', redirectTo: '/'},
];

export const AppRouter = RouterModule.forRoot(appRoutes);
