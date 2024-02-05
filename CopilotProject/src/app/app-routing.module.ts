import { RouterModule,Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PropertyViewComponent } from "./property-view/property-view.component";
import { ViewPageComponent } from "./view-page/view-page.component";
import { NgModule } from "@angular/core";
import { ViewDocsComponent } from "./view-docs/view-docs.component";
import { AddPropertyComponent } from "./add-property/add-property.component";
import { MessagelistComponent } from "./messagelist/messagelist.component";
import { CheckoutComponent } from "./checkout/checkout.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: DashboardComponent, children: [
    { path: '', component: PropertyViewComponent },
    { path: 'view/:id', component: ViewPageComponent }, // Add the child route for ViewComponent
    { path: 'messagelist', component: MessagelistComponent },
    { path: 'viewdocs', component: ViewDocsComponent },
    { path: 'addproperty', component: AddPropertyComponent },
    { path: 'checkout/:id', component: CheckoutComponent } // Add the child route for ViewComponent
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
