import { Component, OnInit } from '@angular/core';
import { Message } from '../Models/Message';
import { MessageService } from '../Services/message.service';

@Component({
  selector: 'app-messagelist',
  templateUrl: './messagelist.component.html',
  styleUrls: ['./messagelist.component.css']
})
export class MessagelistComponent implements OnInit {
  messages: Message[] = []; // adjust the type to match your data structure

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.getMessages().subscribe(messages => {
      this.messages = messages;
      console.log(this.messages);
    });
  }
}
