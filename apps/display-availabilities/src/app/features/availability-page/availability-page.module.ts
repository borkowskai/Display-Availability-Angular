import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvailabilityPageRoutingModule } from './availability-page-routing.module';
import { AvailabilityViewComponent } from './views/availability-view/availability-view.component';
import { AvailabilityRightComponent } from './components/availability-right/availability-right.component';
import { MatIconModule } from '@angular/material/icon';

const vendors = [MatIconModule];
@NgModule({
  declarations: [AvailabilityViewComponent, AvailabilityRightComponent],
  imports: [CommonModule, AvailabilityPageRoutingModule, ...vendors],
})
export class AvailabilityPageModule {}
