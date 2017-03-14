$(document).ready(function() {
    "use strict";

    // refactor paragraph to act as select
    $(".custom-select").click(function(e) {
        $(".select-dropdown").slideToggle();
        e.stopPropagation();
    });

    $(document).click(function() {
        $(".select-dropdown").slideUp();
    });

    $(".select-dropdown").on("click", "li", function() {
        //default value
        $(".order").val("01-01-2017");

        var value = $(this).attr("data-value");
        var text = $(this).text();

        $(".order").val(value);
        $(".custom-select").text(text);

        $(this).parent().slideUp();
    });

    // swap images on product menu hover
    $(".product-menu").on("mouseenter", ".submenu-open", function() {
        var icon = $(this).find(".menu-icon");
        var orgSource = icon.attr("src");
        var hoverSource = orgSource.replace(".png", "-hover.png");

        if (!$(this).hasClass("active-menu") && icon.attr("src").indexOf("hover") === -1) {

            icon.attr("src", hoverSource);
        }
        $(this).mouseleave(function() {
            if (!$(this).hasClass("active-menu") && icon.attr("src").indexOf("hover") !== -1) {
                icon.attr("src", orgSource);
            }
        });


    });

    // open product submenu
    $(".product-menu").on("click", ".submenu-open", function() {
        var menu = $(this).attr("data-open");
        var submenu = $("#" + menu);

        var icon = !$(this).is($(".product-menu .active-menu")) ? $(".product-menu").find(".active-menu .menu-icon") : undefined;

        var hoverSource;
        var orgSource;
        if (icon !== undefined) {
            hoverSource = icon.attr("src");
            if (hoverSource !== undefined) {
                orgSource = hoverSource.replace("-hover.png", ".png");
                icon.attr("src", orgSource);
            }

        }

        $(this).siblings().removeClass("active-menu");


        $(this).toggleClass("active-menu");
        $(this).siblings().find(".product-submenu").hide();

        submenu.slideToggle(600);

    });

    // product nav collapse
    $(".product-nav-collapse").click(function() {
        var hoverSource = $(".product-menu").find(".active-menu .menu-icon").attr("src");

        if (hoverSource !== undefined) {
            var orgSource = hoverSource.replace("-hover.png", ".png");
            $(".product-menu").find(".active-menu .menu-icon").attr("src", orgSource);
        }


        $(".product-menu li").removeClass("active-menu");
        $(".product-submenu").slideUp();
        $(".product-menu").slideToggle();
    });

    // product filter form collapse
    $(".filter-collapse").click(function() {
        $(".filter").slideToggle(600);
    });


    // product filter category collapse
    $(".category .sub-filter-collapse").click(function() {
        $(this).next().slideToggle();
        $(this).children().toggleClass("fa-plus");
        $(this).children().toggleClass("fa-minus");
    });

    // jquery slider
    $(function() {
        $("#slider").slider({
            range: true,
            min: 100,
            max: 10000,
            values: [100, 10000],
            step: 50,
            slide: function(e, element) {
                $(".price-range span:first").text(element.values[0] + "din");
                $(".price-range span:last").text(element.values[1] + "din");

            }

        });

        $(".price-range span:first").text($("#slider").slider("values", 0) + "din");
        $(".price-range span:last").text($("#slider").slider("values", 1) + "din");
    });

    $("#slider .ui-slider-handle").append("span");

    // single product modal
    function getIdentifiers(location) {
        var identifiers = [];
        $(location + " .product").each(function() {
            if (typeof $(this).attr("data-id") !== typeof undefined && $(this).attr("data-id") !== false && $(this).is(":visible")) {
                identifiers.push($(this).attr("data-id"));
            }
        });

        return identifiers;
    }

    function setNewProduct(product) {
        var productId = product.find(".product-id").html();
        var productPriceOne = product.find("div.product-price:first").html();
        var productPriceTwo = product.find("div.product-price:last").html();
        var productName = product.find(".product-name").text();
        var imageSrc = product.find("img").attr("src");
        var newSrc = imageSrc.replace(".jpg", "-lg.jpg");
        var dataId = product.attr("data-id");

        // var TotalPrice = product.find("div.product-price:not(.crossed) p:last").text();

        $(".single-product-modal .single-product").attr("data-id", dataId);
        $(".single-product-modal .product-id").html(productId);
        $(".single-product-modal div.product-price:first").html(productPriceOne);
        $(".single-product-modal div.product-price:last").html(productPriceTwo);
        $(".single-product-modal .product-name").text(productName);
        $(".single-product-modal img").attr("src", newSrc);

        // $(".single-product-modal .total-price").text(TotalPrice);


        // if (product.find("div.product-price:first").hasClass("crossed")) {
        //     $(".single-product-modal div.product-price:first").addClass("crossed");
        // } else {
        //     $(".single-product-modal div.product-price:first").removeClass("crossed");
        // }
        //
        // if (product.find("div.product-price:last").hasClass("crossed")) {
        //     $(".single-product-modal div.product-price:last").addClass("crossed");
        // } else {
        //     $(".single-product-modal div.product-price:last").removeClass("crossed");
        // }
    }

    $(".single-product-modal").on("show.bs.modal", function(e) {
        var which = $(e.relatedTarget);
        var product = which.parents(".product");

        setNewProduct(product);
    });

    $(".product-left").click(function() {
        var location = "." + $(this).parents("section").attr("class");
        var identifiers = getIdentifiers(location);
        var currentId = $(".single-product-modal .single-product").attr("data-id");
        var index = identifiers.findIndex(function(x) {
            return x === currentId;
        });
        var prevIndex;

        if (index === 0) {
            prevIndex = identifiers.length - 1;
        } else {
            prevIndex = index - 1;
        }

        var prevId = identifiers[prevIndex];
        var prevProduct = $(location + " .product[data-id=" + prevId + "]");

        setNewProduct(prevProduct);


    });

    $(".product-right").click(function() {
        var location = "." + $(this).parents("section").attr("class");
        var identifiers = getIdentifiers(location);

        var currentId = $(".single-product-modal .single-product").attr("data-id");
        var index = identifiers.findIndex(function(x) {
            return x === currentId;
        });
        var nextIndex;

        if (index === identifiers.length - 1) {
            nextIndex = 0;
        } else {
            nextIndex = index + 1;
        }

        var nextId = identifiers[nextIndex];
        var nextProduct = $(location + " .product[data-id=" + nextId + "]");

        setNewProduct(nextProduct);

    });

    // fix modal-open class getting removed from body due to same button opening and closing modals
    $(".login-modal").on("hide.bs.modal", function(e) {

        if (!$(e.relatedTarget).is(".register-btn")) {
            $("body").removeClass("modal-open");
        }

    });

    $(".login-modal").on("show.bs.modal", function(e) {
        $("body").addClass("modal-open");
    });
    $(".register-modal").on("hide.bs.modal", function(e) {
        $("body").removeClass("modal-open");
    });
    $(".register-modal").on("show.bs.modal", function(e) {
        $("body").addClass("modal-open");
    });

    $(".single-product-modal").on("hide.bs.modal", function(e) {
        $("body").removeClass("modal-open");
    });
    $(".single-product-modal").on("show.bs.modal", function(e) {
        $("body").addClass("modal-open");
    });

    // fetch data from json file
    $.getJSON("data.json", function(data) {
        var productData = JSON.parse(JSON.stringify(data));
        var saleData = JSON.parse(JSON.stringify(data));


        // index page on sale product filtering
        saleData.products = saleData.products.filter(function(product) {
            return product.sale;
        });

        // index page rendering
        var saleTemplateData = saleData;
        var templateSale = $("#on-sale-template").html();
        var resultSale = Mustache.render(templateSale, saleTemplateData);
        $(".on-sale .products").html(resultSale);

        // products page initial rendering
        var productTemplateData = productData;
        var templateProduct = $("#on-sale-template").html();
        var resultProduct = Mustache.render(templateProduct, productTemplateData);
        $(".all-products .products").html(resultProduct);

        // product page filter and rendering

    });


});
