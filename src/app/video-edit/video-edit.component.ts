import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators, ValidationErrors, } from '@angular/forms';
import { ValidatorFn, FormGroupDirective, NgForm, AbstractControl } from '@angular/forms';
import { ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatSnackBar } from '@angular/material';
import { Video } from 'src/app/shared/models/video.model';
import { VideoService } from '../core/services/video.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'bs-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.scss']
})
export class VideoEditComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private translateService: TranslateService) {
  }

  video: Video;
  routeIdSubscription: any;
  videoSubscription: any;

  ngOnInit() {
    this.routeIdSubscription = this.route.params.subscribe(params => {
      this.loadVideoInfo(params.id);
    });
  }

  loadVideoInfo(id: string) {
    this.videoSubscription = this.videoService.getVideo(id).subscribe(video => {
      this.video = video;
    });
  }

  ngOnDestroy() {
    this.routeIdSubscription.unsubscribe();
    this.videoSubscription.unsubscribe();
  }
}
