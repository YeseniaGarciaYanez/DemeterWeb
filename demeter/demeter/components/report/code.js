document.addEventListener('DOMContentLoaded', function() {
    const areaButtons = document.querySelectorAll('.area-btn');
    const reportCards = document.querySelectorAll('.user-card');
    
    // Función para filtrar los reportes
    function filterReports(area) {
        reportCards.forEach(card => {
            if (area === 'all' || card.getAttribute('data-area') === area) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Event listeners para los botones de área
    areaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            areaButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            // Obtener el área seleccionada
            const selectedArea = this.getAttribute('data-area');
            
            // Filtrar los reportes
            filterReports(selectedArea);
        });
    });
    
    // Mostrar todos los reportes al cargar la página
    filterReports('all');
});