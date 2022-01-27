import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AvailabilityViewComponent } from './views/availability-view/availability-view.component';


const routes: Routes = [
  { path: '',  component: AvailabilityViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvailabilityPageRoutingModule { }
