const services = {
    cut: [
        { name: "Cut (Shampoo & Blow Dry)", duration: "1hr", price: 70, description: "Professional haircut with shampoo and blow dry service" },
        { name: "Cut (Bangs / Face Layers)", duration: "38min", price: 20, description: "Precision cutting for bangs and face-framing layers" }
    ],
    color: [
        { name: "Single Color (Full Head)", duration: "1hr", price: 80, description: "Full head single color application" },
        { name: "Multi Color (Bleach)", duration: "2-3hr", price: 220, description: "Creative multi-color bleaching technique" },
        { name: "Highlights/Lowlights (Full Head)", duration: "2-3hr", price: 250, description: "Dimensional highlighting/lowlighting service" }
    ],
    treatment: [
        { name: "Rejuvenating Treatment", duration: "38min", price: 50, description: "Hair rejuvenation therapy" },
        { name: "Cold Wave Perm", duration: "1hr", price: 90, description: "Natural-looking wave perm" },
        { name: "Straight Perm", duration: "2hr", price: 280, description: "Permanent straightening treatment" }
    ]
};


document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;
    
    if (path.includes('services.html')) initializeServices();
    else if (path.includes('book.html')) initializeBooking();
    else if (path.includes('team.html')) initializeTeam();
});

function initializeServices() {
    const menuContainer = document.getElementById('serviceMenu');
    if (!menuContainer) return;

    let html = '';
    for (const [category, items] of Object.entries(services)) {
        html += `
            <div class="service-category">
                <h3>${category}</h3>
                ${items.map(service => `
                    <div class="service-item">
                        <input type="checkbox" class="service-checkbox">
                        <div class="service-details">
                            <h4>${service.name}</h4>
                            <p class="service-description">${service.description}</p>
                        </div>
                        <div class="service-meta">
                            <span class="service-duration">${service.duration}</span>
                            <span class="service-price">$${service.price}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    html += `
        <div class="book-btn-container">
            <a href='book.html' class="book-btn">BOOK APPOINTMENT</a>
        </div>
    `;

    menuContainer.innerHTML = html;
}

function initializeBooking() {
    initializeCalendar();
    initializeAvailability();
}

function initializeCalendar() {
    const calendarContainer = document.getElementById('calendar');
    if (!calendarContainer) return;

    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    let html = `
        <div class="calendar-header">
            <button class="prev-month">&lt;</button>
            <h3>${monthNames[month]} ${year}</h3>
            <button class="next-month">&gt;</button>
        </div>
        <div class="calendar-grid">
            <div>Mo</div><div>Tu</div><div>We</div><div>Th</div>
            <div>Fr</div><div>Sa</div><div>Su</div>
    `;

    for (let i = 0; i < firstDay; i++) {
        html += '<div class="calendar-day disabled"></div>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
        html += `<div class="calendar-day ${day === date.getDate() ? 'active' : ''}">${day}</div>`;
    }

    html += '</div>';
    calendarContainer.innerHTML = html;
}

function initializeAvailability() {
    const availabilityContainer = document.getElementById('availability');
    if (!availabilityContainer) return;

    const stylists = ['Julian', 'Fabrizio', 'Nick', 'Albert'];
    const timeSlots = ['1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'];

    let html = `
        <h3>Stylist Availability</h3>
        <table class="availability-table">
            <thead>
                <tr>
                    <th>Time</th>
                    ${stylists.map(stylist => `<th>${stylist}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
                ${timeSlots.map(time => `
                    <tr>
                        <td>${time}</td>
                        ${stylists.map(() => '<td></td>').join('')}
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    availabilityContainer.innerHTML = html;
}

function initializeTeam() {
    const teamContainer = document.getElementById('teamGrid');
    if (!teamContainer) return;

    const teamMembers = {'Julian': ['https://www.modzik.com/wp-content/uploads/2014/03/julian-casablancas-ns-2013.jpg', 'A master of precision cutting and styling, Julian specializes in creating edgy, rockstar-inspired looks. With over 10 years of experience, he’s known for his artistic approach to hairstyling.'],
                         'Fabrizio': ['https://i.pinimg.com/736x/8a/99/61/8a9961072ac043149ac0fc271e6647ed.jpg', 'The color expert of the team, Fabrizio has a keen eye for vibrant hues and natural blends. Whether it’s balayage, ombre, or bold creative colors, he knows how to make every client shine.'],
                         'Nick': ['https://www.nme.com/wp-content/uploads/2016/09/NickValensiStrokesPA270111.jpg', 'Nick is the go-to stylist for classic and modern cuts. With a background in high-fashion hairstyling catered to both men\'s and women\'s styles, he ensures every client leaves with a polished and confident look.'],
                         'Albert': ['https://www.nme.com/wp-content/uploads/2016/09/AlbertHammondJrStrokesPMVH090311-1.jpg','With a passion for hair treatments and perms, Albert brings hair back to life. From deep-conditioning treatments to flawless perms, he transforms hair with precision and care.']};
    
    const html = Object.entries(teamMembers).map(([member, [imgSrc,description]]) => `
    <div class="team-member">
        <img src="${imgSrc}" alt="${member}">
        <h3>${member}</h3>
        <p>${description}</p>
    </div>
    `).join('');


    teamContainer.innerHTML = html;
}