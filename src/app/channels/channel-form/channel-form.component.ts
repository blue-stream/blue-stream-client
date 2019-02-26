import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Channel } from '../channel.model';
import { ChannelService } from '../channel.service';
import { MatSnackBar } from '@angular/material';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/shared/user.service';
import { PatternGeneratorService } from 'src/app/shared/pattern-generator.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'bs-channel-form',
  templateUrl: './channel-form.component.html',
  styleUrls: ['./channel-form.component.scss']
})
export class ChannelFormComponent implements OnInit {
  @Input() channel: Channel;
  @Output() closeForm: EventEmitter<string | void> = new EventEmitter();

  isEditForm: boolean = false;
  channelForm: FormGroup;
  channelImage: string;

  constructor(
    private patternGenerator: PatternGeneratorService,
    private userService: UserService,
    private fb: FormBuilder,
    private channelService: ChannelService,
    private translateService: TranslateService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.channel) {
      this.isEditForm = true;
    }

    this.createForm();
    this.changeImage();
  }

  onKeyupEvent() {
    this.changeImage();
  }

  changeImage() {
    const channelName: string = this.channelForm.get('name').value.trim();
    this.channelImage = this.patternGenerator.getPatternAsUrl(channelName);
  }

  createForm() {
    this.channelForm = this.fb.group({
      name: this.fb.control(this.channel ? this.channel.name : '', [
        Validators.minLength(environment.channelNameMinLength),
        Validators.maxLength(environment.channelNameMaxLength),
        Validators.required,
      ]),
      description: this.fb.control(this.channel ? this.channel.description : '', [
        Validators.minLength(environment.channelDescriptionMinLength),
        Validators.maxLength(environment.channelDescriptionMaxLength),
        Validators.required,
      ]),
    });
  }

  onSubmit(event: Event) {
    const channel: Partial<Channel> = {
      name: this.channelForm.get('name').value.trim(),
      description: this.channelForm.get('description').value.trim(),
      user: this.userService.currentUser.id,
    };

    if (this.isEditForm) {
      this.updateChannel(channel);
    } else {
      this.createChannel(channel);
    }
  }

  updateChannel(channel: Partial<Channel>) {
    this.channelService.update(this.channel.id, channel).subscribe(retChannel => {
      this.channel = retChannel;
      this.channelService.channelUpdated.next(retChannel);

      this.translateService.get([
        'CHANNEL.FORM.UPDATED',
        'CHANNEL.FORM.UPDATED_APPROVE']).subscribe(translations => {
          this.snackBar.open(
            translations['CHANNEL.FORM.UPDATED'],
            translations['CHANNEL.FORM.UPDATED_APPROVE'],
            { duration: 2000 });
        });

      this.closeForm.emit();
    });
  }

  createChannel(channel: Partial<Channel>) {
    this.channelService.create(channel).subscribe(retChannel => {
      this.translateService.get([
        'CHANNEL.FORM.CREATED',
        'CHANNEL.FORM.CREATED_APPROVE']).subscribe(translations => {
          this.snackBar.open(
            translations['CHANNEL.FORM.CREATED'],
            translations['CHANNEL.FORM.CREATED_APPROVE'],
            { duration: 2000 });
        });
      this.closeForm.emit(retChannel.id);
    });
  }

  cancel() {
    this.closeForm.emit();
  }

}
