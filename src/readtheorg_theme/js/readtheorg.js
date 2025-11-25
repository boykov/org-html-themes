function collapse_toc_elements_on_click (nav_li_a){
    /*
      When an `a' element in the TOC is clicked, its parent
      `li' element's active attribute is toggled.  This causes
      the element to toggle between minimized and maximized
      states.  The active attribute is documented in bootstrap.
      https://getbootstrap.com/docs/4.0/components/navbar/#nav
    */
    $(nav_li_a).parent().toggleClass("active");
}

function toggle(head) {
    head.parentNode.classList.toggle('collapsed');
    head.parentNode.getElementsByClassName('content')[0].scrollTop = 0;
}

$( document ).ready(function() {
    // When the document is loaded and ready, bind the
    // function `collapse_toc_elements_on_click' to the
    // `a' elements in the table of contents.
    $("#text-table-of-contents a").click(function() {
        collapse_toc_elements_on_click(this);
    });
});

$(function() {
    // $('.note').before("<p class='admonition-title note'>Note</p>");
    $('.seealso').before("<p class='admonition-title seealso'>See also</p>");
    $('.warning').before("<p class='admonition-title warning'>Warning</p>");
    $('.caution').before("<p class='admonition-title caution'>Caution</p>");
    $('.attention').before("<p class='admonition-title attention'>Attention</p>");
    $('.tip').before("<p class='admonition-title tip'>Tip</p>");
    $('.important').before("<p class='admonition-title important'>Important</p>");
    $('.hint').before("<p class='admonition-title hint'>Hint</p>");
    $('.error').before("<p class='admonition-title error'>Error</p>");
    $('.danger').before("<p class='admonition-title danger'>Danger</p>");
    $('.kb_hide').each(function() {
        var first_item0 = $(this).parent()[0].childNodes[0];
        var first_item = $(this).parent()[0].childNodes[0].textContent;
        var second_item = $(this).parent()[0].childNodes[1].textContent;
        var first_line;
        var num;
        zero_line = first_item == "" ? first_item0.outerHTML : "";
        first_line = first_item == "" ? second_item : first_item;
        num = first_item == "" ? 1 : 0;
        first_item == "" ? $(this).parent()[0].childNodes[1].remove() : {} ;
        $(this).parent()[0].childNodes[0].remove();
        // tmp?.remove();
        // .children(`:gt(${num})`)
        // .prepend(`${zero_line}`).wrapInner("<span style='display: flex;'></span>")
        $(this).parent().wrapInner("<div class='showhide collapsed'></div>").find('div').first().wrapInner("<div class='content'></div>")
            .prepend(`<div class='header' onclick='toggle(this)'>${zero_line} ${first_line}</div>`);
    });
    $('.kb_show').each(function() {
        $(this).parent().children().wrapAll("<div class='showhide'></div>");
    });
    $(".tiptext").mouseover(function() {
        $(this).children(".description").show();
    }).mouseout(function() {
        $(this).children(".description").hide();
    });
});

$( document ).ready(function() {

    // Shift nav in mobile when clicking the menu.
    $(document).on('click', "[data-toggle='wy-nav-top']", function() {
      $("[data-toggle='wy-nav-shift']").toggleClass("shift");
      $("[data-toggle='rst-versions']").toggleClass("shift");
    });
    // Close menu when you click a link.
    $(document).on('click', ".wy-menu-vertical .current ul li a", function() {
      $("[data-toggle='wy-nav-shift']").removeClass("shift");
      $("[data-toggle='rst-versions']").toggleClass("shift");
    });
    $(document).on('click', "[data-toggle='rst-current-version']", function() {
      $("[data-toggle='rst-versions']").toggleClass("shift-up");
    });
    // Make tables responsive
    $("table.docutils:not(.field-list)").wrap("<div class='wy-table-responsive'></div>");
});

$( document ).ready(function() {
    $('#text-table-of-contents ul').first().addClass('nav');
                                        // ScrollSpy also requires that we use
                                        // a Bootstrap nav component.
    $('body').scrollspy({target: '#text-table-of-contents'});

    // DON'T add sticky table headers (Fix issue #69?)
    // $('table').stickyTableHeaders();

    // set the height of tableOfContents
    var $postamble = $('#postamble');
    var $tableOfContents = $('#table-of-contents');
    $tableOfContents.css({paddingBottom: $postamble.outerHeight()});

    // add TOC button
    var toggleSidebar = $('<div id="toggle-sidebar"><a href="#table-of-contents"><h2>Menu</h2></a></div>');
    $('#content').prepend(toggleSidebar);

    // add close button when sidebar showed in mobile screen
    var closeBtn = $('<a class="close-sidebar fas fa-window-close" href="#"></a>');
    var tocTitle = $('#table-of-contents').find('h2');
    if ((typeof tocTitle !== 'undefined') && (typeof tocTitle[0] !== 'undefined')) {
        tocTitle[0].textContent = "";
        var upLink0 = $('#uplink').find('a');
        if ((typeof upLink0 !== 'undefined') && (typeof upLink0[0] !== 'undefined')) {
            var upLink = $('#uplink').find('a')[0].href
            var upBtn = $(`<a class="up-sidebar fas fa-home" href="${upLink}"></a>`);
            tocTitle.append(upBtn);
            tocTitle.append(closeBtn);
        }
    };
});

window.SphinxRtdTheme = (function (jquery) {
    var stickyNav = (function () {
        var navBar,
            win,
            stickyNavCssClass = 'stickynav',
            applyStickNav = function () {
                if (navBar.height() <= win.height()) {
                    navBar.addClass(stickyNavCssClass);
                } else {
                    navBar.removeClass(stickyNavCssClass);
                }
            },
            enable = function () {
                applyStickNav();
                win.on('resize', applyStickNav);
            },
            init = function () {
                navBar = jquery('nav.wy-nav-side:first');
                win    = jquery(window);
            };
        jquery(init);
        return {
            enable : enable
        };
    }());
    return {
        StickyNav : stickyNav
    };
}($));
