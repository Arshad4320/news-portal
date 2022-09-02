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