import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Client} from 'src/client';

@Injectable({
  providedIn: 'root'
})
export class FileserviceService {



  constructor(private http: HttpClient) { }


  getResultList() {
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        return this.http.get('./assets/results.json', { headers });
    }

   /* public Adduser(a:Client):Observable<any> {
      return this.http.post<Client>('results.json',a);
    }
  
   /* getList(): Observable<any> {
      return this.http.get(`${this.baseUrl}/parked`);
    }
    
    delete(name: string): Observable<any> {
      return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
    }*/

}
