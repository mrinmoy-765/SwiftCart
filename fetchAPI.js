function truncateTitle(title, maxLength) {
  if (title.length > maxLength) {
    return title.slice(0, maxLength) + "...";
  }
  return title;
}

//Fetch  trending API---first three data
async function getAllProducts() {
  const url = "https://fakestoreapi.com/products";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    displayProducts(json);
    displayAllProducts(json);
  } catch (error) {
    console.error(error.message);
  }
}

function displayProducts(products) {
  const section = document.getElementById("trending");

  if (!section) return;

  section.innerHTML = "";

  // get first 3 products
  const firstThree = products.slice(0, 3);

  firstThree.forEach((product) => {
    const card = document.createElement("div");

    card.className = "bg-white shadow-md rounded-xl space-y-3";

    card.innerHTML = `
    <div class="bg-gray-200 py-5 rounded-t-xl">
     <img src="${product.image}" alt="${product.title}" class="h-40 mx-auto object-contain">
    </div>


      <div class="flex justify-between items-center px-3">
      <div class="badge badge-outline badge-primary bg-blue-200">${product.category}</div>
      <div>
      <i class="fa-solid fa-star text-xl text-yellow-400"></i>
      <span>${product.rating.rate}</span>
      <span>(${product.rating.count})</span>
      </div>
      </div>
      <div class="px-4 py-2">
     
         <h2 class="text-lg font-semibold line-clamp-2">${truncateTitle(product.title, 30)}</h2>    
         <h2 class="text-xl font-bold line-clamp-2">$ ${product.price}</h2>
      </div>
      <div class="flex justify-between items-center gap-2 px-4 pb-3">
       <button onClick="loadDetails('${product.id}')" class="button-default"><i class="fa-regular fa-eye mr-2"></i>Details</button>
       <button onClick="addCart('${product.id}')" class="button-cart"><i class="fa-solid fa-cart-arrow-down mr-2"></i>Add</button>
      </div>
   
    
    `;

    section.appendChild(card);
  });
}

function displayAllProducts(products) {
  const section = document.getElementById("allproducts");

  if (!section || !products) return;

  section.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");

    card.className = "bg-white shadow-md rounded-xl space-y-3";

    card.innerHTML = `
    <div class="bg-gray-200 py-5 rounded-t-xl">
     <img src="${product.image}" alt="${product.title}" class="h-40 mx-auto object-contain">
    </div>


      <div class="flex justify-between items-center px-3">
      <div class="badge badge-outline badge-primary bg-blue-200">${product.category}</div>
      <div>
      <i class="fa-solid fa-star text-xl text-yellow-400"></i>
      <span>${product.rating.rate}</span>
      <span>(${product.rating.count})</span>
      </div>
      </div>
      <div class="px-4 py-2">
     
         <h2 class="text-lg font-semibold line-clamp-2">${truncateTitle(product.title, 30)}</h2>    
         <h2 class="text-xl font-bold line-clamp-2">$ ${product.price}</h2>
      </div>
      <div class="flex justify-between items-center gap-2 px-4 pb-3">
       <button onClick="loadDetails('${product.id}')" class="button-default"><i class="fa-regular fa-eye mr-2"></i>Details</button>
       <button onClick="addCart('${product.id}')" class="button-cart"><i class="fa-solid fa-cart-arrow-down mr-2"></i>Add</button>
      </div>
   
    
    `;

    section.appendChild(card);
  });
}

//Fetch category API
async function getCategoryData() {
  const url = "https://fakestoreapi.com/products/categories";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    displayCategories(json);
  } catch (error) {
    console.error(error.message);
  }
}

let currentCategory = "all";

const displayCategories = (json) => {
  const categoryContainer = document.getElementById("categories");
  categoryContainer.innerHTML = "";

  // Create 'All' button
  const allButtonContainer = document.createElement("div");
  const allButton = document.createElement("button");
  allButton.className =
    "py-2 px-5 font-semibold border rounded-2xl bg-primary text-white";
  allButton.textContent = "All";
  allButton.setAttribute("data-category", "all");
  allButton.addEventListener("click", function () {
    setActiveCategory("all");
    getAllProducts();
  });
  allButtonContainer.appendChild(allButton);
  categoryContainer.append(allButtonContainer);

  json.forEach((item) => {
    const buttonContainer = document.createElement("div");
    const button = document.createElement("button");
    button.className = "py-2 px-5 font-semibold border rounded-2xl";
    button.textContent = item;
    button.setAttribute("data-category", item);
    button.addEventListener("click", function () {
      setActiveCategory(item);
      loadCategoryProducts(item);
    });
    buttonContainer.appendChild(button);
    categoryContainer.append(buttonContainer);
  });
  setActiveCategory(currentCategory); // highlight the current
};

function setActiveCategory(category) {
  currentCategory = category;
  const buttons = document.querySelectorAll("#categories button");
  buttons.forEach((btn) => {
    if (btn.getAttribute("data-category") === category) {
      btn.classList.add("bg-[#0000FF]", "text-white");
      btn.classList.remove("bg-white", "text-primary");
    } else {
      btn.classList.remove("bg-[#0000FF]", "text-white");
      btn.classList.add("bg-white", "text-primary");
    }
  });
}

const loadCategoryProducts = (category) => {
  fetch(
    `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`,
  )
    .then((res) => res.json())
    .then((data) => displayAllProducts(data))
    .catch((error) => console.log(error));
};

const loadDetails = async (id) => {
  const url = `https://fakestoreapi.com/products/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetails(data);
};

const displayDetails = (Details) => {
  const detailContainer = document.getElementById("modal1-content");

  const title = Details.title || "Not Available";
  const category = Details.category || "Not Available";
  const DetailsText = Details.description || "No additional details available";

  const price =
    Details.price !== undefined && Details.price !== null
      ? `$${Details.price}`
      : "Price not available";
  const Rating = Details.rating.rate || "Not Available";
  const Count = Details.rating.count || "Not Available";

  detailContainer.innerHTML = `
    <div class="p-4">
      <img 
        src="${Details.image}" 
        alt="Pet Image" 
        class="w-full h-64 object-cover rounded-lg mb-4" 
      />
    </div>
     <p class="mb-2"><b>Title :</b> <span class="ml-2">${title}</span></p>
      <p class="mb-2"><b>Category :</b> <span class="ml-2">${category}</span></p>
      <p class="mb-2"><b>Description :</b> <span class="ml-2">${DetailsText}</span></p>
      <p class="mb-2"><b>Price :</b> <span class="ml-2">${price}</span></p>
      <p class="mb-2"><b>Rating :</b> <span class="ml-2">${Rating}</span></p>
      <p class="mb-2"><b>Count :</b> <span class="ml-2">${Count}</span></p>
  `;

  document.getElementById("showModal1").click();
};

//add to cart
const cartItems = [];

const addCart = async (item) => {
  if (cartItems.includes(item)) {
    alert("Item already available in cart");
    return;
  }

  cartItems.push(item);
  alert("Product added to cart");

  // Update cart badge
  const cartBadge = document.getElementById("cart-badge");
  if (cartBadge) {
    cartBadge.textContent = cartItems.length;
  }

  return cartItems;
};

document.addEventListener("DOMContentLoaded", function () {
  getAllProducts();
  getCategoryData();
});
