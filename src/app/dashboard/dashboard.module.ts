import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { AgGridModule } from 'ag-grid-angular';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { DashboardDataComponent } from './dashboard-data/dashboard-data.component';

const routes: Routes =  [
  {path: '', component: DashboardComponent,
    children: [
      {path: '', component: DashboardDataComponent},
      {path: 'product/:id', component: ProductDetailComponent}    
    ]
  },
]


@NgModule({
  declarations: [
    DashboardComponent,
    ProductDetailComponent,
    DashboardDataComponent
  ],
  imports: [
    CommonModule,
    AgGridModule,
    RouterModule.forChild(routes)
  ], 
  exports : [
    RouterModule
  ]
})
export class DashboardModule { }
