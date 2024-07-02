// services/json_parse.js
class jsonParse {
    static toLiteral(obj) {
      const literal = {};
      Object.keys(obj).forEach(key => {
        switch (key) {
          case 'id':
          case 'name':
          case 'phone':
          case 'obs':
            literal[key] = obj[key];
            break;
          // Adicione outros campos conforme necessário
          default:
            break;
        }
      });
      return literal;
    }
  
    static toLiteralArray(arr) {
      return arr.map(obj => jsonParse.toLiteral(obj));
    }
  }
  
  module.exports = jsonParse;
  