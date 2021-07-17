import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-material-demo';
  notification = 0;

  showSpinner = false;
  opened = false;

  loadData(){
    this.showSpinner = true;
    setTimeout(()=> {
      this.showSpinner = false;
    }, 5000);
  }

  log(state: string){
    console.log(state);
  }

  logChange(index: any){
    console.log(index);
  }

  options: string[] = ['angular', 'vue', 'react'];
  objectOptions = [
    { name: 'Angular'},
    { name: 'Angular Material'},
    { name: 'React'},
    { name: 'Vue'}
  ];

  displayFn(subject: { name: any; }){
    return subject ? subject.name : undefined;
  }
}
