jQuery(document).ready(function($) {
    $('#add-product').click(function() {
        console.log('works');
        var productHtml = '<div class="product"><input type="text" name="product" placeholder="Product Name"><input type="text" name="product_price" placeholder="Price"></div>';
        $('.products-wrapper').append(productHtml);
    });
});
