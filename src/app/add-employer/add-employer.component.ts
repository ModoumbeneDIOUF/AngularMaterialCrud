import { EmployerService } from './../services/employer.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-employer',
  templateUrl: './add-employer.component.html',
  styleUrls: ['./add-employer.component.css']
})
export class AddEmployerComponent implements OnInit {

    editdata: any;
    showSpinner = false
    constructor(private formBuilder:FormBuilder, private dialog: MatDialog, private employerService: EmployerService, @Inject(MAT_DIALOG_DATA) public data: any ) { }

  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.employerService.getEmployebyID(this.data.id).
      subscribe(response => {
        this.editdata = response;
        this.employeForm.setValue({
          id: this.editdata.id, name: this.editdata.name, empcount: this.editdata.empcount,
          revenue: this.editdata.revenue, address: this.editdata.address, isactive: this.editdata.isactive
        });
      });
    }
  }

  employeForm = this.formBuilder.group({
    id: this.formBuilder.control({ value: '', disabled: true }),
    name: this.formBuilder.control('', Validators.required),
    empcount: this.formBuilder.control('', Validators.required),
    revenue: this.formBuilder.control('', Validators.required),
    address: this.formBuilder.control('', Validators.required),
    isactive: this.formBuilder.control(true),
  });


  alertSuccessMethode(position:any, iconName:any, title:any,){
    const Toast = Swal.mixin({
      toast: true,
      position: position,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: iconName,
      title: title
    })
  }


  saveEmployer(){

      this.showSpinner = true
      if(this.employeForm.valid){

        const editID = this.employeForm.getRawValue().id
        if(editID != '' && editID != null){
          // update
          this.employerService.updateEmployer(editID,this.employeForm.getRawValue())
          .subscribe(response => {

             this.alertSuccessMethode( "bottom-end" ,"warning", "Employe modifié avec success", )

            this.closeDialog()


             })
        }
        else{
          // save
            this.employerService.createEmployer(this.employeForm.value)
            .subscribe(response => {

             this.closeDialog()
             this.showSpinner = false
             this.alertSuccessMethode( "top-end" ,"success", "Employe ajouté avec success", )

        })
        }

      }
  }

  closeDialog(){

    this.dialog.closeAll();
  }
}
