import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ClaimService {

  constructor(private http: HttpClient) {
  }
  claimURL = '/'

  getAllClaims() {
    return this.http.get('/dashboard/reclamation');
  }

  getClaimById(id: number) {
    return this.http.get('/dashboard/reclamation/id/' + id);
  }

  getStatudClaimByCode(id: string) {
    return this.http.get('http://localhost:9080/prisma-crm-web/reclamation/code/' + id)
    .pipe(map( response => {
      console.log(response);
      return response;
    }));
  }

  getFaqById(id: number) {
    return this.http.get('http://localhost:9080/prisma-crm-web/reclamation/FAQ/' + id);
  }
}
