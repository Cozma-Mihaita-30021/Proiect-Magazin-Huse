function huse() {
  get = function () {
    return axios.get('http://localhost:3000/huse');
  };

  remove = function (index) {
    return axios.delete('http://localhost:3000/huse/'+index);
  };

  return {
    get: get,
    remove: remove
  };
}
