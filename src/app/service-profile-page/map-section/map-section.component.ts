import { Component, AfterViewInit } from '@angular/core';
import { DataService } from '../../data.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

declare let L: any;

@Component({
  selector: 'app-map-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-section.component.html',
  styleUrls: ['./map-section.component.css']
})
export class MapSectionComponent implements AfterViewInit {
  place: any;
  placeId: any;
  map: any;
  marker: any; // تخزين الماركر الحالي
  currentLat: number = 0;
  currentLon: number = 0;

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit() {
    this.placeId = this.route.snapshot.paramMap.get('id');
    console.log(this.placeId);

    this.dataService.getpage(this.placeId).subscribe((data) => {
      this.place = data;
      console.log(this.place);

      if (this.place && this.place.mapCoordinates) {
        // استدعاء الدالة باستخدام الإحداثيات من الحقول
        const lat = this.place.mapCoordinates.latitude;
        const lon = this.place.mapCoordinates.longitude;
        this.geocodeCoordinates(lat, lon); // جلب الإحداثيات بناءً على المدخلات
      }
    });
  }

  ngAfterViewInit(): void {
    this.map = L.map('map').setView([26.8206, 30.802498], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(this.map);

    this.map.on('click', (e: any) => {
      this.addMarker(e.latlng.lat, e.latlng.lng);
      this.reverseGeocode(e.latlng.lat, e.latlng.lng);
    });
  }

  private addMarker(lat: number, lon: number, message: string = ''): void {
    if (this.marker) this.map.removeLayer(this.marker); // إزالة الماركر السابق

    const customIcon = L.icon({
      iconUrl: '../../../assets/images/location__1_-removebg.png',
      iconSize: [35, 35],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });

    this.marker = L.marker([lat, lon], { icon: customIcon })
      .addTo(this.map)
      .bindPopup(message)
      .openPopup();
  }

  async reverseGeocode(lat: number, lon: number): Promise<void> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const city = data.address.city || data.address.town || 'Unknown';
      const street = data.address.road || 'No street available';

      const message = `${street}, ${city}`;
      this.addMarker(lat, lon, message);
    } catch (error) {
      console.error('Error during reverse geocoding:', error);
    }
  }

  async geocodeCoordinates(lat: number, lon: number): Promise<void> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.address) {
        const city = data.address.city || data.address.town || data.address.village || 'Unknown';
        const street = data.address.road || 'No street available';

        // إضافة العلامة مع العنوان والمدينة في الـ Popup
        this.addMarker(lat, lon, `${street}, ${city}`);

        // تحديث مركز الخريطة
        this.map.setView([lat, lon], 13);
      } else {
        alert('No address information found for the given coordinates.');
      }
    } catch (error) {
      console.error('Error during reverse geocoding:', error);
    }
  }
  getDirection(latitude: string, longitude: string) {
    const destination = `${latitude},${longitude}`;
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
  
   
    window.open(googleMapsUrl, '_blank');
  }
  
}
