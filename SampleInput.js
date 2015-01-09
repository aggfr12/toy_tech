var SAMPLE_INPUTS = [
    "<order/>",

    "<orderName>\n"+
    "Mammals\n"+
    "</orderName>",

    "<order name='Mammals'>"+
    "\n\t<criteria tastiness='somewhat' size='small'/>"+
    "\n\t<member name='Gerbil'/>"+
    "\n</order>",

    "<animals type='edible'>" +
    "\n\t<order name='Mammals'>" +
    "\n\t\t<criteria tastiness='somewhat' size='small'/>" +
    "\n\t\t<member name='Gerbil' level='basic'/>"+
    "\n\t\t<member name='FruitBat' level='advanced'>"+
    "\n\t\t\tBest prepared with pomegranate reduction and chives."+
    "\n\t\t</member>"+
    "\n\t\t<criteria tastiness='somewhat' size='large'/>" +
    "\n\t\t<member name='Elephant' level='basic'/>"+
    "\n\t\t<member name='Narwhal' level='advanced'>"+
    "\n\t\t\tSear steaks, top with sesame and balsamic vinegar."+
    "\n\t\t</member>"+
    "\n\t\t<member name='Koalefant' level='basic'/>"+
    "\n\t</order>"+
    "\n\t<order name='Reptiles' extinctedness='extinct'>" +
    "\n\t\t<criteria tastiness='very' size='varied'/>" +
    "\n\t\t<member name='Pterodactyl' level='basic'/>"+
    "\n\t\t<member name='Stegosaurus' level='advanced'>"+
    "\n\t\t\tRemove plates prior to serving"+
    "\n\t\t</member>"+
    "\n\t\t<member name='Velociraptor' level='intermediate'>"+
    "\n\t\t\tBrine drumsticks in tar for at least 2 epochs"+
    "\n\t\t</member>"+
    "\n\t\t<member name='Lambeosaurus' level='best' recognition='insufficient'/>"+
    "\n\t</order>"+
    "\n</animals>",

];

$(function(){
  for(var i=0; i<SAMPLE_INPUTS.length; i++){
    var $input = $("<input type='button' class='sample'>").attr('value',i);
    $("#sampleButtons").append($input);
  }
  $(".sample").bind("click",function(){
    $("#inputXml").val(SAMPLE_INPUTS[$(this).attr('value')]);
  });

  // Ghetto load default input
  var ghettoParam = document.location.href.substr(document.location.href.length-1,1);
  if(!isNaN(ghettoParam)){
    $("#inputXml").val(SAMPLE_INPUTS[ghettoParam]);
  }
});