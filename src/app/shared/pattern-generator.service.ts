import { Injectable } from '@angular/core';
import * as geoPattern from 'geopattern';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PatternGeneratorService {
  constructor(private sanitizer: DomSanitizer) {}

  getPatternAsUrl(string: string) {
    return geoPattern.generate(string).toDataUrl();
  }

  getPatternAsUri(string: string) {
    return geoPattern.generate(string).toDataUri();
  }

  getPatternAsSafeStyle(string: string) {
    return this.sanitizer.bypassSecurityTrustStyle(geoPattern.generate(string).toDataUrl());
  }
}
