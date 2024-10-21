import { Component ,OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-gbr-profile-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gbr-profile-edit.component.html',
  styleUrl: './gbr-profile-edit.component.css',
})
export class GbrProfileEdit implements OnInit {
  name: any[] = [];
  constructor(private _DataService: DataService) {}

 
  ngOnInit(): void {
      this._DataService.getownername().subscribe((x:any) => {
      this.name = x;
      console.log(this.name);

    })}
}
