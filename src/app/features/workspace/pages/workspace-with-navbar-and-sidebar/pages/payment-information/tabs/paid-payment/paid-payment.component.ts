import { Component } from '@angular/core';
import { RestApiService } from '../../../../../../../../core/services';

@Component({
  selector: 'app-paid-payment',
  templateUrl: './paid-payment.component.html',
  styleUrl: './paid-payment.component.scss'
})
export class PaidPaymentComponent {


  constructor(
    private restApiService: RestApiService
  ) {

  }

  // /transaction-history/get-payment
}
