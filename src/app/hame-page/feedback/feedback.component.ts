import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
 import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule,SlickCarouselModule],
 
templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
slides = [
  {img:"../../../assets/images/05-12-21-happy-people.jpg"},
  {img:"../../../assets/images/تنزيل.jfif"},
  {img:"../../../assets/images/تنزيل (1).jfif"},
  {img:"../../../assets/images/how-to-stop-being-a-people-pleaser-1_1.jpg"},
  {img:"../../../assets/images/businessman-isolated-illustration-ai-generative-free-photo.jpg"},
  {img:"../../../assets/images/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"},
  {img:"../../../assets/images/05-12-21-happy-people.jpg"},
  {img:"../../../assets/images/تنزيل.jfif"},
  {img:"../../../assets/images/تنزيل (1).jfif"},
  {img:"../../../assets/images/how-to-stop-being-a-people-pleaser-1_1.jpg"},
  {img:"../../../assets/images/businessman-isolated-illustration-ai-generative-free-photo.jpg"},
  {img:"../../../assets/images/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"}
];
names = [
  {person: "Amr Hassan"},
  {person: "Ali Fahmy"},
  {person: "Karim Hamdy"},
  {person: "Noor Emad"},
  {person: "Shady Fathy"},
  {person: "Hany Sami"},
  {person: "Hassan Kamel"},
  {person: "Adel Morsy"},
  {person: "Ramy Shawky"},
  {person: "Sameh Khalil"},
  {person: "Magid Farid"},
  {person: "Mickel Jorden"}
];

comments = [
  { comment: "Mapify is honestly amazing, it always helps me find nearby services easily. It's user-friendly and saves a lot of time. I'm really happy with the experience and recommend everyone to try it!" },
  { comment: "All I can say is that Mapify is the best site for finding services. The information is accurate and fast, and it helps me choose the places I need without any hassle. I will definitely keep using it!" },
  { comment: "The site is truly great, and the services available are very diverse. I found new places that I didn't know about before. The interface is easy to use, so a big thank you to the developers!" },
  { comment: "Since I started using Mapify, I no longer need to waste time searching for services. Everything is in one place, and the options are clear and easy. Truly an excellent experience!" },
  { comment: "Mapify has really helped me a lot, it makes finding services easy and hassle-free. The information it provides is accurate and helps me in my choices. I recommend it to everyone I know!" },
  { comment: "Honestly, Mapify is an outstanding site. It gives me all the information I need in seconds. The interface is simple and organized, allowing me to view all the nearby services easily." },
  { comment: "To be honest, Mapify has changed my experience in searching for services. Everything I need is there, and with a single click, I can find it. The design is simple and organized, making it easy to use." },
  { comment: "Mapify always helps me discover new places and provides me with accurate information about services. The user experience is very enjoyable, and the time spent searching is significantly reduced." },
  { comment: "Mapify is the best choice for me when searching for local services, as it provides all the information I need in an organized way. The design is easy to use and allows me to access options effortlessly." },
  { comment: "Mapify is an amazing app that makes life easier when finding services. Thanks to the reviews and ratings, I can choose places that meet my needs. It's really a reliable source for service searching." },
  { comment: "Honestly, Mapify has changed my experience in searching for services. Everything I need is available, and with a click, I can find it. The design is also simple and organized, making it easy to use." },


{ comment: "Thanks to Mapify, I no longer waste time searching for services. It provides accurate information and saves me a lot of effort. I highly recommend it to anyone looking for nearby options!" }
];

slideConfig = {
  "slidesToShow": 3,
  "slidesToScroll": 1,
  "autoplay": true,
  "autoplaySpeed": 5000,
  "pauseOnHover": true,
  "arrows": false,
  "dots": true,
  "infinite": true,
  "responsive": [
    {
      "breakpoint": 992,
      "settings": {
        "arrows": false,
        "infinite": true,
        "slidesToShow": 2,
        "dots": true,
        "slidesToScroll": 1
      }
    },
    {
      "breakpoint": 768,
      "settings": {
        "arrows": false,
        "dots": true,
        "infinite": true,
        "slidesToShow": 1,
        "slidesToScroll": 1
      }
    }
  ]
};


ngAfterViewInit(): void {
  const sliderContainer = document.querySelector('.slider-container') as HTMLElement;
  const prevButton = document.querySelector('.prev') as HTMLElement;
  const nextButton = document.querySelector('.next') as HTMLElement;

  // إظهار الأزرار عند مرور الماوس على السلايدر
  sliderContainer.addEventListener('mouseenter', () => {
    prevButton.style.opacity = '1';
    prevButton.style.visibility = 'visible';
    nextButton.style.opacity = '1';
    nextButton.style.visibility = 'visible';
  });

  // إخفاء الأزرار عند خروج الماوس
  sliderContainer.addEventListener('mouseleave', () => {
    prevButton.style.opacity = '0';
    prevButton.style.visibility = 'hidden';
    nextButton.style.opacity = '0';
    nextButton.style.visibility = 'hidden';
  });
}
}