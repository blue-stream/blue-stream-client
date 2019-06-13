import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SettingsComponent, LanguageSwitcherComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule
  ]
})
export class SettingsModule { }
