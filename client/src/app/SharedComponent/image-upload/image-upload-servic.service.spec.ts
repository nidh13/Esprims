import { TestBed } from '@angular/core/testing';

import { ImageUploadServicService } from './image-upload-servic.service';

describe('ImageUploadServicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageUploadServicService = TestBed.get(ImageUploadServicService);
    expect(service).toBeTruthy();
  });
});
