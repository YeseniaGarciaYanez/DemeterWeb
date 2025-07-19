import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nylcukcxkmiaduscpubv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55bGN1a2N4a21pYWR1c2NwdWJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzNzk2MzQsImV4cCI6MjA2Njk1NTYzNH0.YjwgBxRSf715u0XWnn_GQIZQaJpcZ4cU_I9RzJrqFts';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
// Define tu bucket y carpetas si es necesario
const bucketName = 'reportes'; // <- ajusta según tu proyecto
const areas = ['A', 'B', 'C']; // Áreas posibles

// Función para crear una card HTML
function crearCard(nombreArchivo, area, url) {
  const card = document.createElement('div');
  card.classList.add('user-card');
  card.setAttribute('data-area', area);

  card.innerHTML = `
    <div class="user-header">
      <div class="user-info">
        <div class="user-name">${nombreArchivo}</div>
      </div>
    </div>
    <hr class="divider">
    <div class="user-details">
      <div class="user-area"><i class="fa-solid fa-file-pdf"></i> Area ${area}</div>
      <div class="user-action">
        <a href="${url}" target="_blank" style="text-decoration:none; color:inherit;">
          Download <i class="fas fa-download"></i>
        </a>
      </div>
    </div>
  `;
  return card;
}

// Función para listar y mostrar archivos
async function mostrarReportes() {
  const contenedor = document.querySelector('.users-container');

  const { data: archivos, error } = await supabase.storage.from(bucketName).list('', {
    limit: 100,
    offset: 0,
  });

  if (error) {
    console.error('Error al listar archivos:', error.message);
    return;
  }

  archivos.forEach(file => {
    const nombre = file.name;

    // Detecta el área (A, B, C) en el nombre del archivo
    const match = nombre.match(/area-([abc])/i);
    if (match) {
      const area = match[1].toUpperCase();
      const { publicUrl } = supabase.storage.from(bucketName).getPublicUrl(nombre);

      const card = crearCard(nombre, area, publicUrl);
      contenedor.appendChild(card);
    }
  });
}

document.addEventListener('DOMContentLoaded', mostrarReportes);