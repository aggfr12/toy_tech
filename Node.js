/*
 Pseudo-classical Node class
 Represents an XML node in the tree
*/
var Node = function(openTag, contents){
  this.name = ParseHelper.getTagName(openTag);
  this.attributes = ParseHelper.getTagAttributes(openTag);
  this.children = [];
  while(Parser.getValidNode(contents)){
    var nextNode = Parser.getValidNode(contents);
    this.children.push(nextNode);
    contents = Parser.removeNode(contents, nextNode);
  }
  this.contents = $.trim(contents);
}