let listProductHTML = document.querySelector('.card-group');

products = [];

const addDataToHTML = () => {
    // Remove data's default from HTML
    // ...

    // Add new data
    if (products.length > 0) { // if has data
        // Create a row to contain the cards
        let row = document.createElement('div');
        row.classList.add('row', 'container');

        products.forEach(product => {
            // Create a Bootstrap card element with grid classes
            let newProduct = document.createElement('div');
            newProduct.classList.add('container', 'col-3', 'col-xxl-3', 'col-xl-4', 'col-lg-6', 'col-md-12', 'col-sm-12', 'm-0', 'p-0'); 

            // Set the data-id attribute
            newProduct.dataset.id = product.id;

            // Set the inner HTML of the card
            newProduct.innerHTML =
                `<div class="card custom-card border-0 rounded-0" >
                    <img src="${product.image}" class="custom-img img-fluid object-fit-cover " alt="..." >
                    <div class="card-body p-0">
                        <h5 class="card-title m-0">${product.name}</h5>
                        <div class="card-text m-0 text-secondary overflow-x-hidden" style="white-space: nowrap;">Featured in Philippinesaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
                        <div class="d-flex justify-content-between"> 
                            <div>
                                <h5 class="mt-3">${product.price}.00</h5>
                            </div>
                            <div> 
                                <h5 class="mt-3">&#9733; ${product.price}.00</h5>
                            </div>
                        </div>
                    </div>
                </div>`;

            // Append the card to the row
            row.appendChild(newProduct);
        });

        // Append the row to the container (listProductHTML)
        listProductHTML.appendChild(row);
    }
};

const initApp = () => {
    // get data product
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        console.log(data)
        addDataToHTML();

    })
}

initApp();

$(document).ready(function(){
    $(".upload-area").click(function(){
        $('#upload-input').trigger('click');
    });

    $('#upload-input').change(event => {
        if(event.target.files){
            let filesAmount = event.target.files.length;
            $('.upload-img').html("");

            for(let i = 0; i < filesAmount; i++){
                let reader = new FileReader();
                reader.onload = function(event){
                    let html = `
                        <div class = "uploaded-img">
                            <img src = "${event.target.result}" class='upload-fixed-size-img'>
                            <button type = "button" class = "remove-btn">
                                <i class = "fas fa-times"></i>
                            </button>
                        </div>
                    `;
                    $(".upload-img").append(html);
                }
                reader.readAsDataURL(event.target.files[i]);
            }

            $('.upload-info-value').text(filesAmount);
            $('.upload-img').css('padding', "20px");
        }
    });

    $(window).click(function(event){
        if($(event.target).hasClass('remove-btn')){
            $(event.target).parent().remove();
        } else if($(event.target).parent().hasClass('remove-btn')){
            $(event.target).parent().parent().remove();
        }
    })
});

