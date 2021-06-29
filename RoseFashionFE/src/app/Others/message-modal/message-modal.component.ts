import { Component, OnInit, Input } from '@angular/core';
import { MessageModel } from 'src/app/Shared/model';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.css']
})
export class MessageModalComponent implements OnInit {

  static hiddenbutton: HTMLElement;
  static globalmessage: MessageModel = { Title: '', Content: ''};
  message: MessageModel = new MessageModel();
  
  constructor() { }
  ngOnInit() {
    MessageModalComponent.hiddenbutton = document.getElementById('hiddenbtn') as HTMLElement;
  }

  getMessage(){
    this.message.Title = MessageModalComponent.globalmessage.Title;
    this.message.Content = MessageModalComponent.globalmessage.Content;
  }
}
