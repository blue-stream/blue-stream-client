import { Injectable } from '@angular/core';
import * as geoPattern from 'geopattern';

@Injectable({
  providedIn: 'root'
})
export class PatternGeneratorService {
  getPatternAsUrl(string: string) {
    return geoPattern.generate(string).toDataUrl();
  }

  getPatternAsUri(string: string) {
    return geoPattern.generate(string).toDataUri();
  }
}
