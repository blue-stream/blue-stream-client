import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmbedComponent } from './embed.component';
import { SharedModule } from '../shared/shared.module';
import { EmbedRoutingModule } from './embed-routing.module';

@NgModule({
  declarations: [EmbedComponent],
  imports: [
    CommonModule,
    SharedModule,
    EmbedRoutingModule,
  ]
})
export class EmbedModule { }
