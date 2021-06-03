function run() {
    new Vue({
      el: '#update',
      data: {
        id: '',
        message: '',
        husa: {}
      },
      created: function () {

        let uri = window.location.search.substring(1);
        let params = new URLSearchParams(uri);
        this.id = params.get("id");

        axios.get('http://localhost:3000/huse/'+this.id).then(
            (response) => {
                this.husa = response.data;
            }
        );
      },
      methods: {
        update: function(){
            console.dir(this.husa);

            return axios.post('http://localhost:3000/huse', this.husa).then(
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
  