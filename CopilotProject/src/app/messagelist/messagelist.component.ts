import { Component, OnInit } from '@angular/core';
import { Message, MessageDetails } from '../Models/Message';
import { MessageService } from '../Services/message.service';

@Component({
  selector: 'app-messagelist',
  templateUrl: './messagelist.component.html',
  styleUrls: ['./messagelist.component.css']
})
export class MessagelistComponent implements OnInit {
  messages: Message[] = []; // adjust the type to match your data structure
  userName = sessionStorage.getItem('userName');
  users : string[] = [];
  selectedReceiver = '';
  selectedReceiverIndex = 0;
  messageDetails: MessageDetails = {
    from: '',
    message: '',
  };

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.getMessage();
    setInterval(() => {
      this.getMessage();
    }, 10000); 
  }

  getMessage(){
        this.messageService.getMessages().subscribe(messages => {
      this.messages = messages;
      console.log(this.messages);
      if (this.messages.length > 0) {
        this.users = this.getReceivers();
        this.selectedReceiver = this.users[0];
      }
      console.log(this.messages);
    });

  }




  getReceivers() {
    const userName = sessionStorage.getItem('userName');
    let receivers : string[] = [];

    this.messages.forEach(message => {
      message.messages.forEach(msg => {
        if (msg.from !== userName) {
          receivers.push(msg.from);
        }
      });
    });
    receivers = [...new Set(receivers)];
    console.log(receivers);
    return receivers;
  }
  newMessage = '';

  sendMessage() {
    if (this.newMessage.trim() !== '') {
       this.messageDetails = {
        from: this.userName!,
        message: this.newMessage.trim(),
      };
  
      this.messages[this.selectedReceiverIndex].messages.push(this.messageDetails);
      this.messageService.updateMessages(this.messages[this.selectedReceiverIndex]).subscribe(); // Assuming you have a method to update messages in your service
  
      this.newMessage = '';
    }
  }
}
