import { Component} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { Message} from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { AuthService } from '../../core/service/auth.service';
import { IRegister } from '../../core/interfaces/iregister';
import { CALC_REGEX } from '@primeng/themes';

@Component({
  selector: 'app-register',
  imports: [PasswordModule,ButtonModule,ReactiveFormsModule,FormsModule, InputGroupModule, InputGroupAddonModule, Message,InputTextModule, SelectModule, InputNumberModule,Toast],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
username !:FormControl
email !:FormControl
password !:FormControl
confirmPassword !:FormControl
registrationForm !:FormGroup

   
constructor(private _authService:AuthService,private messageService: MessageService) {
  this.initFormControls();
  this.initFormGroup();
}
initFormControls(): void{
    this.username = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.confirmPassword = new FormControl('', [Validators.required, Validators.minLength(6), this.passwordMatchValidator(this.password)]);
  }
  initFormGroup(): void {
    this.registrationForm = new FormGroup({
      username : this.username,
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
  submitForm(): void {
    if (this.registrationForm.valid) {
      this.regitrationAPI(this.registrationForm.value); // Call the API with the form data
      
      // Here you can handle the form submission, e.g., send data to a server
    } else {
      this.registrationForm.markAllAsTouched(); // Mark all controls as touched to show validation errors
      Object.keys(this.registrationForm.controls).forEach(control => this.registrationForm.controls[control].markAsDirty()); // Mark all controls as dirty to show validation errors
      console.log('Form is invalid');
    }
  }
  regitrationAPI(data : IRegister): void {
    this._authService.register(data).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        if (response._id) {
        this.show('success', 'Success', 'تم حفظ البيانات بنجاح');
        }
      },
      error: (err) =>{
        console.error('Registration failed', err.error.error);
        this.show('error', 'Error', err.error.error);
      }
    });
  }
  show(severity: string , summary: string, detail: string)
  {
    this.messageService.add({ severity: severity, summary: summary, detail: detail, life: 3000 });
  }
}
