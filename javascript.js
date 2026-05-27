  // Mobile Menu Toggle
        function toggleMenu() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            
            if (navLinks.style.display === 'flex') {
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = 'white';
                navLinks.style.flexDirection = 'column';
                navLinks.style.padding = '2rem';
                navLinks.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            }
        }

        // Order Pizza Function
      function orderPizza(pizzaName, description, price) {

    const phone = '50589712485';

    const message = `🍕 *Bienvenido a Pizza Reyes* 🍕

Hola, quiero ordenar este producto:

📌 *Pizza:* ${pizzaName}

📝 *Descripción:*
${description}

💰 *Precio:* ${price}

❓¿Está disponible este pedido?

🚚 Espero información sobre entrega y pago.`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
}

        // Scroll Animation Observer
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

        // Navbar Scroll Effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            } else {
                navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            }
        });

        // Smooth Scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Check if business is open (simple check based on hours 5am-10pm)
        function checkBusinessHours() {
            const now = new Date();
            const hour = now.getHours();
            const statusBadge = document.querySelector('.status-badge');
            
            if (hour >= 5 && hour < 22) {
                statusBadge.innerHTML = '<i class="fas fa-circle"></i> Abierto ahora';
                statusBadge.style.background = '#4CAF50';
            } else {
                statusBadge.innerHTML = '<i class="fas fa-circle"></i> Cerrado';
                statusBadge.style.background = '#f44336';
            }
        }

        // Run on load
        checkBusinessHours();


        /* SISTEMA DE OPINIONES */

let selectedRating = 0;

const stars = document.querySelectorAll('#starRating i');

stars.forEach(star => {

    star.addEventListener('click', () => {

        selectedRating = star.dataset.value;

        stars.forEach(s => {
            s.classList.remove('fas', 'active');
            s.classList.add('far');
        });

        for(let i = 0; i < selectedRating; i++){
            stars[i].classList.remove('far');
            stars[i].classList.add('fas', 'active');
        }
    });
});

function submitReview(){

    const name = document.getElementById('reviewName').value;
    const comment = document.getElementById('reviewComment').value;
    const reviewsGrid = document.getElementById('reviewsGrid');

    if(name.trim() === '' || comment.trim() === '' || selectedRating == 0){
        alert('Completa todos los campos y selecciona una calificación');
        return;
    }

    let starsHTML = '';

    for(let i = 0; i < selectedRating; i++){
        starsHTML += '<i class="fas fa-star"></i>';
    }

    for(let i = selectedRating; i < 5; i++){
        starsHTML += '<i class="far fa-star"></i>';
    }

    const reviewHTML = `
        <div class="review-card fade-in visible">

            <div class="review-header">
                <span class="reviewer-name">${name}</span>

                <div class="review-stars">
                    ${starsHTML}
                </div>
            </div>

            <p class="review-text">
                "${comment}"
            </p>

            <div class="review-date">
                Hace unos segundos
            </div>

        </div>
    `;

    reviewsGrid.insertAdjacentHTML('afterbegin', reviewHTML);

    document.getElementById('reviewName').value = '';
    document.getElementById('reviewComment').value = '';

    selectedRating = 0;

    stars.forEach(s => {
    s.classList.remove('fas', 'active');
    s.classList.add('far');
});
}