import { NgModule } from '@angular/core';
import { MatButtonModule} from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

const materialComponents = [
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule
];

@NgModule({
  imports: [materialComponents],
  exports: [materialComponents]
})
export class MaterialModule { }
