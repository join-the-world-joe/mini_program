class Convert {
  static Int8ArrayToString(array) {
    var output = ""
    try{
      for(var i = 0; i < array.length; i++) {
        var character = String.fromCharCode(array[i])
        output += character
      }
    } catch(e){
      console.log("Convert.Uint8ArrayToString failure, err: ", e)
    } finally {
      return output
    }
  }
  static StringToUint8Array(any) {
    var output = []
    try {
      for(var i = 0; i < any.length; i += 2) {
        output.push(parseInt(any.substring(i, i + 2), 16));
      }
      output = Uint8Array.from(output)
    } catch(e) {
      console.log("Convert.StringToUint8Array failure, err: ", e)
    } finally {
      return output
    }
  }
}

module.exports = {
  Convert
}