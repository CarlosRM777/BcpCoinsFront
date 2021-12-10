import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Coin } from './Models/Coin';
import { ExchangeRate, ExchangeRateUpdResponse, ExchangeRateResponse, ExchangeRateReq } from './Models/ExchangeRate';
import { Token } from './Models/Token';
import { catchError, retry, take } from 'rxjs/operators'
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getExchangeRates() : Observable<ExchangeRate[]>  {
    return this.http.get<ExchangeRate[]>(`${this.apiServerUrl}/`, {headers: new HttpHeaders().set('Authorization', `Bearer `+ localStorage.getItem('token')!)});
  }

  public getCoins() : Observable<Coin[]>  {
    return this.http.get<Coin[]>(`${this.apiServerUrl}/coin`, {headers: new HttpHeaders().set('Authorization', `Bearer `+ localStorage.getItem('token')!)});
  }

  public createExchangeOperation(exchangeRate: ExchangeRateReq) : Observable<ExchangeRateResponse>  {
    return this.http.post<ExchangeRateResponse>(`${this.apiServerUrl}/`, exchangeRate, {headers: new HttpHeaders().set('Authorization', `Bearer `+ localStorage.getItem('token')!)});
  }

  public updExchangeRate(exchangeRate: ExchangeRate) : Observable<ExchangeRateUpdResponse>  {
    return this.http.put<ExchangeRateUpdResponse>(`${this.apiServerUrl}/`, exchangeRate, {headers: new HttpHeaders().set('Authorization', `Bearer `+ localStorage.getItem('token')!)});
  }

  public getToken(username : string, pwd : string) : Observable<Token>  {
    return this.http.post<Token>(`${this.apiServerUrl}/token`, {}, {headers: new HttpHeaders().set('Authorization', `Basic `+ btoa(username+":"+pwd))});
  }
}
