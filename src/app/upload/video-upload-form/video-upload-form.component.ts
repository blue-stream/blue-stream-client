import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { FileUpload } from '../file-upload';
import { Video } from 'src/app/shared/models/video.model';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'bs-video-upload-form',
  templateUrl: './video-upload-form.component.html',
  styleUrls: ['./video-upload-form.component.scss']
})
export class VideoUploadFormComponent implements OnInit {

  @Input() isPublishReady: boolean;
  @Input('file') file: FileUpload;
  @Output() videoSubmitted: EventEmitter<Video> = new EventEmitter();

  uploadForm: FormGroup;
  separatorKeysCodes = [ENTER, COMMA];

  constructor(private fb: FormBuilder) {
  }

  createForm() {
    this.uploadForm = this.fb.group({
      title: this.fb.control(this.file.file.name, [
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
    this.videoSubmitted.emit(this.uploadForm.value);
  }

  ngOnInit() {
    this.uploadForm = new FormGroup({
      title: new FormControl(this.file.file.name),
      description: new FormControl(''),
      tags: new FormControl(''),
    });

    this.createForm();
  }

}
