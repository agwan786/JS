import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import {HomeModule} from './home.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('goals', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true})
      ])
    ])
  ]
})

export class HomeComponent implements OnInit {
  itemCount: number = 4;
  addContactBtn: string = 'Add Contact';
  deleteBtn: string = 'Remove Contact';
  btnText: string = 'Add an Item';    // Add this line
  goalText: string = 'My first life goal';
  goals = ['My first life goal', 'I want to climb a mountain', 'Go ice skiing'];
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
