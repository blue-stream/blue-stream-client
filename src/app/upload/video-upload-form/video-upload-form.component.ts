import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatSnackBar } from '@angular/material';
import { VideoUpload } from '../video-upload.interface';
import { Video } from 'src/app/shared/models/video.model';
import { environment } from '../../../environments/environment';
import { VideoService } from '../../core/services/video.service';
import { TranslateService } from '@ngx-translate/core';
import { ComponentCanDeactivate } from '../../core/can-deactivate/component-can-deactivate';

@Component({
  selector: 'bs-video-upload-form',
  templateUrl: './video-upload-form.component.html',
  styleUrls: ['./video-upload-form.component.scss']
})
export class VideoUploadFormComponent extends ComponentCanDeactivate implements OnInit {

  @Input() isPublishReady: boolean;
  @Input() videoUpload: VideoUpload;
  @Output() videoSubmitted: EventEmitter<Video> = new EventEmitter();

  uploadForm: FormGroup;
  separatorKeysCodes = [ENTER];

  constructor(
    private fb: FormBuilder,
    private videoService: VideoService,
    public snackBar: MatSnackBar,
    private translateService: TranslateService) {
    super();
  }

  createForm() {
    this.uploadForm = this.fb.group({
      title: this.fb.control(this.videoUpload.fileUpload.file.name, [
        Validators.required,
        Validators.minLength(environment.titleMinLength),
        Validators.maxLength(environment.titleMaxLength)
      ]),
      description: this.fb.control('',
        Validators.maxLength(environment.descriptionMaxLength)),
      tags: this.fb.array([]),
    });
  }

  removeTag(index: number): void {
    const tags = this.uploadForm.get('tags') as FormArray;

    if (index >= 0) {
      tags.removeAt(index);
    }
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const tags = this.uploadForm.get('tags') as FormArray;
      tags.push(this.fb.control(value.trim()));
    }

    if (input) {
      input.value = '';
    }
  }

  onSubmit(event: Event) {
    const video: Video = { ...this.uploadForm.value, ...{ id: this.videoUpload.id } };
    this.publishVideo(video);
  }

  publishVideo(video: Video) {
    video.published = true;
    this.videoUpload.published = true;
    this.videoService.update(video).subscribe(updatedVideo => {
      this.videoUpload.published = true;

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

  ngOnInit() {
    this.uploadForm = new FormGroup({
      title: new FormControl(this.videoUpload.fileUpload.file.name),
      description: new FormControl(''),
      tags: new FormControl(''),
    });

    this.createForm();
  }

  canDeactivate(): boolean {
    return this.videoUpload.published;
  }

}
