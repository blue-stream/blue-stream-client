import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, ValidationErrors, } from '@angular/forms';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatSnackBar } from '@angular/material';
import { Video } from 'src/app/shared/models/video.model';
import { environment } from '../../../environments/environment';
import { ClassificationService } from '../../core/services/classification.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject, of } from 'rxjs';
import { Classification } from 'src/app/shared/models/classification.model';
import {
  debounceTime, distinctUntilChanged, switchMap, map, first
} from 'rxjs/operators';
import { CrossFieldErrorMatcher } from './CrossFieldErrorMatcher';
import { VideoService } from 'src/app/core/services/video.service';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'bs-video-form',
  templateUrl: './video-form.component.html',
  styleUrls: ['./video-form.component.scss']
})
export class VideoFormComponent implements OnInit {

  constructor(
    private classificationService: ClassificationService,
    private videoService: VideoService,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private translateService: TranslateService) {
  }

  @Input() video: Partial<Video>;
  @Input() disabled: boolean = false;
  @Output() videoSavedEvent: EventEmitter<string> = new EventEmitter();

  videoSaved = false;
  videoForm: FormGroup;
  separatorKeysCodes = [ENTER];
  errorMatcher = new CrossFieldErrorMatcher();
  sourceTyped: Subject<string> = new Subject<string>();
  ppTyped: Subject<string> = new Subject<string>();
  sources: Observable<Classification[]>;
  pps: Observable<Classification[]>;

  ngOnInit() {
    this.sources = this.sourceTyped.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((term: string) => this.loadSources(term)),
    );
    this.pps = this.ppTyped.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((term: string) => this.loadPps(term)),
    );
    this.createForm();
  }

  loadSources(term: string): Observable<Classification[]> {
    return this.classificationService.searchUserSources(term);
  }

  loadPps(term: string): Observable<Classification[]> {
    return this.classificationService.searchUserPps(term);
  }

  onSourceType(search: string) {
    this.sourceTyped.next(search);
  }

  onPpType(search: string) {
    this.ppTyped.next(search);
  }

  createForm() {
    const classificationSource = this.video.classificationSource &&
      {
        id: (this.video.classificationSource as Classification)._id,
        name: (this.video.classificationSource as Classification).name
      };
    const pp = this.video.pp && {
      id: (this.video.pp as Classification)._id,
      name: (this.video.pp as Classification).name
    };

    this.videoForm = this.fb.group({
      title: this.fb.control(this.video.title || '', [
        Validators.required,
        Validators.minLength(environment.titleMinLength),
        Validators.maxLength(environment.titleMaxLength)
      ]),
      description: this.fb.control(this.video.description || '',
        Validators.maxLength(environment.descriptionMaxLength)),
      tags: this.fb.array(this.video.tags || []),
      published: this.fb.control(this.video.published || true, [
        Validators.required
      ]),
      classificationSource: this.fb.control(classificationSource || '',
        [Validators.maxLength(environment.classificationMaxLength),
        this.sourceValidator]
      ),
      pp: this.fb.control(pp || '',
        [Validators.maxLength(environment.classificationMaxLength),
        this.ppValidator]
      ),
    }, { validator: this.classificationValidator });
  }

  sourceValidator = (control: AbstractControl): ValidationErrors | null => {
    const source = control.value;
    if (!source) { return null; }
    return source.id ? null : { 'forbiddenSource': true };
  }

  ppValidator = (control: AbstractControl): ValidationErrors | null => {
    const pp = control.value;
    if (!pp) { return null; }
    return pp.id ? null : { 'forbiddenPp': true };
  }

  displayFn = (classification?: Classification) => {
    return classification ? classification.name : undefined;
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

  onSubmit() {
    this.saveVideo();
  }

  normalizeVideo(): Video {
    const video: Video = { ...this.videoForm.value, id: this.video.id };
    if (!video.pp) { video.pp = null; } else {
      video.pp = (video.pp as Classification).id;
    }
    if (!video.classificationSource) { video.classificationSource = null; } else {
      video.classificationSource = (
        video.classificationSource as Classification).id;
    }

    return video;
  }

  saveVideo() {
    const video = this.normalizeVideo();
    this.videoService.update(video)
      .catch((err, caught) => {
        let message: string = 'SNACK_BARS.ERRORS.UNPREMITTED_USER';
        let action: string = 'SNACK_BARS.BUTTONS.OK';

        if (err.error.type !== 'UnPremittedUserError') {
          message = 'SNACK_BARS.ERRORS.UNKNOWN';
          action = 'SNACK_BARS.BUTTONS.OK';
        }

        this.translateService.get([message, action]).subscribe(translations => {
          this.snackBar.open(
            translations[message],
            translations[action],
            { duration: 2000 });
        });

        return new Observable(null);

      })
      .subscribe(updatedVideo => {
        this.videoSavedEvent.emit(video.id);
        this.videoSaved = true;
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

  classificationValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const classificationSource = control.get('classificationSource').value;
    const pp = control.get('pp').value;
    const condition = pp ? classificationSource.id : true;
    return condition ? null : { 'sourceMissed': true };
  }

}
