import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginemail: string = "";
  loginpass: string = "";
  login: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    let users = JSON.parse(localStorage.getItem("users") || "[]");

    $(users).each((k,v) => {
      let user = JSON.parse(v);

      if (user.email === this.loginemail && user.senha === this.loginpass) {
        this.login = true;
      }
    });

    if (this.login === true) {
      localStorage.setItem("authenticated", 'true');
      this.router.navigate(["/home"]);
      return true;
    }

    alert("Usuário não existe!");
    return false;
  }

}
