import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/services/product.service";
import { Product } from "src/app/model/product";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit {
  products: Product[];
  currentCategoryId: number;
  currentCategoryName: string;
  searchMode: boolean;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has("keyword");
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get("keyword");

    // now search for the products using that keyword
    this.productService.searchProducts(theKeyword).subscribe((data) => {
      this.products = data;
    });
  }

  handleListProducts() {
    // check if "id" paramater is avaliable
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has("id");

    if (hasCategoryId) {
      // get the category id and convert the string to a number
      this.currentCategoryId = +this.route.snapshot.paramMap.get("id");

      // get the "name" param string
      this.currentCategoryName = this.route.snapshot.paramMap.get("name");
    } else {
      // default category id
      this.currentCategoryId = 1;
      this.currentCategoryName = "Books";
    }

    // now get the products for the given category id
    this.productService
      .getProductList(this.currentCategoryId)
      .subscribe((data) => {
        this.products = data;
      });
  }
}
