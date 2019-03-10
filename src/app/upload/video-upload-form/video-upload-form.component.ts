import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ValidationErrors, FormGroupDirective, NgForm } from '@angular/forms';
import { ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatSnackBar } from '@angular/material';
import { ErrorStateMatcher } from '@angular/material';
import { VideoUpload } from '../video-upload.interface';
import { Video } from 'src/app/shared/models/video.model';
import { environment } from '../../../environments/environment';
import { VideoService } from '../../core/services/video.service';
import { TranslateService } from '@ngx-translate/core';
import { ComponentCanDeactivate } from '../../core/can-deactivate/component-can-deactivate';
import { Observable, Subject, of } from 'rxjs';
import { Classification } from 'src/app/shared/models/classification.model';
import {
  debounceTime, distinctUntilChanged, switchMap,map,first
} from 'rxjs/operators';

const classificationValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const classificationSource = control.get('classificationSource').value;
  const pp = control.get('pp').value;
  const condition = pp ? classificationSource : true;
  return condition ? null : { 'sourceMissed': true };
};

class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}

@Component({
  selector: 'bs-video-upload-form',
  templateUrl: './video-upload-form.component.html',
  styleUrls: ['./video-upload-form.component.scss']
})
export class VideoUploadFormComponent extends ComponentCanDeactivate implements OnInit {

  @Input() isPublishReady: boolean;
  @Input() videoUpload: VideoUpload;
  @Output() videoPublished: EventEmitter<string> = new EventEmitter();
  @Output() videoSavedEvent: EventEmitter<string> = new EventEmitter();

  uploadForm: FormGroup;
  separatorKeysCodes = [ENTER];
  videoSaved = false;
  errorMatcher = new CrossFieldErrorMatcher();
  sourceTyped: Subject<string> = new Subject<string>();
  ppTyped: Subject<string> = new Subject<string>();
  sources: Observable<Classification[]>;
  pps: Observable<Classification[]>;
  selectedPp: string;
  selectedSource: string;

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
      classificationSource: this.fb.control('', 
        Validators.maxLength(environment.classificationMaxLength),
        this.sourceValidator
      ),
      pp: this.fb.control('',
        Validators.maxLength(environment.classificationMaxLength),
        this.ppValidator,
      ),
    }, { validator: classificationValidator });
  }

  sourceValidator = (control: AbstractControl): Observable<ValidationErrors | null> => {
    const name = control.value;
    if(!name) return of(null);
    return this.sources.pipe( map( sources => {
      const source = sources.find(source => source.name === name);
      this.selectedSource = source && source.id;

      return !!source ? null : { 'forbiddenSource': true };
    }),first() );
  };

  ppValidator = (control: AbstractControl): Observable<ValidationErrors | null> => {
    const name = control.value;
    if(!name) return of(null);
    return this.pps.pipe( map( pps => {
      const pp = pps.find(pp => pp.name === name);
      this.selectedPp = pp && pp.id;

      return !!pp ? null : { 'forbiddenPp': true };
    }),first() );
  };



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
    this.saveVideo();
  }

  normalizeVideo(): Video {
    const video: Video = { ...this.uploadForm.value, id: this.videoUpload.id };
    if (!video.pp) { delete video.pp; } else { video.pp = this.selectedPp; }
    if (!video.classificationSource) { delete video.classificationSource; } else { video.classificationSource = this.selectedSource; }

    return video;
  }

  saveVideo() {
    const video = this.normalizeVideo();


    this.videoService.update(video).subscribe(updatedVideo => {
      this.videoSaved = true;
      this.videoSavedEvent.emit(this.videoUpload.id);
      this.translateService.get([
        'UPLOADER.VIDEO_UPLOADER.SAVE_SUCCESS',
        'UPLOADER.VIDEO_UPLOADER.SAVE_SUCCESS_APPROVAL']).subscribe(translations => {
          this.snackBar.open(
            translations['UPLOADER.VIDEO_UPLOADER.SAVE_SUCCESS'],
            translations['UPLOADER.VIDEO_UPLOADER.SAVE_SUCCESS_APPROVAL'],
            { duration: 2000 });
        });
    });
  }

  publishVideo() {
    const video = this.normalizeVideo();

    video.published = true;
    this.videoService.update(video).subscribe(updatedVideo => {
      this.videoPublished.emit(video.id);
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

  ngOnInit() {
    this.createForm();
    this.sources = this.sourceTyped.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.loadSources(term)),
    );
    this.pps = this.ppTyped.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.loadPps(term)),
    );
  }

  loadSources(term): Observable<Classification[]> {
    return this.videoService.searchUserSources(term);
  }

  loadPps(term): Observable<Classification[]> {
    return this.videoService.searchUserPps(term);
  }

  canDeactivate(): boolean {
    return this.videoSaved;
  }

  onSourceType(search: string) {
    this.sourceTyped.next(search);
  }

  onPpType(search: string) {
    this.ppTyped.next(search);
  }

}
