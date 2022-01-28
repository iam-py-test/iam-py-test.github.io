/*a javascript framework for doing stuff*/
window.framework = {
  createElement:function(elementType,appendTo){
    const elm = document.createElement(elementType)
    appendTo.appendChild(elm)
    return elm
  },
  cmd:{
    parseArgs:function(args){
      if(typeof args != "string"){
        //can't parse something that isn't a string
        return []
      }
      var args_split = args.split(" ")
      return args_split
    }
  }
}
