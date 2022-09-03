const catagories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => categoriesElement(data.data.news_category))
        .catch((error) => console.log(error))
}
const categoriesElement = (items) => {
    const catagories = document.getElementById('categories');
    items.forEach(item => {
        const { category_name, category_id } = item;
        const createElementLi = document.createElement('li');
        createElementLi.innerHTML = `
        <a class="nav-link  fs-6 p-2 me-3" onclick="postDetails('${category_id}')" href="#" style="text-decoration: none">${category_name}</a>
        `
        catagories.appendChild(createElementLi);

    })
}
const postDetails = (categories_id) => {
    spinnerLading(true)
    const url = `https://openapi.programming-hero.com/api/news/category/${categories_id}`
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            spinnerLading(false)
            let localData = data.data
            localData.sort((a, b) => b.total_view - a.total_view)
            showPostDetails(localData)
        })
        .catch((error) => {
            spinnerLading(false)
            console.log(error)
        })
}

const showPostDetails = (allData) => {
    const cardDetails = document.getElementById('card-details');
    // Founding Items
    const foundedItem = document.getElementById('founded-item');

    const foundingResult = allData.length;
    if (foundingResult <= 0) {
        foundedItem.innerText = 'No Content Available'
    } else {
        foundedItem.innerText = foundingResult + ' Result Found'
    }
    // Post Details
    cardDetails.textContent = '';
    allData.forEach(data => {
        const { title, image_url, details, author, total_view, _id } = data;
        const { img, name } = author;
        const createDiv = document.createElement('div');
        createDiv.classList.add('col');
        createDiv.classList.add('h-100');

        createDiv.innerHTML = `
    <div class="card-body">
    <img src="${image_url}" class="rounded-start" alt="..." style="width: 100%; height: 200px;">
    </div>
    <div class="col-md-8">
      <div class="card-body mb-3 mt-3">
        <h5 class="card-title">${title.length > 20 ? title.slice(0, 20) + '...' : title}</h5>
        <p class="card-text">${details.length > 50 ? details.slice(0, 50) + '...' : details}</p>
    </div>
    <div class="card-footer">
      <small ">
      <div class="container">
      <div class="row">
          <div class="col">
          <div class="d-flex">
              <img src="${img}" class="rounded-circle" alt="..." style="width: 45px; height: 45px; ">
              <p class="mt-1 ms-2 fs-6 me-5">${(name ? name : 'Details Unavailable')}</p>
              <i class="fa fa-sharp fa-solid fa-eye mt-2 me-2"></i>
              <p class="me-5 mt-2">${total_view ? total_view : 'Details Unavailable'}</p>
             <div>
             <button class="btn btn-outline-primary"  href="#" onclick="authorDetails('${_id}')" style="text-decoration: none" data-bs-toggle="modal" data-bs-target="#postDetailModal">Details</button>
             </div>
              </div>
           </div>
          </div>
         </div>
      </small>
     </div>
    </div>
  </div>
</div>
</div>
    `
        cardDetails.appendChild(createDiv);
        spinnerLading(false);
    })
}


const authorDetails = (authorID) => {
    const url = `https://openapi.programming-hero.com/api/news/${authorID}`
    fetch(url)
        .then(response => response.json())
        .then(modalData => showModalAuthor(modalData.data))
        .then(data => showPostDetails(data.data))
        .catch((error) => console.log(error));

}