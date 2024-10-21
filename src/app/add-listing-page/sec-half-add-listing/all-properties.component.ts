import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-properties',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './all-properties.component.html',
  styleUrls: ['./all-properties.component.css']
})
export class AllPropertiesComponent {

  amenitiesList: string[] = [
    'Wi-Fi', 'Pool', 'Gym', 'Parking', 'Air Conditioning',
    'Heating', 'TV', 'Kitchen', 'Laundry', 'Elevator', 
    'Pet Friendly', 'Balcony', 'Garden', 'Fireplace', 'Jacuzzi'
  ];

  selectedAmenities: string[] = [];
  
  // Initialize form for Opening Hours
  openingHoursForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.openingHoursForm = this.fb.group({
      openingHours: this.fb.array(this.createTimeArray())
    });
  }

  // Function to create array for opening and closing times for each day of the week
  createTimeArray() {
    return [  { day: 'Saturday', opening: '', closing: '' },
      { day: 'Sunday', opening: '', closing: '' },
      { day: 'Monday', opening: '', closing: '' },
      { day: 'Tuesday', opening: '', closing: '' },
      { day: 'Wednesday', opening: '', closing: '' },
      { day: 'Thursday', opening: '', closing: '' },
      { day: 'Friday', opening: '', closing: '' },
    
    ];
  }

  // Getter to access FormArray for openingHours
  get openingHoursArray(): FormArray {
    return this.openingHoursForm.get('openingHours') as FormArray;
  }

  // التعامل مع التغييرات في الـ checkbox
  onCheckboxChange(event: any) {
    const amenity = event.target.value;
    if (event.target.checked) {
      this.selectedAmenities.push(amenity);
    } else {
      const index = this.selectedAmenities.indexOf(amenity);
      if (index > -1) {
        this.selectedAmenities.splice(index, 1);
      }
    }
  }

  // Handle opening and closing hours change for each day
  onOpeningHoursChange(index: number, event: any) {
    const selectedTime = event.target.value;
    this.openingHoursArray.at(index).get('opening')?.setValue(selectedTime);
  }

  onClosingHoursChange(index: number, event: any) {
    const selectedTime = event.target.value;
    this.openingHoursArray.at(index).get('closing')?.setValue(selectedTime);
  }
}
