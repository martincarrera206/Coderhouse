//const socket = io()

const productListContainer = document.getElementById('productListContainer')

$( document ).ready(function() {
    // USO DEL FETCH PARA EL GUARDADO
    fetch('http://localhost:8080/api/productos-test', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(arProducts => {
        let listBody = ``
        if(arProducts){
            listBody += arProducts
            .map(product => {
                const productElement = `
                <tr>
                    <td><img src="${product.thumbnail}" width="64" /></td>
                    <td>${product.title}</td>
                    <td>${product.price}</td>
                </tr>
                `
                return productElement
            })
            .join('')
        }else{
            listBody = `
                <tr id="emptyProducts">
                    <td colspan="3" class="text-center">No hay productos cargados</td>
                </tr>
            `
        }
        productListContainer.innerHTML = listBody
    })
    .catch((error) => {
        console.error('Error:', error);
    });
})
