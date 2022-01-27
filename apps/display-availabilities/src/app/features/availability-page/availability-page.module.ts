import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvailabilityPageRoutingModule } from './availability-page-routing.module';
import { AvailabilityViewComponent } from './views/availability-view/availability-view.component';
import { AvailabilityRightComponent } from './components/availability-right/availability-right.component';



@NgModule({
  declarations: [ AvailabilityViewComponent, AvailabilityRightComponent
  ],
  imports: [
    CommonModule, AvailabilityPageRoutingModule
  ]
})
export class AvailabilityPageModule { }
