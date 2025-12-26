/**
 * HealthTalent - Script.js
 * Handle Filters, Star Ratings, and Professional List
 */

// 1. Mock Data: Ungal UI-il ulla professionals-in data
const professionals = [
    {
        name: "Dr. Sarah Johnson",
        specialty: "Cardiology",
        location: "New York, NY",
        rating: 4.9,
        reviews: 127,
        experience: "12+ years exp",
        rate: "$200-250",
        tags: ["HEART DISEASE", "ECHOCARDIOGRAPHY"],
        image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=500"
    },
    {
        name: "Dr. Robert Williams",
        specialty: "Neurology",
        location: "Chicago, IL",
        rating: 4.7,
        reviews: 85,
        experience: "10+ years exp",
        rate: "$180-220",
        tags: ["SKIN CANCER"], // Image data-vil ulla padi
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=500"
    },
    {
        name: "Jennifer Martinez",
        specialty: "Nursing",
        location: "Chicago, IL",
        rating: 4.9,
        reviews: 189,
        experience: "8+ years exp",
        rate: "$60-80",
        tags: ["PATIENT CARE", "EMERGENCY CARE"],
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=500"
    }
];

// 2. DOM Elements
const profGrid = document.getElementById('professionals-grid');
const ratingSlider = document.getElementById('rating-range');
const ratingValueDisplay = document.getElementById('rating-value');
const applyFilterBtn = document.getElementById('apply-filters');

// 3. Star Rating Generator Function
// Intha function rating-ku thagapadi (e.g. 4.5) stars-ai generate seiyum
function generateStars(rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            // Full gold star
            starsHtml += '<i class="fa-solid fa-star text-yellow-500"></i>';
        } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
            // Half gold star
            starsHtml += '<i class="fa-solid fa-star-half-stroke text-yellow-500"></i>';
        } else {
            // Empty gray star
            starsHtml += '<i class="fa-solid fa-star text-gray-200"></i>';
        }
    }
    return starsHtml;
}

// 4. Render Professionals Card
function renderProfessionals(data) {
    profGrid.innerHTML = ''; // Clear existing cards
    
    data.forEach(prof => {
        const card = `
            <div class="bg-white overflow-hidden shadow-sm border border-gray-100 rounded-[20px] transition-transform hover:-translate-y-1">
                <img src="${prof.image}" alt="${prof.name}" class="w-full h-64 object-cover">
                <div class="p-6">
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <h3 class="text-xl font-bold">${prof.name}</h3>
                            <p class="text-blue-600 font-semibold text-sm uppercase tracking-wide">${prof.specialty}</p>
                        </div>
                        <div class="text-right">
                            <div class="star-rating text-sm">
                                ${generateStars(prof.rating)}
                            </div>
                            <span class="text-xs text-gray-400">(${prof.reviews} reviews)</span>
                        </div>
                    </div>
                    <p class="text-gray-500 text-sm mb-4">
                        <i class="fa-solid fa-location-dot mr-1"></i> ${prof.location} • ${prof.experience}
                    </p>
                    <div class="flex flex-wrap gap-2 mb-6">
                        ${prof.tags.map(tag => `<span class="bg-blue-50 text-blue-600 text-[10px] px-2 py-1 rounded-full font-bold uppercase">${tag}</span>`).join('')}
                    </div>
                    <div class="flex justify-between items-center border-t pt-4">
                        <span class="text-xl font-bold">${prof.rate}<small class="text-gray-400 font-normal">/hr</small></span>
                        <button class="bg-black text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-gray-800 transition">View Profile</button>
                    </div>
                </div>
            </div>
        `;
        profGrid.innerHTML += card;
    });
}

// 5. Filter Logic
function applyFilters() {
    const minRating = parseFloat(ratingSlider.value);
    
    const filteredData = professionals.filter(prof => {
        return prof.rating >= minRating;
    });
    
    renderProfessionals(filteredData);
}

// 6. Event Listeners
if(ratingSlider) {
    ratingSlider.addEventListener('input', (e) => {
        ratingValueDisplay.innerText = `${e.target.value} ★`;
    });
}

if(applyFilterBtn) {
    applyFilterBtn.addEventListener('click', applyFilters);
}

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    renderProfessionals(professionals);
});