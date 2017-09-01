import {
    BrowserModule,
    HammerGestureConfig,
    HAMMER_GESTURE_CONFIG
} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import 'hammerjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Autosize} from 'angular2-autosize/angular2-autosize';
import {Md2Module}  from 'md2';
import {TextMaskModule} from 'angular2-text-mask';

import {SafeHtmlPipe} from './pipes/safe-html-pipe'

import {SelectModule} from 'ng2-select';

import {OverlayComponent} from './components/overlay/overlay.component';
import {OverlayHostComponent} from './components/overlay-host/overlay-host.component';
import {OverlayService} from './services/overlay.service';


//site
import {SiteComponent} from './components/site/site.component';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {ServiceComponent} from './components/service/service.component';
import {AboutComponent} from './components/about/about.component';
import {ContactsComponent} from './components/contacts/contacts.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import {OrderFormComponent} from './components/order-form/order-form.component';
import {TaskFormComponent} from './components/order-form/task/task-form.component';
import {ContactFormComponent} from './components/order-form/contact/contact-form.component';
import {CompleteOrderComponent} from './components/order-form/complete/complete-order.component';


import {PublicApplicationsService}   from './services/publicApplications.service';


import {PageableTableComponent} from './components/pageable-table/pageable-table.component';

//admin
import {AdminGuard}   from './guards/admin.guard';
import {AuthService}   from './services/auth.service';

import {ConfirmComponent} from './components/confirm/confirm.component';
import {SimpleMessageComponent} from "./components/simple-message/simple-message.component";

import {AdminLoginComponent} from './components/admin-login/admin-login.component';

import {AdminPanelComponent} from './components/admin-panel/admin-panel.component';

//admin index
import {AdminIndexComponent} from './components/admin-index/admin-index.component';

//admin applications
import {AdminApplicationsComponent} from './components/admin-applications/admin-applications.component';
import {AdminApplicationsListComponent} from './components/admin-applications-list/admin-applications-list.component';
import {AdminApplicationsEditComponent} from './components/admin-applications-edit/admin-applications-edit.component';
import {ApplicationsTableFilterComponent} from './components/applications-table-filter/applications-table-filter.component';

//admin employees
import {AdminEmployeesComponent} from './components/admin-employees/admin-employees.component';
import {AdminEmployeesListComponent} from './components/admin-employees-list/admin-employees-list.component';
import {AdminEmployeesAddComponent} from './components/admin-employees-add/admin-employees-add.component';

import {LoadableComponent} from './components/loadable/loadable.component';

import {AppRouter} from './modules/router.module';
import {AuthModule} from "./modules/auth.module";

export class HammerConfig extends HammerGestureConfig {
    buildHammer(element: HTMLElement) {
        return new Hammer(element, {
            touchAction: 'auto'
        });
    }
}

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

        ConfirmComponent,

        AdminIndexComponent,

        AdminApplicationsComponent,
        AdminApplicationsListComponent,
        ApplicationsTableFilterComponent,
        AdminApplicationsEditComponent,

        AdminEmployeesComponent,
        AdminEmployeesListComponent,
        AdminEmployeesAddComponent,


        Autosize,

        SafeHtmlPipe,

        LoadableComponent,

        OverlayComponent,
        OverlayHostComponent,
        SimpleMessageComponent
    ],
    entryComponents: [
        OverlayComponent,
        SimpleMessageComponent,
        ConfirmComponent
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
        ReactiveFormsModule,
        AppRouter,
        AuthModule
    ],
    providers: [
        AdminGuard,
        AuthService,
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: HammerConfig
        },
        OverlayService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
