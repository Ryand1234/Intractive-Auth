import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Interactibe Authentication';
  message: Array<string> = [
  	"Enter Your Email"
  ]

  constructor(public service: AuthService){
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
