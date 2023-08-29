import { ProductService } from '../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ColDef,GridApi, ColumnApi, SortOption, GridReadyEvent,
  ICellRendererParams,
  RowGroupingDisplayType} from 'ag-grid-community';
import { Router } from '@angular/router';


import 'ag-grid-enterprise';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
 private gridApi !: GridApi;
 private gridColumnApi !: ColumnApi;
 public columnDefs !: any[];
 private sortingOrder !: [];
 
 public groupDisplayType : any;

 public productData : any[] = [];

 constructor(private productService: ProductService, 
  private router: Router,
  private authService : AuthService) {
  this.columnDefs = this.createColumDefs();
  
 }

 ngOnInit(): void {
   this.productService.getAllProductData().subscribe((data:any) => {
    this.productData = data;
   })
 }

 createColumDefs(){


  return [
    {
      headerName: "Id",
      field : "id",
      width: 150,
      filter: true,  
      enableSorting: true,  
      sortable: true,
      cellRenderer: this.createHyperLink.bind(this),
      pinned : "right" 
    },

    {
      headerName: "Name",
      field : "name",
      width: 150,
      filter: true,  
      enableSorting: true,  
      sortable: true,
    //  pinned : "left" 
    },

    {
      headerName: "Type",
      field : "type",
      width: 250,
      filter: true,  
      enableSorting: true,  
      sortable: true ,
      rowGroup: true,
      hide: true 
    },

    {
      headerName: "Price",
      field : "price",
      width: 150,
      filter: true,  
      enableSorting: true,  
      sortable: true 
    },

    {
      headerName: "Units",
      field : "units",
      width: 150,
      filter: true,  
      enableSorting: true,  
      sortable: true 
    },
    {
      headerName: "Manufacturing",
      field : "manufacturing",
      width: 150,
      filter: true,  
      enableSorting: true,  
      sortable: true 
    }]
 }

//  buttonRenderer(event: any) {
//    this.router.navigate(['/product', event.data.id]); 
// }

onBtnClick2(e : any) {
  alert("sss");
}

buttonRenderer = function(params : any) {
  alert("hii");

  return '<span style="color: '+params.color+'">' + params.value + '</span>';
}
 

 onGridReady(params : any) {
    this.gridApi = params.api;
    this.gridColumnApi= params.ColumnApi;
    //this.gridApi.sizeColumnsToFit();
    //let dataValue= [{"firstName": "Gourav", "age": 22}, {"firstName": "rrr", "age": 22}]
    //params.api.setRowData(this.productData);
  }

  onRowClicked(event : any) {
    this.router.navigate(['/product', event.data.id]); 
  }

  // onCellClicked(event : any) {
  //   if(event.column.colId == "id") {
  //     this.router.navigate(['/product', event.data.id]); 
  //   } 
  // }


  onCallGold() {
    alert("ss");
    // pass in list of columns, here it's gold only
    const params = { columns: ['type'] };
    this.gridColumnApi.addRowGroupColumns(['type']);
  }

  createHyperLink(params: any) {
    if (!params.data) { return; }
    const spanElement = document.createElement('span');
    spanElement.innerHTML = `<a href="product/"${params.value} > ${params.value} </a> `;
    spanElement.addEventListener('click', ($event) => {
      $event.preventDefault();
      this.router.navigate(['dashboard/product', params.data.id]);
    });
    return spanElement;
  }

  logout() {
    this.authService.logout();
  }
}
