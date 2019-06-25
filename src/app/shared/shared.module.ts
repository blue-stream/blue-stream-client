import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { VideoTileComponent } from './video-tile/video-tile.component';
import { VideoListComponent } from './video-list/video-list.component';
import { RouterModule } from '@angular/router';
import { AvatarComponent } from './avatar/avatar.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { SafeUrlPipe } from './safe-url.pipe';
import { VideoProgressComponent } from './video-player/video-progress/video-progress.component';
import { VideoActionsComponent } from './video-player/video-actions/video-actions.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactionsComponent } from './reactions/reactions.component';
import { ReactionComponent } from './reactions/reaction/reaction.component';
import { EllipsisModule } from 'ngx-ellipsis';
import { SearchComponent } from './search/search.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SubscribeButtonComponent } from './subscribe-button/subscribe-button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { ChannelListComponent } from './channel-list/channel-list.component';
import { ChannelTileComponent } from './channel-tile/channel-tile.component';
import { VideoFormComponent } from './video-form/video-form.component';
import { NoVideosFoundComponent } from './no-videos-found/no-videos-found.component';
import { PopularTagsComponent } from './popular-tags/popular-tags.component';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatChipsModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatSelectModule,
    FlexLayoutModule,
    MatSliderModule,
    MatMenuModule,
    MatTabsModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    TranslateModule,
    RouterModule,
    EllipsisModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatChipsModule,
    MatTooltipModule,
    MatSliderModule,
    MatMenuModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    FlexLayoutModule,
    RouterModule,
    AvatarComponent,
    VideoPlayerComponent,
    ConfirmDialogComponent,
    VideoTileComponent,
    VideoListComponent,
    TranslateModule,
    ReactionsComponent,
    SearchComponent,
    SafeUrlPipe,
    SubscribeButtonComponent,
    ReactiveFormsModule,
    MatExpansionModule,
    ChannelListComponent,
    ChannelTileComponent,
    VideoFormComponent,
    NoVideosFoundComponent,
    NoVideosFoundComponent,
    MatProgressSpinnerModule,
    PopularTagsComponent
  ],
  declarations: [
    ConfirmDialogComponent,
    VideoTileComponent,
    VideoListComponent,
    AvatarComponent,
    VideoPlayerComponent,
    SafeUrlPipe,
    VideoProgressComponent,
    VideoActionsComponent,
    ReactionsComponent,
    ReactionComponent,
    SearchComponent,
    SubscribeButtonComponent,
    ChannelListComponent,
    ChannelTileComponent,
    VideoFormComponent,
    NoVideosFoundComponent,
    PopularTagsComponent
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
