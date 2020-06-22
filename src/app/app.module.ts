import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppComponent } from './app.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import {HttpClientModule} from '@angular/common/http'
import { ProductService } from './services/product.service';

import {Routes , RouterModule} from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [

  {path: 'cart-details' , component: CartDetailsComponent},
  {path: 'products/:id' , component: ProductDetailsComponent},
  {path: 'search/:keyword' , component: ProductsListComponent},
  {path: 'category/:id' , component: ProductsListComponent},
  {path: 'category' , component: ProductsListComponent},
  {path: 'products' , component: ProductsListComponent},
  {path: '' , redirectTo: '/', pathMatch: 'full'},
  {path: '**' , redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    CommonModule,
    NgbModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
