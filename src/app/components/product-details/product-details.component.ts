import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/model/product";
import { ProductService } from "src/app/services/product.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"],
})
export class ProductDetailsComponent implements OnInit {
  product: Product = new Product();

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }

  handleProductDetails() {
    // get the "id" param string. convert string to a number using the + symbol
    const theProductId = +this.route.snapshot.paramMap.get("id");

    this.productService.getProduct(theProductId).subscribe((data) => {
      this.product = data;
    });
  }
}
