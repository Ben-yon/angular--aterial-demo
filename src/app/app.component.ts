import { PeriodElements } from './elements';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  constructor(private snackBar: MatSnackBar, public dialog: MatDialog){}

  title = 'angular-material-demo';
  notification = 0;

   myControl = new FormControl();
   filteredOptions!: Observable<string[]>;

   @ViewChild(MatSort) sort!: MatSort;
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   ngOnInit(){
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
   }
   ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
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

  openDialog(){
    let dialogRef = this.dialog.open(DialogExampleComponent, {data: { name: 'Marvelous'}});

    dialogRef.afterClosed().subscribe( result => {
      console.log(`Dialog result: ${result}`)
    })
  }
   ELEMENT_DATA: PeriodElements[] = [
      {position: 1, name:'Hydrogen', weight: 1.00079, symbol:'H'},
      {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
      {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
      {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
      {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
      {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
      {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
      {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
      {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
      {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  logData(row: { name: string}){
    console.log(row.name);
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}


@Component({
  selector: 'custom-snackbar',
  template: `<span style="color: orange">Custom Snackbar</span>`
})

export class CustomSnackBarComponent{}
