import { Component, OnInit } from '@angular/core';
import {HomeModule} from './home.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  itemCount: number = 4;
  addContactBtn: string = 'Add Contact';
  deleteBtn: string = 'Remove Contact';
  btnText: string = 'Add an Item';    // Add this line
  goalText: string = 'My first life goal';
  goals = [];
  contacts: Array<HomeModule>;
  error: string = '';
  constructor() {  	 
  	 this.contacts = [];
  }
  ngOnInit() {
    this.itemCount = this.goals.length;
  }

  addItem(goal) {  	
    this.goals.push(goal);
    this.goalText = '';
    this.itemCount = this.goals.length;    
  }

  addContact(name,phone){ 
   	if(name != '' && phone != ''){   	
	  	let contact = new HomeModule(name,phone); 
	  	this.contacts.push(contact); 
	  	this.error	=	'';
  	}else{
  		if(name == '' && phone == '')
  			this.error	=	'Name and Phone number should be valid!';
  		else if (name == '')
  			this.error	=	'Name should be valid!';
  		else
  			this.error	=	'Phone number should be valid!';
  	}
  } 

  removeContact(contact){ 
  	let index = this.contacts.indexOf(contact); 
  	this.contacts.splice(index,1); 
  }
}
