import { EmployerService } from './../services/employer.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployerComponent } from '../add-employer/add-employer.component';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.css']
})
export class EntrepriseComponent implements OnInit {


  entrepriseData! : any
  constructor(private dialog: MatDialog, private employerService: EmployerService,) { }

  displayColums: string[] = ["id", "name", "empcount", "revenue", "address", "isactive", "action"]

  ngOnInit(): void {

    this.getEmploye()
  }

  openDialogCreate(id: any) {

   const _dialog = this.dialog.open(AddEmployerComponent,{
      width: '500px',
      data:{
        id:id
      }
    })

    _dialog.afterClosed().subscribe(res => {

        this.getEmploye()
    })
  }

  getEmploye() {
    this.employerService.getAllEmployer()
    .subscribe(response => {
      this.entrepriseData = response;
      console.log(this.entrepriseData);


    });
  }

  editEmploye(id:any){
    this.openDialogCreate(id)
  }


  removeEmploye(id:any){


    this.employerService.removeEmploye(id)
    .subscribe(response => {

      this.getEmploye()

      Swal.fire(
        'Supprimer!',
        'Employe supprimé avec success.',
        'success'
      )

    })



  }



  alertQuestionMethod(id:any){

    Swal.fire({
      title: '',
      text: "Voulez-vous supprimer ??",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Anuler',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.removeEmploye(id)
      }
    })
  }
}
