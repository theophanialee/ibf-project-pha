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
import { StoreModule } from '@ngrx/store';
import { IngredientSearchComponent } from './ingredient-search/ingredient-search.component';
import { ProductService } from './services/product.service';
import { InventoryFormComponent } from './inventory-form/inventory-form.component';
import { productReducer } from './states/product/product.reducer';
import { HouseholdComponent } from './household/household.component';
import { HouseholdService } from './services/household.service';
import { householdReducer } from './states/household/household.reducer';
import { HouseholdListComponent } from './household-list/household-list.component';
import { HouseholdGuard } from './states/household/household.guard';
import { HouseholdAddComponent } from './household-add/household-add.component';
import { OneHouseholdComponent } from './one-household/one-household.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';
import { MembersAddComponent } from './members-add/members-add.component';
import { authReducer } from './states/auth/auth.reducer';
import { RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
  {
    path: 'household',
    component: HouseholdComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'household/add',
    component: HouseholdAddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'household/:householdId',
    component: OneHouseholdComponent,
    canActivate: [AuthGuard, HouseholdGuard],
  },
  {
    path: 'ingredient/search',
    component: IngredientSearchComponent,
    canActivate: [AuthGuard, HouseholdGuard],
  },
  {
    path: 'inventory/add/:foodId',
    component: InventoryFormComponent,
    canActivate: [AuthGuard, HouseholdGuard],
  },
  {
    path: 'household/members/add',
    component: MembersAddComponent,
    canActivate: [AuthGuard, HouseholdGuard],
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
    HouseholdListComponent,
    HouseholdAddComponent,
    OneHouseholdComponent,
    MembersAddComponent,
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
    MatIconModule,
  ],
  providers: [
    AuthGuard,
    CookieService,
    JwtauthService,
    ProductService,
    HouseholdService,
    HouseholdGuard,
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
