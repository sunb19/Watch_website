
// Helper to read query params
function getParam(key){
  const url = new URL(window.location.href);
  return url.searchParams.get(key);
}

async function fetchInventory(){
  const res = await fetch('data/inventory.json');
  return await res.json();
}

function money(n){
  if(n === null || n === undefined) return '—';
  return new Intl.NumberFormat('en-US',{style:'currency', currency:'USD'}).format(n);
}

// Inventory grid
async function renderInventory(){
  const grid = document.getElementById('inventoryGrid');
  if(!grid) return;
  const data = await fetchInventory();
  grid.innerHTML = data.items.map(item => `
    <a class="card" href="watch.html?id=${encodeURIComponent(item.id)}">
      ${item.featured ? '<span class="badge">FEATURED</span>' : ''}
      <div class="thumb"><img src="${(item.images && item.images[0]) || 'assets/placeholders/placeholder_1.png'}" alt="${item.title}"></div>
      <div class="body">
        <div class="title"><strong>${item.title}</strong></div>
        <div class="spec">
          <span>${item.condition}</span> •
          <span>${item.year || '—'}</span> •
          <span>${item.size || ''}</span>
        </div>
        <div class="price">${money(item.price)}</div>
      </div>
    </a>
  `).join('');
}

// Featured on homepage
async function renderFeatured(){
  const wrap = document.getElementById('featured');
  if(!wrap) return;
  const data = await fetchInventory();
  const picks = data.items.filter(i => i.featured).slice(0,6);
  wrap.innerHTML = picks.map(item => `
    <a class="card" href="watch.html?id=${encodeURIComponent(item.id)}">
      <span class="badge">FEATURED</span>
      <div class="thumb"><img src="${(item.images && item.images[0]) || 'assets/placeholders/placeholder_1.png'}" alt="${item.title}"></div>
      <div class="body">
        <div class="title"><strong>${item.title}</strong></div>
        <div class="spec"><span>${item.condition}</span> • <span>${item.year || '—'}</span> • <span>${item.size || ''}</span></div>
        <div class="price">${money(item.price)}</div>
      </div>
    </a>
  `).join('');
}

// Detail page
async function renderDetail(){
  const host = document.getElementById('detailHost');
  if(!host) return;
  const id = getParam('id');
  const data = await fetchInventory();
  const item = data.items.find(i => String(i.id) === String(id)) || data.items[0];

  const mainImg = (item.images && item.images[0]) || 'assets/placeholders/placeholder_1.png';
  host.innerHTML = `
    <div class="detail">
      <div class="gallery">
        <div class="gallery-main"><img id="mainImg" src="${mainImg}" alt="${item.title}"></div>
        <div class="gallery-thumbs">
          ${(item.images && item.images.length ? item.images : ['assets/placeholders/placeholder_1.png','assets/placeholders/placeholder_2.png']).map(src => `
            <img src="${src}" alt="thumb">
          `).join('')}
        </div>
      </div>
      <div class="specs">
        <h2 style="margin-top:0">${item.title}</h2>
        <div class="price" style="font-size:22px">${money(item.price)}</div>
        <p class="note">${item.description || ''}</p>
        <h3>Specifications</h3>
        <div class="spec-list">
          <div><strong>Model:</strong> ${item.model || '—'}</div>
          <div><strong>Reference:</strong> ${item.reference || '—'}</div>
          <div><strong>Year:</strong> ${item.year || '—'}</div>
          <div><strong>Size:</strong> ${item.size || '—'}</div>
          <div><strong>Bracelet:</strong> ${item.bracelet || '—'}</div>
          <div><strong>Condition:</strong> ${item.condition || '—'}</div>
          <div><strong>Box / Papers:</strong> ${item.box_papers || '—'}</div>
          <div><strong>Location:</strong> ${item.location || '—'}</div>
        </div>
        <div class="actions">
          <a class="btn gold" href="https://wa.me/1234567890?text=Hi%20LKS%20Timepieces%2C%20I'm%20interested%20in%20${encodeURIComponent(item.title)}" target="_blank" rel="noopener">WhatsApp Inquiry</a>
          <a class="btn ghost" href="mailto:hello@lkstimepieces.com?subject=Inquiry:%20${encodeURIComponent(item.title)}">Email Inquiry</a>
        </div>
        <div class="note">Prefer WeChat? Add ID: <strong>your-wechat-id</strong></div>
      </div>
    </div>
  `;
  // thumbs click
  const thumbs = host.querySelectorAll('.gallery-thumbs img');
  const main = host.querySelector('#mainImg');
  thumbs.forEach(t => t.addEventListener('click', () => { main.src = t.src; }));
}

// Boot
document.addEventListener('DOMContentLoaded', () => {
  renderFeatured();
  renderInventory();
  renderDetail();
});
