import { Component, OnInit } from '@angular/core';
import { UserModel, MessageModel } from 'src/app/Shared/model';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Shared/user-service';
import { MessageService } from 'src/app/Shared/message-service';


@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {

  user: UserModel = new UserModel();
  users: UserModel[];
  idUser: string;
  validphone: boolean = true;

  constructor(private userService: UserService,  private location: Location,
    private messageService: MessageService) { }

   ngOnInit() {
    var x = this.userService.getCurrentUser();
    this.idUser=x.UserID;
    this.getAccountByEmail();
  }

  getAccountByEmail(): void {
    this.userService.GetAccountByID(this.idUser).toPromise().then(user => this.user = user);
 
  }
  save(): void {
    console.log(this.user);
      this.userService.UpdateAccount(this.user).toPromise()
      .then(result =>{
        var msg: MessageModel = {Title:"Thông báo", Content: "Cập nhật thông tin thành công."};
        this.messageService.SendMessage(msg);
      }).catch(err =>{
        var msg: MessageModel = {Title:"Thông báo", Content: "Đã có lỗi xảy ra."};
        this.messageService.SendMessage(msg);
      });
    }
  goBack(): void {
      this.location.back();
    }
  
  CheckingPhoneNumber(){
    if(this.user.Phone=='') return;
    var regex = ['0','1','2','3','4','5','6','7','8','9'];
    if(this.user.Phone.length!=10){
      this.validphone = false;
    }
    else
    { 
      for(var i=0;i<10;i++){
        if(!regex.indexOf(this.user.Phone[i])) {
          this.validphone = false;
          break;
        }
      }
      this.validphone = true
    }
  }  
}
