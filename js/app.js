// all pets api
const allPets = async () => {
    document.getElementById('parent-container').style.display = "block";
    const pets = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const response = await pets.json();
    const petLists = response.pets;
    displayAllPets(petLists);
}

// display all pet or products
const displayAllPets = (petLists) => {
    document.getElementById('loder').style.display = "none";
    document.getElementById('parent-container').style.display = "block";
    const petContainer = document.getElementById('pets-container');
    petContainer.innerHTML = "";
    // no information found 
    if (petLists.length === 0) {
        petContainer.innerHTML = `
            <div class="text-center 
            sm:absolute 
            md:absolute 
            lg:absolute 
            sm:top-2/4 
            md:top-2/4 
            lg:top-2/4 
            sm:left-2/4 
            lg:left-2/4 
            md:left-2/4 
            sm:translate-x-[-50%] 
            md:translate-x-[-50%] 
            lg:translate-x-[-50%] 
            sm:translate-y-[-50%] 
            md:translate-y-[-50%] 
            lg:translate-y-[-50%] 
            bg-[#F8F8F8] 
            w-full 
            h-full 
            flex 
            justify-center 
            items-center">
                <div>
                    <img class="mx-auto mb-6" src="images/no-content.png"/>
                <h1 class="font-bold text-3xl mb-4">No Information Available</h1>

                <p class="text-[#000000a1] max-w-[700px] mx-auto">Could you clarify which section you're referring to? Are you looking for content for a specific part of project, such as a product, about page, or services section? Let me know what you'd like to focus on!</p>
                </div>
            </div>
        `;
        return;
    }
    else {
        petLists.forEach((item) => {
            const div = document.createElement('div');
            div.innerHTML = `
                <div class="card border">
                    <div class="p-4">
                        <img
                        class="rounded-xl w-full max-h-[226px] object-cover"
                        src="${item.image}"/>
                    </div>
                    <div class="p-4 pt-0 text-start text-[#5A5A5A]">
                        <h2 class="font-bold text-xl mb-2 text-[#131313]">${item.pet_name}</h2>
    
                        <div class="flex gap-1 items-center mb-2">
                        <img src="images/1.png"/>
                        <p>Breed: ${item.breed ?? "Not Available"}</p>
                        </div>
    
                        <div class="flex gap-1 items-center mb-2">
                        <img src="images/2.png"/>
                        <p>Birth: ${item.date_of_birth ?? "Not Available"}</p>
                        </div>
    
                        <div class="flex gap-1 items-center mb-2">
                        <img src="images/3.png"/>
                        <p>Gender: ${item.gender ?? "Not Available"}</p>
                        </div>
    
                        <div class="flex gap-1 items-center mb-2">
                        <img src="images/4.png"/>
                        <p>Price: ${item.price ?? "Not Available"}</p>
                        </div>
    
                        <div class="card-actions flex justify-between border-t pt-3">
    
                            <button onclick="allImage(${item.petId})" class="btn bg-transparent border rounded-xl px-3">
                            <img src="images/like.png"/>
                            </button>
    
                            <button onclick="showPopup()" class="unique-open-modal btn bg-transparent border rounded-xl px-3 text-[#0E7A81] font-bold xl:text-lg">
                            Adopt
                            </button>
    
                            <button onclick="productDetails(${item.petId})" class="btn bg-transparent border rounded-xl px-3 text-[#0E7A81] font-bold xl:text-lg">
                            Details
                            </button>
    
                        </div>
                    </div>
                </div>
                        `;
            petContainer.appendChild(div);

        })
    }
}


// sidebar
const allImage = async (petId) => {
    const url = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
    const data = await url.json();
    displayAllImages(data.petData)
}
const displayAllImages = (id) => {
    const sidebarContainer = document.getElementById('sidebar-container');
    const div = document.createElement('div');
    div.innerHTML = `
    <img class="rounded-xl" src="${id.image}" />
    `;
    sidebarContainer.appendChild(div)
}

// sort api call
const getSortContainer = () => {
    document.getElementById('loder').style.display = "flex";
    document.getElementById('parent-container').style.display = "none";
    setTimeout(async () => {
        const pets = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
        const response = await pets.json();
        const getAllpetData = response.pets;
        getAllpetData.sort((a, b) => {
            return b.price - a.price;
        })
        displayAllPets(getAllpetData);
    }, 2000)
}

// moadal api
const productDetails = async (petId) => {
    const url = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
    const data = await url.json();
    displayModal(data.petData);
}
// modal display
const displayModal = (id) => {
    document.getElementById('custom_modal_id').showModal();
    const modal = document.getElementById('modal-details');
    modal.innerHTML = `
    <img class="w-full rounded-xl" src="${id.image}"/>
    <h1 class="font-bold text-xl my-2 text-start">${id.pet_name}</h1>
    <div class="grid grid-cols-2">
        <div class="flex gap-1 items-center mb-2">
            <img src="images/1.png"/>
            <p>Breed: ${id.breed ?? "Not Available"}</p>
        </div>
        <div class="flex gap-1 items-center mb-2">
            <img src="images/2.png"/>
            <p>Birth: ${id.date_of_birth ?? "Not Available"}</p>
        </div>
        <div class="flex gap-1 items-center mb-2">
            <img src="images/3.png"/>
            <p>Gender: ${id.gender ?? "Not Available"}</p>
        </div>
        <div class="flex gap-1 items-center mb-2">
            <img src="images/4.png"/>
            <p>Price: ${id.price ?? "Not Available"}</p>
        </div>
        <div class="flex gap-1 items-center mb-2">
            <img src="images/3.png"/>
            <p>Vaccinated Status: ${id.vaccinated_status ?? "Not Available"}</p>
        </div>
    </div>

    <h1 class="font-bold text-xl text-start mb-2">Details Information</h1>
    <p class="text-start">${id.pet_details}</p>
    <div class="mt-5">
        <form method="dialog">
        <button class="btn w-full bg-[#0e79812b] text-[#0E7A81] hover:bg-[#0e79812b] font-bold text-lg">Close</button>
        </form>
    </div>
    `;
}


// load category by product
const loadCategoryWithProduct = (catName) => {
    document.getElementById('loder').style.display = "flex";
    document.getElementById('parent-container').style.display = "none";
    setTimeout(async () => {
        const categoriesByName = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${catName}`);
        const data = await categoriesByName.json();
        const dataDetails = data.data;
        displayAllPets(dataDetails);
    }, 2000)
}
// all categories api
const allCategories = async () => {
    const categories = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await categories.json();
    displayAllCategoryButton(data.categories);
}

// display category button
const displayAllCategoryButton = (categories) => {
    categories.forEach(item => {
        const categoryButton = document.getElementById('category-button');
        const div = document.createElement('div');

        div.innerHTML = `
        <button onclick="loadCategoryWithProduct('${item.category}')" class="active-button flex justify-center items-center py-3 px-8 gap-2 bg-transparent border rounded-xl font-bold text-2xl cursor-pointer	">
        <img class="w-[50px]" src=${item.category_icon}/>
        <span>${item.category}</span>
        </button>
        `;
        categoryButton.appendChild(div)
    })
}


// loading
const loading = () => {
    document.getElementById('loder').style.display = "flex";
    document.getElementById('parent-container').style.display = "none";
    setTimeout(() => {
        allPets();
    }, 3000)
}
loading();
allCategories()