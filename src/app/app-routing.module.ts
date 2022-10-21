import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviecardsComponent } from './Components/moviecards/moviecards.component';
import { PagenotavailableComponent } from './Components/pagenotavailable/pagenotavailable.component';
import { TicketbookingComponent } from './Components/ticketbooking/ticketbooking.component';
import { AdminComponent } from './Components/admin/admin.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'bookticket/:id',component:TicketbookingComponent},
  {path:'home',component:MoviecardsComponent},
  {path:'admin',component:AdminComponent},
  {path:'**',component:PagenotavailableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
