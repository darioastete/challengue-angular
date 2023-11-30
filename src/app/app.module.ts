import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthorIdInterceptor } from './interceptors/author-id.interceptor';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { ListProductComponent } from './pages/list-product/list-product.component';
import { DatePipe } from '@angular/common';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { ModalConfirmationComponent } from './components/modal-confirmation/modal-confirmation.component';
import { HeaderComponent } from './shared/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    PaginationComponent,
    ProductSearchComponent,
    ProductFormComponent,
    CreateProductComponent,
    EditProductComponent,
    ListProductComponent,
    CustomDatePipe,
    ModalConfirmationComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorIdInterceptor,
      multi:true
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
