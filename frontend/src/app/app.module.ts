import {
  BrowserModule,
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG
} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Autosize } from 'angular2-autosize/angular2-autosize';
import { Md2Module }  from 'md2';
import { TextMaskModule } from 'angular2-text-mask';
import { Routes, RouterModule } from '@angular/router';

import { SafeHtmlPipe } from './pipes/safe-html-pipe'

import { SelectModule } from 'ng2-select';

import { Utilities, Dictionaries } from './utilities/utilities';

//site
import { SiteComponent } from './components/site/site.component';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ServiceComponent } from './components/service/service.component';
import { AboutComponent } from './components/about/about.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { TaskFormComponent } from './components/order-form/task/task-form.component';
import { ContactFormComponent } from './components/order-form/contact/contact-form.component';
import { CompleteOrderComponent } from './components/order-form/complete/complete-order.component';



import { PublicApplicationsService }   from './services/publicApplications.service';


import { PageableTableComponent } from './components/pageable-table/pageable-table.component';
import { ModalComponent } from './components/modal/modal.component';

//admin
import { AdminGuard }   from './guards/admin.guard';
import { AuthService }   from './services/auth.service';

import { Confirm } from './components/confirm/confirm.component';

import { AdminLoginComponent } from './components/admin-login/admin-login.component'

import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';

//admin index
import { AdminIndexComponent } from './components/admin-index/admin-index.component';

//admin applications
import { AdminApplicationsComponent } from './components/admin-applications/admin-applications.component';
import { AdminApplicationsListComponent } from './components/admin-applications-list/admin-applications-list.component';
import { AdminApplicationsEditComponent } from './components/admin-applications-edit/admin-applications-edit.component';
import { ApplicationsTableFilterComponent } from './components/applications-table-filter/applications-table-filter.component';

//admin employees
import { AdminEmployeesComponent } from './components/admin-employees/admin-employees.component';
import { AdminEmployeesListComponent } from './components/admin-employees-list/admin-employees-list.component';
import { AdminEmployeesAddComponent } from './components/admin-employees-add/admin-employees-add.component';


export class HammerConfig extends HammerGestureConfig {
  buildHammer(element:HTMLElement) {
    return new Hammer(element, {
      touchAction: 'auto'
    });
  }
}

const orderRoutes:Routes = [
  {path: '', component: TaskFormComponent},
  {path: 'contact', component: ContactFormComponent},
  {path: 'complete', component: CompleteOrderComponent}
];

const adminEmployeesRoutes:Routes = [
  {path: '', component: AdminEmployeesListComponent},
  {path: 'add', component: AdminEmployeesAddComponent}
];

const adminApplicationsRoutes:Routes = [
  {path: '', component: AdminApplicationsListComponent},
  {path: 'edit/:id', component: AdminApplicationsEditComponent}
];

const adminRoutes:Routes = [
  {path: '', component: AdminIndexComponent},
  {path: 'applications', component: AdminApplicationsComponent, children: adminApplicationsRoutes},
  {path: 'employees', component: AdminEmployeesComponent, children: adminEmployeesRoutes}
];

const siteRoutes:Routes = [
  {path: '', component: MainPageComponent},
  {path: 'service', component: ServiceComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'order', component: OrderFormComponent, children: orderRoutes},

];

const appRoutes:Routes = [
  {path: 'site', component: SiteComponent, children: siteRoutes},
  {path: 'adminauth', component: AdminLoginComponent},
  {path: 'admin', component: AdminPanelComponent, children: adminRoutes, canActivate: [AdminGuard]},
  {path: '', redirectTo: '/site', pathMatch: 'full'},
  //{path: '**', redirectTo: '/'},
];


@NgModule({
  declarations: [

    AppComponent,

    SiteComponent,

    HeaderComponent,
    ServiceComponent,
    AboutComponent,
    ContactsComponent,
    MainPageComponent,
    OrderFormComponent,
    TaskFormComponent,
    ContactFormComponent,
    CompleteOrderComponent,

    AdminPanelComponent,
    AdminLoginComponent,

    PageableTableComponent,
    ModalComponent,

    Confirm,

    AdminIndexComponent,

    AdminApplicationsComponent,
    AdminApplicationsListComponent,
    ApplicationsTableFilterComponent,
    AdminApplicationsEditComponent,

    AdminEmployeesComponent,
    AdminEmployeesListComponent,
    AdminEmployeesAddComponent,


    Autosize,

    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    HttpModule,
    BrowserAnimationsModule,
    Md2Module.forRoot(),
    NgbModule.forRoot(),
    SelectModule,
    TextMaskModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [
    AdminGuard,
    AuthService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
