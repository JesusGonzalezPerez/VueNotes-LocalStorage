var app = new Vue({
    el: '#appVue',
    data: {
        newNote: '',
        list: [],
        show: true,
        filterSearch: ""
    },
    mounted() {
        if(localStorage.taskList){
            this.list = JSON.parse(localStorage.taskList);
        }
    },
    methods: {
        addNote: function () {
            let date = new Date();
            let formatedDate = date.toLocaleString('es-ES');
            this.list.push({
                title: this.newNote,
                priority: 0,
                date: formatedDate,
                completed: false
            });
            this.newNote = "";
            this.actualizarLocalStorage();
        }, 
        changeEstate: function (position) {
            if (this.list[position].completed) {
                this.list[position].completed = false;
                this.actualizarLocalStorage();
            } else {
                this.list[position].completed = true;
                this.actualizarLocalStorage();
            }
        },
        deleteNote: function (position) {
            this.list.splice(position, 1);
            this.actualizarLocalStorage();
        },
        deleteCompletedNotes: function () {
           this.list = this.list.filter((note)=>{
                return !note.completed;
            })
        },
        actualizarLocalStorage: function(){
            localStorage.taskList = JSON.stringify(this.list);
        },
       changePriority: function(position){
           this.list[position].priority+=1;
           if(this.list[position].priority==3){
                this.list[position].priority=0;
           }
           this.actualizarLocalStorage();
       }
    },
    computed: {
        totalNotes: function () {
            return this.list.length;
        },
        totalPendientes: function () {
            let total = 0;
            for (i = 0; i < this.list.length; i++) {
                if (this.list[i].completed == false) {
                    total++;
                }
            }
            return total;
        },
        filterList: function (){
            if (this.filterSearch == "") {
                return this.list;
            }else{
                return this.list.filter((note) => {
                  if ((note.title.indexOf(this.filterSearch))>=0) {
                    return true;
                  } else {
                    return false;
                  }
                })
              }
            }
        
    }
})