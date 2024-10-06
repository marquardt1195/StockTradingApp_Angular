import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor( private toastr: ToastrService) { }
  public showToastSuccess(mode: String) {
    if (mode == 'editLeg') {
      this.toastr.success('Transaction updated successfully');
    }
    else if (mode == 'removeLeg') {
      this.toastr.success('Transaction removed successfully');
    }
    else if (mode == 'initiate') {
      this.toastr.success('Trade initiated successfully');
    }
    else if (mode == 'removeTrade') {
      this.toastr.success('Trade deleted successfully');
    }
    else if (mode == 'addLeg') {
      this.toastr.success('Trade leg added successfully');
    }
    else if (mode == 'reduceLeg') {
      this.toastr.success('Trade reduced successfully');
    }
  }

  public showToastError(mode: String) {
    if (mode == 'editLeg') {
      this.toastr.error('Error updating transaction');
    }
    else if (mode == 'removeLeg') {
      this.toastr.error('Error removing transaction');
    }
    else if (mode == 'initiate') {
      this.toastr.error('Error initiating new trade');
    }
    else if (mode == 'removeTrade') {
      this.toastr.error('Error deleting trade');
    }
    else if (mode == 'addLeg') {
      this.toastr.error('Error adding leg to trade');
    }
    else if (mode == 'reduceLeg') {
      this.toastr.error('Error reducing trade');
    }
  }
}
