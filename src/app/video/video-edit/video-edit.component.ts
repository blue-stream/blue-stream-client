import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatSnackBar } from '@angular/material';
import { Video } from 'src/app/shared/models/video.model';
import { environment } from '../../../environments/environment';
import { VideoService } from '../../core/services/video.service';
import { TranslateService } from '@ngx-translate/core';
import { ComponentCanDeactivate } from '../../core/can-deactivate/component-can-deactivate';

@Component({
  selector: 'bs-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.scss']
})
export class VideoEditComponent extends ComponentCanDeactivate implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private translateService: TranslateService) {
      super();
     }

  video: Video;
  routeIdSubscription: any;
  videoSubscription: any;
  videoSaved = false;
  videoForm: FormGroup;
  separatorKeysCodes = [ENTER];

  ngOnInit() {
    this.routeIdSubscription = this.route.params.subscribe(params => {
      this.loadVideoInfo(params.id);
    });
  }

  loadVideoInfo(id: string) {
    this.videoSubscription = this.videoService.getVideo(id).subscribe(video => {
      this.video = video;
      this.createForm();
    });
  }

  createForm() {
    this.videoForm = this.fb.group({
      title: this.fb.control(this.video.title, [
        Validators.required,
        Validators.minLength(environment.titleMinLength),
        Validators.maxLength(environment.titleMaxLength)
      ]),
      description: this.fb.control(this.video.description,
        Validators.maxLength(environment.descriptionMaxLength)),
      tags: this.fb.array(this.video.tags),
    });
  }

  removeTag(index: number): void {
    const tags = this.videoForm.get('tags') as FormArray;

    if (index >= 0) {
      tags.removeAt(index);
    }
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const tags = this.videoForm.get('tags') as FormArray;
      tags.push(this.fb.control(value.trim()));
    }

    if (input) {
      input.value = '';
    }
  }

  onSubmit(event: Event) {
    const video: Video = { ...this.videoForm.value, id: this.video.id };
    this.publishVideo(video);
    this.videoSaved = true;
  }

  publishVideo(video: Video) {
    video.published = true;
    this.video.published = true;
    this.videoService.update(video).subscribe(updatedVideo => {
      this.video.published = true;

      this.translateService.get([
        'UPLOADER.VIDEO_UPLOADER.PUBLISH_SUCCESS',
        'UPLOADER.VIDEO_UPLOADER.PUBLISH_SUCCESS_APPROVAL']).subscribe(translations => {
          this.snackBar.open(
            translations['UPLOADER.VIDEO_UPLOADER.PUBLISH_SUCCESS'],
            translations['UPLOADER.VIDEO_UPLOADER.PUBLISH_SUCCESS_APPROVAL'],
            { duration: 2000 });
        });
    });
  }

  canDeactivate(): boolean {
    return this.videoSaved;
  }

  ngOnDestroy() {
    this.routeIdSubscription.unsubscribe();
    this.videoSubscription.unsubscribe();
  }
}
