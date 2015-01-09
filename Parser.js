/*
 Singleton Parser object
 Responsible for extracting nodes from the input string
*/
var Parser =  {

  /*
    Takes the string XML input and returns either the next valid node
    or false if no valid nodes exist in the string.
  */
  getValidNode : function(inputString){
    // Remove white space
    inputString = $.trim(inputString);

    // Check for a valid open tag and instantiate other node components
    var openTag = ParseHelper.getOpenTag(inputString),
        closeTag = null,
        contents = null;

    // If no node, return false
    if(!openTag){
      return false;
    }

    // Check to see if we expect a closing tag, if so capture it
    if(openTag.indexOf('/>') == -1){
      closeTag = ParseHelper.getClosingTag(inputString, openTag);
      contents = ParseHelper.getTagContents(inputString, openTag, closeTag);
    }

    // Create & return a node from the components
    return new Node(openTag, contents);
  },

  /*
   Takes the string XML input and a node object
   Removes the string representation of the node from the XML string
  */
  removeNode : function(inputString, node){
    inputString = ParseHelper.spliceNode(inputString, node);
    return $.trim(inputString);
  }
};