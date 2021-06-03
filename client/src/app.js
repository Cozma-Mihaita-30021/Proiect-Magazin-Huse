function run() {
  let indexComponent = new Vue({
    el: '#app',
    data: {
      huse: [],
      huseService: null,
      message: ''
    },
    created: function () {
      this.huseService = huse();
      console.log(huse());
      this.huseService.get().then(response => (this.huse = response.data));
      console.log( this.huse);
    },
    methods: {
      deleteHusa: function(id) {
        console.log('HTTP DELETE spre backend, huse: '+id);
        this.huseService.remove(id).then(response => {
          this.huseService.get().then(response => (this.huse = response.data));
        });
      },
    }
  });

//  indexComponent.use(VueMaterial);

}

document.addEventListener('DOMContentLoaded', () => {
  run();
});
