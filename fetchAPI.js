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

  // clear previous content (optional)
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
       <button class="button-default"><i class="fa-regular fa-eye mr-2"></i>Details</button>
       <button class="button-cart"><i class="fa-solid fa-cart-arrow-down mr-2"></i>Add</button>
      </div>
   
    
    `;

    section.appendChild(card);
  });
}

function displayAllProducts(products) {
  const section = document.getElementById("trending");

  // clear previous content (optional)
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
       <button class="button-default"><i class="fa-regular fa-eye mr-2"></i>Details</button>
       <button class="button-cart"><i class="fa-solid fa-cart-arrow-down mr-2"></i>Add</button>
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

const displayCategories = (json) => {
  const categoryContainer = document.getElementById("categories");

  json.forEach((item) => {
    console.log(item);

    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
        <button onclick="loadCategoryProducts('${item}')"class="py-2 px-5 font-semibold border rounded-2xl">
            ${item}
        </button>
        `;
    categoryContainer.append(buttonContainer);
  });
};
getAllProducts();
getCategoryData();
