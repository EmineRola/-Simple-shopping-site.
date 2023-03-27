document.addEventListener('DOMContentLoaded', () => {
    //CALLBACK>içerisinde başka fonksiyon çalıştıran fonksiyon
    fetchCategories();
    fetchProducts();
})
const categoryList = document.querySelector('.categories');
const productList = document.querySelector('.products')
const openBtn = document.getElementById('open-btn');
const modal = document.getElementById("modal-wrapper")
const closeBtn = document.getElementById("close-btn")
const modalList = document.querySelector('.modal-list')

function fetchCategories() {
    fetch('https://api.escuelajs.co/api/v1/categories')
        //gelen veriyi işleme
        .then((response) => response.json())
        //oluşan datayı foreach ile her bir obje için fonksiyon çalıştırma 
        .then((data) => data.slice(0, 4).forEach((category) => {
            //gelen herbir obje için div oluşturma
            const categoryDıv = document.createElement('div');
            //Dive class ekleme
            categoryDıv.classList.add('category')
            //Divin içeriğini değiştirme
            categoryDıv.innerHTML = `  
            <img src= "${category.image}" />
            <span>${category.name}</span>`;
            // oluşan categoriyi htmldeki listeye atma
            categoryList.appendChild(categoryDıv);

        }))
        .catch((err) => console.log(err));
}

//sayfa yüklendiğinde fonksiyon çalışşın, apıden catogorileri çektik
//bunu js formatına json ile çevirdik
//bunları consola yazdık 0,4 arasını
//eğer bunlar gelmezse hatayı consola yazdık.

//ürüneri çekme
function fetchProducts() {
    //apı ye istek atma
    fetch('https://api.escuelajs.co/api/v1/products/')
        //istek başarılı olursa veriyi işle
        .then((res) => res.json())
        //işlenen veriyi al ve ekrana bas her bir ürünü bastırmak istiyorsak forEach
        .then((data) =>
            data.slice(2, 26).forEach((product) => {
                // div ekledik
                const productDiv = document.createElement('div');
                //sınıf ekledik
                productDiv.classList.add('product');
                //içeriği değiştir
                productDiv.innerHTML = `<img src="${product.images[0]}" alt="" />
            <p class="product-title">${product.title}</p>
            <p class="product-category">${product.category.name}</p>
            <div class="product-action">
              <p>${product.price} $</p>
              <button onclick="sepeteEkle({id:'${product.id}', name:'${product.title}', price:'${product.price}',image:'${product.images[0]}',amount:1})">Sepete Ekle</button>`
                productList.appendChild(productDiv)

            }))


        //hata olursa devereye gir
        .catch((err) => console.log(err))
}
//butonlara tıklama olayını izliyoruz
openBtn.addEventListener('click', () => {
    toggleModel();
    addList();
});

closeBtn.addEventListener('click', () => {
    toggleModel();
    modalList.innerHTML = '';

});
//Eğer dışarıya tıklanılırsa kapansın
modal.addEventListener('click', (e) => {
    if (e.target.id !== 'modal') {
        modal.classList.remove('active');
        modalList.innerHTML = '';
    }
})
//eğer tıklanırsa class eklenip çıkarılıyor.
function toggleModel() {
    modal.classList.toggle('active');
}

//!sepete Ekleme işleme
const basket = [];

const addList = () => {
    basket.forEach((product) => {
        const listItem = document.createElement('div');
        listItem.classList.add('list-item');
        listItem.innerHTML = `<div>
                              <img src="${product.image}" alt="">
                              </div>
                              <h2>${product.name}</h2>
                              <h2>${product.price}</h2>
                              <p>${product.amount}</p>`;
        modalList.appendChild(listItem);

    })
}

function sepeteEkle(product) {
    const findıtem = basket.find((i) => i.id === product.id);
    if (findıtem) {
        findıtem.amount += 1;
    }
    else {
        basket.push(product);
        console.log(basket)
    }


}