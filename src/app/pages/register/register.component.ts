import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-register',
  imports: [ButtonModule,ReactiveFormsModule,FormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, SelectModule, InputNumberModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
name !:FormControl
email !:FormControl
password !:FormControl
confirmPassword !:FormControl
registrationForm !:FormGroup
constructor() {
  this.initFormControls();
  this.initFormGroup();
}
initFormControls(): void{
    this.name = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.confirmPassword = new FormControl('', [Validators.required, Validators.minLength(6), this.passwordMatchValidator(this.password)]);
  }
  initFormGroup(): void {
    this.registrationForm = new FormGroup({
      name : this.name,
      email : this.email,
      password : this.password,
      confirmPassword : this.confirmPassword
    });
  }
  passwordMatchValidator(pass : AbstractControl): ValidatorFn {
    return (confirmPass: AbstractControl) : { [key: string]: boolean } | null => {
      const password = pass.value;
      const confirmPassword = confirmPass.value;
      return password !== confirmPassword ?{ passwordNotMismatch: true } : null;
    }
    
  }
}
