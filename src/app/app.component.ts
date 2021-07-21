import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private snackBar: MatSnackBar){}

  title = 'angular-material-demo';
  notification = 0;

   myControl = new FormControl();
   filteredOptions!: Observable<string[]>;

   ngOnInit(){
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
   }

   private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
   }

  showSpinner = false;
  opened = false;
  minDate = new Date();
  maxDate = new Date(2019, 3, 10);

  dateFilter = (date: any) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  }
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

  openSnackbar(message: string, action: string){
    let snackBarRef = this.snackBar.open(message, action, {duration: 2000});
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('the snackbar was dismissed');
    })
    snackBarRef.onAction().subscribe(() => {
      console.log("action");
    })
  }
  openCustomSnackBar(){
    this.snackBar.openFromComponent(CustomSnackBarComponent, {duration: 2000});
  }

}


@Component({
  selector: 'custom-snackbar',
  template: `<span style="color: orange">Custom Snackbar</span>`
})

export class CustomSnackBarComponent{}
