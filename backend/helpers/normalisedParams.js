function normaliseID(params){
  try{
    const string_id = params.id;
    try{
      const id = parseInt(string_id);
      if(isNaN(id) || id < 0) return {value: null, error: 'Wrong id'};
      return {value: id, error: null};
    }catch(e){
      return {value: null, error: 'Wrong id'};
    }
  }catch(e){
    return {value: null, error: 'Wrong id'};
  }
}

module.exports = {
  normaliseID,
}