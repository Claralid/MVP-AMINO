// ----- PERFIL -----
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
    editingProfile = true;
    editBtn.textContent = 'Guardar';
    profileDisplay.classList.add('hidden');
    profileEdit.classList.remove('hidden');
    nameInput.value = displayName.textContent;
    bioInput.value  = displayBio.textContent;
  } else {
    editingProfile = false;
    editBtn.textContent = 'Editar';
    displayName.textContent = nameInput.value || 'Tu Nombre';
    displayBio.textContent  = bioInput.value  || 'Escribe una breve bio';
    profileDisplay.classList.remove('hidden');
    profileEdit.classList.add('hidden');
  }
});

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

// ----- ENLACES -----
const addLinkBtn    = document.getElementById('addLinkBtn');
const linksList     = document.getElementById('linksList');
let links = [];  // { label, url, editing }

function renderLinks() {
  linksList.innerHTML = '';
  links.forEach((link, i) => {
    const item = document.createElement('div');
    item.className = 'bg-gray-50 border border-gray-200 rounded-lg p-3';
    if (link.editing) {
      item.innerHTML = `
        <input id="editLabel${i}" type="text" value="${link.label}" class="w-full mb-2 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none"/>
        <input id="editUrl${i}" type="text" value="${link.url}" class="w-full mb-3 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none"/>
        <div class="flex justify-end space-x-2">
          <button id="save${i}" class="text-sm text-[#7A9BAE] border border-[#7A9BAE] px-2 py-1 rounded-lg hover:bg-[#EAF2F6] transition">Guardar</button>
          <button id="cancel${i}" class="text-sm text-gray-600 border border-gray-300 px-2 py-1 rounded-lg hover:bg-gray-100 transition">Cancelar</button>
        </div>
      `;
      linksList.appendChild(item);
      document.getElementById(`save${i}`).onclick = () => {
        const L = document.getElementById(`editLabel${i}`).value.trim();
        const U = document.getElementById(`editUrl${i}`).value.trim();
        if (!L || !U) return alert('Ambos campos son obligatorios');
        links[i] = { label: L, url: U, editing: false };
        renderLinks();
      };
      document.getElementById(`cancel${i}`).onclick = () => {
        link.editing = false;
        renderLinks();
      };
    } else {
      item.innerHTML = `
        <div class="flex items-center justify-between">
          <a href="${link.url}" target="_blank" class="flex-1 text-[#2D3A45] hover:underline">
            ${link.label}
          </a>
          <div class="flex space-x-1 ml-3">
            <button id="edit${i}" class="text-sm text-[#587288] border border-gray-300 px-2 py-1 rounded-lg hover:bg-gray-100 transition">Editar</button>
            <button id="dup${i}" class="text-sm text-[#587288] border border-gray-300 px-2 py-1 rounded-lg hover:bg-gray-100 transition">Duplicar</button>
            <button id="rm${i}" class="text-sm text-red-500 border border-red-200 px-2 py-1 rounded-lg hover:bg-red-50 transition">Eliminar</button>
          </div>
        </div>
      `;
      linksList.appendChild(item);
      document.getElementById(`edit${i}`).onclick = () => {
        link.editing = true;
        renderLinks();
      };
      document.getElementById(`dup${i}`).onclick = () => {
        links.splice(i+1, 0, { ...link, editing: false });
        renderLinks();
      };
      document.getElementById(`rm${i}`).onclick = () => {
        links.splice(i, 1);
        renderLinks();
      };
    }
  });
}

addLinkBtn.addEventListener('click', () => {
  links.push({ label: 'Nuevo Enlace', url: 'https://', editing: true });
  renderLinks();
});

// ----- REDES SOCIALES -----
const editSocialBtn  = document.getElementById('editSocialBtn');
const socialEdit     = document.getElementById('socialEdit');
const saveSocialBtn  = document.getElementById('saveSocialBtn');
const igInput        = document.getElementById('igInput');
const twInput        = document.getElementById('twInput');
const lnInput        = document.getElementById('lnInput');
const igLink         = document.getElementById('igLink');
const twLink         = document.getElementById('twLink');
const lnLink         = document.getElementById('lnLink');

editSocialBtn.addEventListener('click', () => {
  socialEdit.classList.toggle('hidden');
});

saveSocialBtn.addEventListener('click', () => {
  igLink.href = igInput.value || "#";
  twLink.href = twInput.value || "#";
  lnLink.href = lnInput.value || "#";
  socialEdit.classList.add('hidden');
});

