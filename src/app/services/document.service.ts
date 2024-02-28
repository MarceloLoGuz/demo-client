import { Injectable } from '@angular/core';
import { Document } from '../models/document.model.';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class DocumentService {
  private documentPath = environment.apiRoutes.documents;
  private token = localStorage.getItem('token');
  private headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token}`)
    .set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  async uploadDocument(document: Document[]): Promise<Observable<Document[]>> {
    return this.http.post<Document[]>(this.documentPath.upload, document, { headers: this.headers });
  }

  async getDocuments(): Promise<Observable<Document[]>> {
    return this.http.get<Document[]>(this.documentPath.all, { headers: this.headers });
  }
}
