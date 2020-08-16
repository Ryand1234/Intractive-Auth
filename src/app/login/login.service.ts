import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

interface Idata {
	data: string,
	index: number
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

	private ques: Array<string> = [
		"",
		"login_id",
		"login_passwd"
	]

	private socket = io('http://localhost:3000');
	private index: number;
	constructor() { }

	init(){
		this.socket.emit('init');
	}
	
	sendResponse(data: Idata){
		this.index = parseInt(localStorage.getItem('index')) + 1;
		this.socket.emit(this.ques[data.index], data)
		localStorage.setItem('index', this.index.toString())
	}

	getResponse(){
		var res = new Observable<any>(
			observer =>{
				this.socket.on('login', (data)=>{
					observer.next(data)
				})
			}
		)

		return res;
	}
}
