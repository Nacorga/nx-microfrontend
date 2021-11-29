import { loadRemoteModule } from "@angular-architects/module-federation-runtime";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    outlet: 'header',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4303/remoteEntry.js',
        remoteName: 'header',
        exposedModule: './Module',
      }).then((m) => m.AppModule),
  },
  {
    path: '',
    outlet: 'footer',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4304/remoteEntry.js',
        remoteName: 'footer',
        exposedModule: './Module',
      }).then((m) => m.AppModule),
  },
  {
    path: 'products',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4302/remoteEntry.js',
        remoteName: 'products',
        exposedModule: './Module',
      }).then((m) => m.AppModule),
  },
  {
    path: 'cart',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4301/remoteEntry.js',
        remoteName: 'cart',
        exposedModule: './Module',
      }).then((m) => m.AppModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' } )],
  exports: [RouterModule]
})

export class AppRoutingModule { }