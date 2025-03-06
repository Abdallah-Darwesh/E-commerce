import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './Core/Layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './Core/Layouts/main-layout/main-layout.component';
import { NotFoundComponent } from './Pages/Main/not-found/not-found.component';
import { SignInComponent } from './auth/Pages/sign-in/sign-in.component';
import { SignUpComponent } from './auth/Pages/sign-up/sign-up.component';
import { HomeComponent } from './Pages/Main/home/home.component';
import { ProductsComponent } from './Pages/Main/products/products.component';
import { CategoriesComponent } from './Pages/Main/categories/categories.component';
import { CartComponent } from './Pages/Main/cart/cart.component';
import { BrandsComponent } from './Pages/Main/brands/brands.component';
import { DetailsComponent } from './Pages/Main/details/details.component';
import { authGuard } from './Core/guards/auth.guard';
import { logedGuard } from './Core/guards/loged.guard';
import { ForgetPasswordComponent } from './Pages/Main/forget-password/forget-password.component';
import { AllordersComponent } from './Pages/allorders/allorders.component';
import { CheckOutComponent } from './Pages/check-out/check-out.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [logedGuard],
    children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
      { path: 'signin', component: SignInComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'forget', component: ForgetPasswordComponent },
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: HomeComponent, title: "Fresh-Cart Home" },
      { path: 'products', component: ProductsComponent, title: "Fresh-Cart Products" },
      { path: 'allorders', component: AllordersComponent, title: "Fresh-Cart Allorders" },
      { path: 'categories', component: CategoriesComponent, title: "Fresh-Cart Categories" },
      { path: 'cart', component: CartComponent, title: "Fresh-Cart Home Cart" },
      {
        path: 'checkout/:id',
        component: CheckOutComponent,
        title: "Fresh-Cart Checkout",
        data: { renderMode: 'dynamic' }  // Disables prerendering
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
        title: "Fresh-Cart Details",
        data: { renderMode: 'dynamic' }  // Disables prerendering
      },
      { path: 'brands', component: BrandsComponent, title: "Fresh-Cart Home" },
    ]
  },
  { path: '**', component: NotFoundComponent }
];
