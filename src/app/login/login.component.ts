import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: Array<string> = [
  	"Enter Your Email"
  ]

  constructor(public service: LoginService){
  	this.service.getResponse().subscribe((data)=>{
  		this.message.push(data)
  	})
  }

  msg: string = ""

  ngOnInit(): void {
  		this.service.init()
  		localStorage.setItem('index', "0");
  }


  send(){
  	this.message.push(this.msg);
  	this.service.sendResponse({data: this.msg, index: (parseInt(localStorage.getItem('index')) + 1)})
  	this.msg = '';
  }
}
