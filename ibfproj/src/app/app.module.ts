import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './states/auth/auth.guard';
import { JwtauthService } from './services/jwtauth.service';
import { InventoryListComponent } from './inventory.list/inventory.list.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './states/auth/auth.state';
import { IngredientSearchComponent } from './ingredient-search/ingredient-search.component';
import { ProductService } from './services/product.service';
import { InventoryFormComponent } from './inventory-form/inventory-form.component';
import { productReducer } from './states/product/product.reducer';
import { HouseholdComponent } from './household/household.component';
import { HouseholdService } from './services/household.service';
import { householdReducer } from './states/household/household.reducer';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
  {
    path: 'households',
    component: HouseholdComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'inventory',
    component: InventoryListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'ingredient/search',
    component: IngredientSearchComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'inventory/add/:foodId',
    component: InventoryFormComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }, // Redirect invalid routes to /login
];

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    NavbarComponent,
    HouseholdComponent,
    InventoryListComponent,
    IngredientSearchComponent,
    InventoryFormComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot({
      auth: authReducer,
      product: productReducer,
      household: householdReducer,
    }),
  ],
  providers: [
    AuthGuard,
    CookieService,
    JwtauthService,
    ProductService,
    HouseholdService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
