import { DataHelper } from './data';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = ' PDF file content base64 read from Server';

  pdfContent: any;
  @ViewChild('pdfview') pdfview: ElementRef;

  ngOnInit(): void {}

  showData() {
    let content = DataHelper.getDataFromAPI();

    this.pdfContent =
      URL.createObjectURL(this.b64toBlob(content, 'application/pdf')) +
      '#toolbar=0&navpanes=0&scrollbar=0&view=FitH';

    this.pdfview.nativeElement.setAttribute('data', this.pdfContent);
  }

  b64toBlob(b64Data, contentType) {
    var byteCharacters = atob(b64Data);

    var byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      var slice = byteCharacters.slice(offset, offset + 512),
        byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
}
