/**
 * jquery.maps-geocode.js
 * @version: v1.0;2
 * @author: Renan Galeno
 *
 */
function getAddress(address){
  var cep = '';
  var pais = '';
  var pais_short = '';
  var estado = '';
  var estado_short = '';
  var cidade = '';
  var bairro = '';
  var logradouro = '';
  $.ajax({
    dataType: 'json',
    async: false,
    url: 'https://maps.google.com/maps/api/geocode/json?address='+address+'&sensor=false',
    type: 'GET',
    success:function(results){
      locais = results.results;
      i = 0;
      for (var j = locais[i].address_components.length - 1; j>=0; j--){
        if(locais[i].address_components[j].types[0] == "postal_code")
          cep = locais[i].address_components[j].long_name;
        if(locais[i].address_components[j].types[0] == "country"){
          pais = locais[i].address_components[j].long_name;
          pais_short = locais[i].address_components[j].short_name;
        }
        if(locais[i].address_components[j].types[0] == "administrative_area_level_1"){
          estado = locais[i].address_components[j].long_name;
          estado_short = locais[i].address_components[j].short_name;
        }
        if(locais[i].address_components[j].types[0] == "locality")
          cidade = locais[i].address_components[j].long_name;
        if(locais[i].address_components[j].types[0] == "neighborhood")
          bairro = locais[i].address_components[j].long_name;
        if(locais[i].address_components[j].types[0] == "route")
          logradouro = locais[i].address_components[j].long_name;
      }
  }});
  var result = {
    "cep": cep,
    "pais": pais,
    "pais_short": pais_short,
    "estado": estado,
    "estado_short": estado_short,
    "cidade": cidade,
    "bairro": bairro,
    "logradouro": logradouro,
  }
  return result;
}