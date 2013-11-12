//outbound link tracking
$('a').clickd();

$('#toc').toc({
});

$('code').each(function() {
  var el = $(this);

  var className = el[0].className;
  var lang = className.split('-')[1];
  el.addClass(lang);
  if (lang == 'html') {
    el.addClass('xml');
  }

});
