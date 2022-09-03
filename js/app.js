
// blog button
document.getElementById('blog').addEventListener('click', function () {
    const blogContainer = document.getElementById('blog-container');
    blogContainer.innerHTML = ` <div class="accordion blog-content container" id="accordionExample ">
        <div class="accordion-item ">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                    aria-expanded="true" aria-controls="collapseOne">
                    difference between var and let const
                </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    The scope of a var variable is functional scope. The scope of a let variable is block scope. The
                    scope of a const
                    variable is block scope. It can be updated and re-declared into the scope.
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    what is difference arrow function and regular function
                </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    Regular functions created using function declarations or expressions are constructible and callable.
                    Since regular
                    functions are constructible, they can be called using the new keyword. However, the arrow functions
                    are only callable
                    and not constructible, i.e arrow functions can never be used as constructor functions
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    what is difference forEach,filter,find,map
                </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
                data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    The main difference between this two methods is that forEach allows you to change elements of
                    original array and returns
                    undefined and map does not allow you to change original array and intended for making new array
                    based on original one.The find() method is used to find all the descendant elements of the selected
                    element. It finds the element in the DOM
                    tree by traversing through the root to leaf. The filter() method is used to filters all the elements
                    and returns the
                    element that matches and the element that do not match are removed.
                </div>
            </div>
        </div>
    </div>`
})
// blog button end


const loadCatagories = async () => {
    url = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        const res = await fetch(url)
        const data = await res.json()
        displayData(data.data.news_category)
    }
    catch (error) {
        console.log(error)
    }

}

const displayData = (catagories) => {
    const catagoriesContainer = document.getElementById('categorys');
    catagories.forEach(category => {
        const catagoryList = document.createElement('div');
        catagoryList.innerHTML = `
      <li onclick="loadNews('${category.category_id}')">${category.category_name}</li>
      `;
        catagoriesContainer.appendChild(catagoryList)

    })
}
loadCatagories()



const loadNews = async (category_id) => {
    const url = ` https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data);
}

const displayCategory = categories => {
    toggleSpinner(true)
    console.log(categories);
    const categoryContainer = document.getElementById('category-container');
    categoryContainer.textContent = '';
    const noNews = document.getElementById('no-news-found');
    if (categories.length === 0) {
        noNews.classList.remove('d-none');
    }
    else {
        noNews.classList.add('d-none');
    }
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
   <div class="row w-100 g-0 mb-3">
          <div class="col-md-4">
            <img src="${category.image_url}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
            <h5 class="card-title">${category.title}</h5>
            <p class="card-text"><small class="text-muted">${category.author.name} ${category.author.published_date}</small></p>
              <p class="card-text">${category.details.slice(0, 100)}</p>
              <div class="d-flex justify-content-around">
              <div class="d-flex">
              <img src="${category.author.img}" class="rounded-circle" style="max-width: 40px;" alt="...">
              <p class="card-text"><small class="text-muted">${category.author.name} </small></p>
            </div>
              <div class="d-flex "">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye " viewBox="0 0 16 16">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
            </svg>
            <p class="card-text"><small class="text-muted">${category.total_view} </small></p>
              </div>
              <button type="button" class="btn btn-primary">Primary</button>

            </div>
            </div>
          </div>
        </div>
   `;
        categoryContainer.appendChild(categoryDiv);
    });
    toggleSpinner(false)
}

const toggleSpinner = isLoading => {
    const spinnerSection = document.getElementById('loader');
    if (isLoading) {
        spinnerSection.classList.remove('d-none')
    }
    else {
        spinnerSection.classList.add('d-none')
    };
}

loadCategory();




