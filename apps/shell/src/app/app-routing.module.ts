import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: 'cart',
    loadChildren: () => import('cart/Module' as string).then((m) => m.AppModule),
  },
  {
    path: 'products',
    loadChildren: () => import('products/Module' as string).then((m) => m.AppModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' } )],
  exports: [RouterModule]
})

export class AppRoutingModule { }