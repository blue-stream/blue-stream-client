import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopularComponent } from './popular.component';
import { SharedModule } from '../shared/shared.module';
import { PopularRoutingModule } from './popular-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PopularRoutingModule,
    SharedModule
  ],
  declarations: [PopularComponent]
})
export class PopularModule { }
