const items = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  image: 'https://via.placeholder.com/150',
  description: `Item ${i + 1}`,
  price: 10 + i * 2,
}));

const basket = [];

const itemSection = document.getElementById('itemSection');
const basketList = document.getElementById('basketList');
const subtotalEl = document.getElementById('subtotal');
const deliveryEl = document.getElementById('delivery');
const totalEl = document.getElementById('total');
const deliveryForm = document.getElementById('deliveryForm');

items.forEach(item => {
  const box = document.createElement('div');
  box.className = 'item-box';
  box.innerHTML = `
    <img src="${item.image}" alt="${item.description}" />
    <p>${item.description}</p>
    <p>Price: $${item.price}</p>
    <input type="number" min="1" value="1" id="qty-${item.id}" />
    <button onclick="addToBasket(${item.id})">Add to Basket</button>
  `;
  itemSection.appendChild(box);
});

function addToBasket(id) {
  const item = items.find(i => i.id === id);
  const qtyInput = document.getElementById(`qty-${id}`);
  const quantity = parseInt(qtyInput.value);

  if (quantity < 1) return;

  const existing = basket.find(i => i.id === id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    basket.push({ ...item, quantity });
  }

  updateBasket();
}

function updateBasket() {
  basketList.innerHTML = '';
  let subtotal = 0;

  basket.forEach(item => {
    const li = document.createElement('li');
    const itemTotal = item.price * item.quantity;
    li.textContent = `${item.description} × ${item.quantity} = $${itemTotal}`;
    basketList.appendChild(li);
    subtotal += itemTotal;
  });

  const deliveryFee = subtotal > 0 ? 5 : 0;
  subtotalEl.textContent = `Subtotal: $${subtotal}`;
  deliveryEl.textContent = `Delivery Fee: $${deliveryFee}`;
  totalEl.innerHTML = `<strong>Total: $${subtotal + deliveryFee}</strong>`;
}

deliveryForm.addEventListener('submit', e => {
  e.preventDefault();
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const address = document.getElementById('address').value.trim();

  if (!firstName || !lastName || !address) {
    alert('Please fill out all delivery fields.');
    return;
  }

  alert(`Order confirmed for ${firstName} ${lastName}!\nDelivery to: ${address}`);
});

// Example: Dynamically update the header title
document.addEventListener('DOMContentLoaded', () => {
  const title = document.getElementById('mainTitle');
  title.textContent = 'Macis Kitchen - Herd You Were Hungry!';
});

// Highlight active link on click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});