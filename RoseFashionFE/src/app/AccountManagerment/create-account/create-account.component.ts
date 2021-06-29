import { Component, OnInit } from '@angular/core';

import { UserModel, MessageModel } from 'src/app/Shared/model';
//Validator
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { identityRevealedValidator } from './confirm';
import { UserService } from 'src/app/Shared/user-service';
import { MessageService } from 'src/app/Shared/message-service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  classForm: FormGroup; //Validator
  public user: UserModel[];
  public showMessage;
  vaCate = { fullname: '', email: '', passwork: '', confirmpass: '' };

  constructor(private userservice: UserService,
    private formBuilder: FormBuilder,
    private messageService: MessageService) { }

  ngOnInit() {
    //Validators
    this.classForm = new FormGroup({
      'fullname': new FormControl(this.vaCate.fullname, [
        Validators.required
      ]),
      'email': new FormControl(this.vaCate.email, [
        Validators.required,
        Validators.email
      ]),
      'passwork': new FormControl(this.vaCate.passwork, [
        Validators.required,
        Validators.minLength(6)
      ]),
      'confirmpass': new FormControl(this.vaCate.confirmpass,
        Validators.required)


    }, { validators: identityRevealedValidator }
    );
    /*
    this.classForm = this.formBuilder.group({
      username: ['', Validators.required],
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passwork: ['', [Validators.required, Validators.minLength(6)]],
      confirmpass: ['', Validators.required]
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  */
  }

  // Validators

  get fullname() { return this.classForm.get('fullname'); }
  get email() { return this.classForm.get('email'); }
  get passwork() { return this.classForm.get('passwork'); }
  get confirmpass() { return this.classForm.get('confirmpass'); }
  //add new category
  creatAccount(FullName: string, Email: string, Password: string): void {
    var creAccount: UserModel;
    var msg: MessageModel = { Title: "Thông báo", Content: "" };
    creAccount = { FullName, Email, Password } as UserModel
    this.userservice.Register(creAccount).toPromise()
      .then(result => {
        msg.Content = 'Đăng ký thành công.';
        this.messageService.SendMessage(msg);
      })
      .catch(error => {
        msg.Content = 'Đăng ký thất bại.';
        this.messageService.SendMessage(msg);
      });

  }

}
