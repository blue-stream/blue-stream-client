import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel.component';
import { AdminPanelRoutingModule } from './admin-pannel-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AdminPanelComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminPanelRoutingModule,
  ]
})
export class AdminPanelModule { }
