// ELEMENTOS PERFIL
const editBtn        = document.getElementById('editProfileBtn');
const profileDisplay = document.getElementById('profileDisplay');
const profileEdit    = document.getElementById('profileEdit');
const nameInput      = document.getElementById('nameInput');
const bioInput       = document.getElementById('bioInput');
const displayName    = document.getElementById('displayName');
const displayBio     = document.getElementById('displayBio');
const avatarInput    = document.getElementById('avatarInput');
const avatarImg      = document.getElementById('avatarImg');

let editingProfile = false;

editBtn.addEventListener('click', () => {
  if (!editingProfile) {
    // pasar a modo edición
    editingProfile = true;
    editBtn.textContent = 'Guardar';
    profileDisplay.classList.add('hidden');
    profileEdit.classList.remove('hidden');
    nameInput.value = displayName.textContent;
    bioInput.value  = displayBio.textContent;
  } else {
    // guardar cambios
    editingProfile = false;
    editBtn.textContent = 'Editar';
    displayName.textContent = nameInput.value || 'Tu Nombre';
    displayBio.textContent  = bioInput.value  || 'Escribe una breve bio';
    profileDisplay.classList.remove('hidden');
    profileEdit.classList.add('hidden');
  }
});

// Cambiar avatar inline
avatarInput.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    avatarImg.style.backgroundImage   = `url(${reader.result})`;
    avatarImg.style.backgroundSize    = 'cover';
    avatarImg.style.backgroundPosition= 'center';
  };
  reader.readAsDataURL(file);
});
