import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DocumentService } from 'src/app/services/document.service';
import { Document } from 'src/app/models/document.model.';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from 'src/app/services/modal.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Utils } from 'src/app/utils/utils';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  providers: [NgbModalConfig, NgbModal]
})


export class UploadComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  documents: Document[] | undefined;
  selectedFiles: File[] = [];
  fileNames: string[] = [];

  showModal = false;
  showSpinner: boolean = false;
  errorMessage: string = '';

  constructor(private apiService: DocumentService, config: NgbModalConfig,
    private modalService: ModalService, private sanitizer: DomSanitizer) {
    config.backdrop = 'static';
    config.keyboard = false;
  }


  ngOnInit(): void {
    this.getDocuments();
  }


  async getDocuments(): Promise<void> {
    (await this.apiService.getDocuments()).subscribe((documents: Document[]) => {
      this.documents = documents;
    });
  }



  trustUrl(base64String: string): SafeUrl {
    const url = base64String;
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }


  onFileChange(event: any): void {
    const files = event.target.files;
    this.selectedFiles = [];
    this.fileNames = [];

    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push(files[i]);
      this.fileNames.push(files[i].name);
    }
  }


  onFileNameChange(event: Event, index: number): void {
    const newName = (event.target as HTMLInputElement).value;
    this.fileNames[index] = newName;
  }


  async uploadFiles(): Promise<void> {
    let upload: Document[] = [];
    this.showSpinner = true;

    let index = 0;
    this.selectedFiles.forEach(async file => {
      const base64String = await Utils.loadFileAndConvertToBase64(file);

      const objDocument: Document = {
        id: null,
        fileName: this.fileNames[index],
        contentType: file.type,
        data: base64String
      };


      upload.push(objDocument);
      index++;
    });


    setTimeout(async () => {
      (await this.apiService.uploadDocument(upload)).subscribe((response: Document[]) => {
        this.getDocuments();
      }, (error: any) => {
        this.errorMessage = "¡Ups! ocurrío un error al intentar subir los archivos, intente de nuevo más tarde.";  
      }
      );

      this.selectedFiles = [];
      this.fileNames = [];
      this.showSpinner = false;
      this.modalService.dismissAll();
    }, 2000);
  }


  // Open a modal to upload files
  openModal(content: any): void {
    this.modalService.open(content);
  }
}
