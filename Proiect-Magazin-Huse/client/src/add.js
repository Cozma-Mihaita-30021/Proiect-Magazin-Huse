function run() {
    new Vue({
      el: '#add',
      data: {
        id: '',
        message: '',
        husa: {}
      },
      created: function () {
      },
      methods: {
       add: function(){
            console.dir(this.husa);
            return axios.put('http://localhost:3000/huse', this.husa).then(
                (response) => {
                    this.message = response.data; // saved
                }
            );
        }
      }
    });
  }
  document.addEventListener('DOMContentLoaded', () => {
    run();
  });