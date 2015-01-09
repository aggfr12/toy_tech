/*
  ParseHelper class to abstract away ugly regexp and string manipulation
  Useful methods to parse XML nodes from valid XML strings
  Out of scope: invalid XML strings
*/
var ParseHelper = (function(){

  // RegEx pattern for a valid open tag
  var VALID_OPEN_TAG = new RegExp(/<([a-z]+?)((\ [a-z]*)(((="[^"]*"|='[^']*'|[^'">=])))?)*(\/)?>/i);

  // DRY method to pull contents from inbetween lhs & rhs
  var extractBetween = function(inputString, lhs, rhs){
    var matches = inputString.match(new RegExp(lhs+'([^]*?)'+rhs));
    if(matches){
      return $.trim(matches.pop());
    }
    return false;
  };

  // RegEx helper to escape special characters from search patterns
  var regEscape = function(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  // Public interface methods
  return {

    // Regex to extract the name of a valid open tag
    getTagName : function(tagString){
      return extractBetween(tagString, '<', '[/ />//]')
    },

    // Extract an array of {name,value} attributes from a valid open tag
    getTagAttributes : function(tagString){
      var attributeString = extractBetween(tagString, ' ', '[/>//>]'),
          attributes = [];
      if(!attributeString){
        return attributes;
      }
      var attributeList = attributeString.split(" ");
      for(var i = 0; i < attributeList.length; i ++){
        var attr = attributeList[i],
            keyVal;
        if(attr.indexOf("=") > 0){
          keyVal = attr.split("=");
          attributes.push( {
            name: keyVal[0],
            value: keyVal[1]
          })
        } else {
          attributes.push( { name: attr } );
        }
      }
      return attributes;
    },

    // Get the first valid open tag or return false
    getOpenTag : function(inputString){
      if(VALID_OPEN_TAG.test(inputString)){
        return inputString.match(VALID_OPEN_TAG)[0];
      }
      return false;
    },

    // Get the first matching closing tag or return false
    getClosingTag : function(inputString, openTag){
      var tagName = ParseHelper.getTagName(openTag);
      var closeTag = new RegExp("</" + tagName + ">");
      if(closeTag.test(inputString)){
        return inputString.match(closeTag)[0];
      }
      return false;
    },

    // Get the string between the start and end tag
    getTagContents : function(inputString, openTag, closeTag){
      return extractBetween(inputString, regEscape(openTag), regEscape(closeTag));
    },

    // Remove a node & its children from a string
    // Search & RegExp with variable whitespace is tricky
    // Use string splicing instead
    spliceNode : function(inputString, node){
      var indexStart = inputString.indexOf('<'+ node.name),
          indexEnd;

      // If the node has children or contents look for [</]nodeName>
      if(node.contents.length + node.children.length > 0){
        indexEnd = inputString.indexOf('/' + node.name + '>') + node.name.length + 3;
      }
      // If it's an empty node, cut up to the first end tag
      else {
        indexEnd = inputString.indexOf('/>') + 2;
      }
      return inputString.substr(0,indexStart) + inputString.substr(indexEnd,inputString.length);
    }
  }
})();