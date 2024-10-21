import { Component, AfterViewInit } from '@angular/core';
declare let L: any; // لتعريف مكتبة Leaflet



@Component({
  selector: 'app-comercial',
  
  standalone: true,
  templateUrl: './comercial.component.html',
  styleUrls: ['./comercial.component.css']
})

export class ComercialComponent implements AfterViewInit {
  map: any;
  currentLat: number = 0;
  currentLon: number = 0;
  marker: any; // متغير لتخزين العلامة (marker)



  ngAfterViewInit(): void {
    this.map = L.map('map').setView([26.8206, 30.802498], 5); // مركز على مصر

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(this.map);

    // إضافة حدث للنقر على الخريطة لتحريك العلامة
    this.map.on('click', (e: any) => {
      this.addMarker(e.latlng.lat, e.latlng.lng);

      // تحديث حقول الإدخال للإحداثيات
      const latitudeInput = document.getElementById('latitudeInput') as HTMLInputElement;
      const longitudeInput = document.getElementById('longitudeInput') as HTMLInputElement;
      if (latitudeInput && longitudeInput) {
        latitudeInput.value = e.latlng.lat.toFixed(6);
        longitudeInput.value = e.latlng.lng.toFixed(6);
      }

      // استدعاء geocoding للحصول على معلومات المدينة والمحافظة والرمز البريدي
      this.reverseGeocode(e.latlng.lat, e.latlng.lng);
    });
  }

  // دالة للحصول على الموقع الحالي عند الضغط على الزر
  // دالة للحصول على الموقع الحالي عند الضغط على الزر
getCurrentLocation(): void {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.currentLat = position.coords.latitude;
        this.currentLon = position.coords.longitude;

        console.log(`Latitude: ${this.currentLat}, Longitude: ${this.currentLon}`);

        // تحديث حقل المدينة الأولي بموقع المستخدم
        const startCityInput = document.getElementById('startCity') as HTMLInputElement;
        if (startCityInput) {
          startCityInput.value = "Current Location";
        }

        // تعيين المركز
        this.map.setView([this.currentLat, this.currentLon], 13);
        
        // إضافة العلامة للموقع الحالي فقط إذا لم تكن موجودة بالفعل
        if (!this.marker) {
          this.addMarker(this.currentLat, this.currentLon, "You are here!");
        } else {
          // إذا كانت العلامة موجودة، فقط قم بتحديث موقعها
          this.marker.setLatLng([this.currentLat, this.currentLon]).bindPopup("You are here!").openPopup();
        }

        // استدعاء reverse geocoding للحصول على معلومات الموقع
        this.reverseGeocode(this.currentLat, this.currentLon).then(() => {
          // تحديث حقول الإدخال الخاصة بالإحداثيات
          const latitudeInput = document.getElementById('latitudeInput') as HTMLInputElement;
          const longitudeInput = document.getElementById('longitudeInput') as HTMLInputElement;

          if (latitudeInput && longitudeInput) {
            latitudeInput.value = this.currentLat.toFixed(6);
            longitudeInput.value = this.currentLon.toFixed(6);
          }
        });
      },
      error => {
        console.error("Geolocation error:", error);
        this.handleGeolocationError(error);

        // تعيين إحداثيات افتراضية في حالة وجود خطأ
        this.currentLat = 26.8206; // إحداثيات لمصر
        this.currentLon = 30.802498; // إحداثيات لمصر
        this.map.setView([this.currentLat, this.currentLon], 5);
      },
      {
        timeout: 10000, // تعيين مهلة للحصول على الموقع
        enableHighAccuracy: true, // تحسين دقة الحصول على الموقع
        maximumAge: 0 // لا تستخدم بيانات قديمة
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

  // دالة لإضافة علامة على الخريطة
 // تعديل دالة لإضافة علامة على الخريطة
private addMarker(lat: number, lon: number, message: string = ''): void {
  if (this.marker) {
    this.map.removeLayer(this.marker); // إزالة العلامة السابقة إن وجدت
  }

  // إنشاء أيقونة مخصصة
  const customIcon = L.icon({
    iconUrl: '.././../assets/location__2_-removebg-preview.png', // رابط صورة الأيقونة المخصصة
    iconSize: [35, 35], // حجم الأيقونة (عرض، ارتفاع)
    iconAnchor: [20, 40], // مكان تثبيت الأيقونة بالنسبة للإحداثيات
    popupAnchor: [0, -40] // مكان ظهور النافذة المنبثقة بالنسبة للماركر
  });

  // إضافة الماركر باستخدام الأيقونة المخصصة
  this.marker = L.marker([lat, lon], { icon: customIcon }).addTo(this.map)
    .bindPopup(message || `Latitude: ${lat.toFixed(6)}, Longitude: ${lon.toFixed(6)}`)
    .openPopup();
}

  // دالة لمعالجة أخطاء الموقع
  private handleGeolocationError(error: GeolocationPositionError): void {
    console.error('Geolocation error:', error);
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("Permission denied. Please allow access to your location.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get your location timed out.");
        break;
      default:
        alert("An unknown error occurred while retrieving your location.");
        break;
    }
  }

