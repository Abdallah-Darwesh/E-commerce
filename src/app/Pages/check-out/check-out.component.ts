import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { OrdersService } from '../../Core/Services/orders/orders.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-check-out',
  // If you use Angular 14+ standalone components, the following line works;
  // otherwise include this component in a module and declare ReactiveFormsModule there.
  imports: [ReactiveFormsModule],
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  cartId!: string;
  checkOutForm!: FormGroup;
  private formBuilder = inject(FormBuilder);
  private activatedRoute = inject(ActivatedRoute);
  private ordersService = inject(OrdersService);

  ngOnInit(): void {
    this.initForm();
    this.getCartId();
  }

  initForm(): void {
    this.checkOutForm = this.formBuilder.group({
      details: [null, Validators.required],
      phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city: [null, Validators.required]
    });
  }

  getCartId(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.cartId = params.get('id')!;
      console.log('Cart ID:', this.cartId);
    });
  }

  submitForm(): void {
    if (this.checkOutForm.invalid) {
      console.log('Form is invalid');
      return;
    }
    console.log('Form Data:', this.checkOutForm.value);

    this.ordersService.checkOutPayment(this.cartId, this.checkOutForm.value).subscribe({
      next: response => {
        console.log('API Response:', response);
        if (response.status === 'success' && response.session?.url) {
          // Redirect to the payment session URL.
          window.open(response.session.url, '_self');
        } else {
          console.error('Invalid response format or unsuccessful status.');
        }
      },
      error: err => {
        console.error('API Error:', err);
      }
    });
  }
}
