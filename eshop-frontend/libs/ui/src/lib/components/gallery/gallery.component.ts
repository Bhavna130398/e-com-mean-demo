import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
  styles: [
  ]
})
export class GalleryComponent implements OnInit {
  // images!: any[];
  @Input() images: any;
  @Input() selectedImage!: string;

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];
  constructor() { }

  ngOnInit(): void {
    if (this.hasImages) {
      this.selectedImage = this.images[0];
    }
  }
  changeSelectedImage(image: string) {
    this.selectedImage = image
  }
  get hasImages() {
    return this.images?.length > 0
  }
}
