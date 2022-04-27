import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyContactsComponent } from './my-contacts/my-contacts.component';

const routes: Routes = [
	{ 
		path:'', 
		component: MyContactsComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
