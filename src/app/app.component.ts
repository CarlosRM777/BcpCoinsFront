import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Coin } from './Models/Coin';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRate, ExchangeRateReq, ExchangeRateResponse } from './Models/ExchangeRate';
import { Token } from './Models/Token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public coins: Coin[] = [];
  public exchangeRates: ExchangeRate[] = [];
  public isLogin : boolean = false;
  public isValiduser : boolean = true;
  public isWrongCredentials : boolean = false;
  public loginName: string = "";
  public resultExchange: number = 0;
  public exchangeRate: number = 0;

  constructor(private exchangeService: ExchangeRateService) {}
  ngOnInit(): void {
    //this.getQuestions();
    this.isLogin = false;
    this.Login("user", "123456");
    this.getCoins();
    this.getExchangeRates();
    //this.getAuthor("CarlosRM7","123456");

    
  }
  
  public getExchangeRates() : void {
    this.exchangeService.getExchangeRates().subscribe(
      (response : ExchangeRate[]) => {
         this.exchangeRates = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getCoins() : void {
    this.exchangeService.getCoins().subscribe(
      (response : Coin[]) => {
         this.coins = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public Login(user:string, pwd:string) {
    this.exchangeService.getToken(user, pwd).subscribe(
      (response : Token) => {
          this.isWrongCredentials=false;
          this.isLogin = true;
          this.loginName = user;
          localStorage.setItem('token', response.token);
          document.getElementById('btn_login_cancel')?.click();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    ); 
  }
  public onLogin(loginForm : NgForm){
    this.Login(loginForm.value["MLusername"], loginForm.value["MLpassword"]);
    if (this.isLogin) loginForm.resetForm();
  }

  public onCreateExchangeOperation(exchangeForm : NgForm){
    var exchanteRate : ExchangeRateReq = {
      monto: exchangeForm.value["amount"],
      monedaOrigen: exchangeForm.value["fromcoin"],
      monedaDestino: exchangeForm.value["tocoin"]
    };
    this.exchangeService.createExchangeOperation(exchanteRate).subscribe(
      (response : ExchangeRateResponse) => {
        this.resultExchange=response.montoCambiado;
        this.exchangeRate = response.tipoCambio;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    
  }

  public onChangeList() {
    
    var monori = document.getElementById('fromcoin')?.nodeValue;
    var mondes = document.getElementById('tocoin')?.nodeValue;
  }

  public onLogout(){
    this.isLogin = false;
    this.loginName = "";
    this.isWrongCredentials = false;
  }
  public onRegister(registerForm : NgForm) : void {}


  public searchUser(key: string) : void{
    this.isValiduser = true;
  }
}
