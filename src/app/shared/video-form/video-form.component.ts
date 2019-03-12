import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators, ValidationErrors, } from '@angular/forms';
import { ValidatorFn, FormGroupDirective, NgForm, AbstractControl } from '@angular/forms';
import { ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatSnackBar, ErrorStateMatcher } from '@angular/material';
import { Video } from 'src/app/shared/models/video.model';
import { environment } from '../../../environments/environment';
import { VideoService } from '../../core/services/video.service';
import { TranslateService } from '@ngx-translate/core';
import { ComponentCanDeactivate } from '../../core/can-deactivate/component-can-deactivate';
import { Observable, Subject, of } from 'rxjs';
import { Classification } from 'src/app/shared/models/classification.model';
import {
  debounceTime, distinctUntilChanged, switchMap, map, first
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
  selector: 'bs-video-form',
  templateUrl: './video-form.component.html',
  styleUrls: ['./video-form.component.scss']
})
export class VideoFormComponent extends ComponentCanDeactivate implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private translateService: TranslateService) {
    super();
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
  selectedPp: string;
  selectedSource: string;


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

  onSourceType(search: string) {
    this.sourceTyped.next(search);
  }

  onPpType(search: string) {
    this.ppTyped.next(search);
  }

  createForm() {
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
      classificationSource: this.fb.control(this.video.classificationSource || '',
        Validators.maxLength(environment.classificationMaxLength),
        this.sourceValidator
      ),
      pp: this.fb.control(this.video.pp || '',
        Validators.maxLength(environment.classificationMaxLength),
        this.ppValidator,
      ),
    }, { validator: classificationValidator });
  }

  sourceValidator = (control: AbstractControl): Observable<ValidationErrors | null> => {
    const name = control.value;
    if (!name) { return of(null); }
    return this.sources.pipe(map(sources => {
      // tslint:disable-next-line: no-shadowed-variable
      const source = sources.find(source => source.name === name);
      this.selectedSource = source && source.id;

      return !!source ? null : { 'forbiddenSource': true };
    }), first());
  }

  ppValidator = (control: AbstractControl): Observable<ValidationErrors | null> => {
    const name = control.value;
    if (!name) { return of(null); }
    return this.pps.pipe(map(pps => {
      // tslint:disable-next-line: no-shadowed-variable
      const pp = pps.find(pp => pp.name === name);
      this.selectedPp = pp && pp.id;

      return !!pp ? null : { 'forbiddenPp': true };
    }), first());
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
    this.saveVideo();
  }

  normalizeVideo(): Video {
    const video: Video = { ...this.videoForm.value, id: this.video.id };
    if (!video.pp) { delete video.pp; } else { video.pp = this.selectedPp; }
    if (!video.classificationSource) { delete video.classificationSource; } else { video.classificationSource = this.selectedSource; }

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

  canDeactivate(): boolean {
    return this.videoSaved;
  }

}
