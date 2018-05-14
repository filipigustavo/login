import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loginemail: string = "";
  loginpass: string = "";
  loginrepass: string = "";
  steps: number;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  testPass(): void {
    this.steps = 0;

    $(".fa-li").removeClass("active").addClass("fail");

    if (this.loginpass.length >= 6) {
      this.steps += 1;
      $(".fa-li").eq(0).removeClass("fail").addClass("active");
    }

    if (this.loginpass.match(new RegExp("[A-Z]"))) {
      this.steps += 1;
      $(".fa-li").eq(1).removeClass("fail").addClass("active");
    }

    if (this.loginpass.match(new RegExp("[0-9]"))) {
      this.steps += 1;
      $(".fa-li").eq(2).removeClass("fail").addClass("active");
    }

    $(".steps")
      .removeClass("steps1 steps2 steps3")
      .addClass("steps" + this.steps)
    .find(".step")
      .removeClass("active");

    $("#login-password")
      .removeClass("steps1 steps2 steps3")
      .addClass("steps" + this.steps);

    if (this.steps === 0 && !this.loginpass) {
      $(".fa-li").removeClass("fail");
    }

    for (let i = 0; i < this.steps; i++) {
      $(".step").eq(i).addClass("active");
    }
  }

  onSubmit() {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (!re.test(this.loginemail)) {
      alert("Preencha o email!");
      return false;
    }

    if (this.steps === 3 && this.loginpass === this.loginrepass) {
      let users = JSON.parse(localStorage.getItem("users") || "[]"),
          user = JSON.stringify({"email":this.loginemail, "senha":this.loginpass});

      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));

      alert("Cadastro realizado. Faça login com o seu usuário.");
      this.router.navigate(["/login"]);
      return true;
    }

    alert("Senha inconsistente ou verificação de senha errada!");
    return false;
  }

}
