import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyContactsComponent } from './my-contacts/my-contacts.component';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { ContactGetComponent } from './contact-get/contact-get.component';

const routes: Routes = [
	{ 
		path:'', 
		component: MyContactsComponent
	},
	{
		path: 'contact/create',
		component: ContactAddComponent
	},
	{
		path: 'edit/:id',
		component: ContactEditComponent
	},
	{
		path: 'contact',
		component: ContactGetComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
