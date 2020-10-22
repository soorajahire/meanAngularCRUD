import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HttpService } from './service/http.service';
import { UserListComponent } from './components/user-list/user-list.component';

const appRoutes: Routes = [
    {path : '**' , component : UserListComponent}
]


@NgModule({
  imports: [ RouterModule.forRoot(appRoutes)],
  exports : [RouterModule]
})
export class AppRoutingModule { }
