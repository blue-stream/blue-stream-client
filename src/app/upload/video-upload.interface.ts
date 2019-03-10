import { FileUpload } from './file-upload';

export interface VideoUpload {
  fileUpload: FileUpload;
  published: boolean;
  saved: boolean;
  id: string;
  token: string;
}