  // دالة geocoding العكسي
// دالة لتحويل الحقول إلى قابلة للتعديل
private enableEditInputs(): void {
  const cityInput = document.getElementById('cityInput') as HTMLInputElement;
  const governorateInput = document.getElementById('governorateInput') as HTMLInputElement;
  const zipCodeInput = document.getElementById('zipCodeInput') as HTMLInputElement;

  // تعيين الحقول كـ readonly عند البدء
  cityInput.readOnly = true;
  governorateInput.readOnly = true;
  zipCodeInput.readOnly = true;

  // تمكين التعديل على الحقول إذا كانت القيم الافتراضية
  if (cityInput.value === 'Enter Your City') {
    cityInput.readOnly = false;
  }

  if (governorateInput.value === 'Enter Your Governorate') {
    governorateInput.readOnly = false;
  }

  if (zipCodeInput.value === 'Enter Your ZIP Code') {
    zipCodeInput.readOnly = false;
  }
}

// استدعاء هذه الدالة بعد تحديث الحقول في دالة reverseGeocode
async reverseGeocode(lat: number, lon: number): Promise<void> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`;
  
    try {
        const response = await fetch(url);
        const data = await response.json();
        const cityInput = document.getElementById('cityInput') as HTMLInputElement;
        const governorateInput = document.getElementById('governorateInput') as HTMLInputElement;
        const zipCodeInput = document.getElementById('zipCodeInput') as HTMLInputElement;
        const addressInput = document.getElementById('addressInput') as HTMLInputElement;

        if (data.address) {
            const city = data.address.city || data.address.town || data.address.village || data.address.suburb || '';
            const governorate = data.address.state || data.address.region || '';
            const country = data.address.country || ''; // الحصول على اسم الدولة

            // تحديث حقول الإدخال
            if (cityInput) cityInput.value = city || 'Enter Your City';
            if (governorateInput) governorateInput.value = governorate || 'Enter Your Governorate';
            if (zipCodeInput) zipCodeInput.value = data.address.postcode || 'Enter Your ZIP Code';
            if (addressInput) addressInput.value = data.display_name; // تحديث حقل العنوان

            // تمكين التعديل على الحقول
            this.enableEditInputs();

            // إضافة العلامة مع الرسالة المناسبة
            this.addMarker(lat, lon, `${city}, ${governorate}`); // تعديل الرسالة
        }
    } catch (error) {
        console.error('Error during reverse geocoding:', error);
    }
}

  // دالة geocoding
// دالة geocoding
// دالة geocoding
async geocodeAddress(): Promise<void> {
  const addressInput = document.getElementById('addressInput') as HTMLInputElement;
  const address = addressInput.value;

  if (!address) {
    alert("Please enter an address.");
    return;
  }

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&addressdetails=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.length > 0) {
      const firstResult = data[0];

      const cityInput = document.getElementById('cityInput') as HTMLInputElement;
      const governorateInput = document.getElementById('governorateInput') as HTMLInputElement;
      const zipCodeInput = document.getElementById('zipCodeInput') as HTMLInputElement;
      const latitudeInput = document.getElementById('latitudeInput') as HTMLInputElement;
      const longitudeInput = document.getElementById('longitudeInput') as HTMLInputElement;

      // تحديث حقول الإدخال
      if (cityInput) cityInput.value = firstResult.address.city || firstResult.address.town || firstResult.address.village || 'Enter Your City';
      if (governorateInput) governorateInput.value = firstResult.address.state || firstResult.address.region || 'Enter Your Governorate';
      if (zipCodeInput) zipCodeInput.value = firstResult.address.postcode || 'Enter Your ZIP Code';

      // تحديث حقول الإحداثيات
      if (latitudeInput) latitudeInput.value = firstResult.lat; // تحديث خط العرض
      if (longitudeInput) longitudeInput.value = firstResult.lon; // تحديث خط الطول

      // إضافة العلامة مع الرسالة المناسبة
      this.addMarker(firstResult.lat, firstResult.lon, firstResult.display_name);
      
      // تعيين المركز للخريطة
      this.map.setView([firstResult.lat, firstResult.lon], 13);
    } else {
      alert("No results found for the entered address.");
    }
  } catch (error) {
    console.error('Error during geocoding:', error);
  }
}



}