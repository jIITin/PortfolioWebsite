document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Ensure content visibility on load
    document.querySelectorAll('.fade-in, .slide-up').forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    });
});