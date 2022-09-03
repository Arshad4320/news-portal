const catagoriesElement = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => categoriesElement(data.data.news_category))
        .catch((error) => console.log(error))
}
const categoriesElement = (items) => {
    const catagoriesElement = document.getElementById('categories');
    items.forEach(item => {
        const { category_name, category_id } = item;
        const createElementLi = document.createElement('li');
        createElementLi.innerHTML = `
        <a class="nav-link  fs-6 fw-bold p-2 me-3" onclick="postDetailsInfo('${category_id}')" href="#" style="text-decoration: none">${category_name}</a>
        `
        catagoriesElement.appendChild(createElementLi);

    })
}
const postDetailsInfo = (categories_id) => {
    spinnerLading(true)
    const url = `https://openapi.programming-hero.com/api/news/category/${categories_id}`
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            spinnerLading(false)
            let localData = data.data
            localData.sort((a, b) => b.total_view - a.total_view)
            showpostDetailsInfo(localData)
        })
        .catch((error) => {
            spinnerLading(false)
            console.log(error)
        })
}

const showpostDetailsInfo = (allData) => {
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
             <button class="btn btn-outline-primary"  href="#" onclick="authorInfo('${_id}')" style="text-decoration: none" data-bs-toggle="modal" data-bs-target="#postDetailModal">Details</button>
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


const authorInfo = (authorID) => {
    const url = `https://openapi.programming-hero.com/api/news/${authorID}`
    fetch(url)
        .then(response => response.json())
        .then(modalData => showModalAuthor(modalData.data))
        .then(data => showpostDetailsInfo(data.data))
        .catch((error) => console.log(error));

}
const showModalAuthor = (authorDetailModal) => {
    const modalId = document.getElementById('modald');
    modalId.textContent = '';
    authorDetailModal.forEach(modalData => {
        const { author, rating, details, thumbnail_url, total_view } = modalData;
        const { name, published_date, img } = author;
        const createModalDiv = document.createElement('div');
        createModalDiv.classList.add('modal-content');
        createModalDiv.classList.add('text-center');
        createModalDiv.innerHTML = `
    <div class="modal-header bg-primary">
            <h5 class="modal-title fw-bold text-white" id="postDetailModalLabel">Author Details</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body ">
            <img src="${img ? img : 'No Data Found'}" alt="" style="width: 150px; height: 150px;";>
            <p>Author Name: ${name ? name : 'No Data Found'}</p>
            <p>Published Date: ${published_date ? published_date : 'No Data Found'}</p>
            <p>Details: ${details.length > 300 ? details.slice(0, 300) + '...' : details}</p>
            <p>Rating: ${rating.number ? rating.number : 'No Data Found'}</p>
            <p>Total View: ${total_view ? total_view : 'No Data Found'}</p>
          </div>
          <div class="modal-footer ">
            <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">Close</button>
          </div>
    `
        modalId.appendChild(createModalDiv);
    })

}

authorInfo();
catagoriesElement();
postDetailsInfo();

