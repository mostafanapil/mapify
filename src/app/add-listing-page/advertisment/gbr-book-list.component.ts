import { Component,OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-gbr-book-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gbr-book-list.component.html',
  styleUrl: './gbr-book-list.component.css',
})
export class GbrBookListComponent implements OnInit {
  lists: any[] = [];
  constructor(private _DataService: DataService) {}

  ngOnInit(): void {
    this._DataService.getownerinfo().subscribe((x) => {
      this.lists = x;
      console.log(this.lists);

    })

}
}
