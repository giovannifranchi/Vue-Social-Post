const {createApp} = Vue;

function createRandomNum(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomDate() {
    let objectDate = new Date(+(new Date()) - Math.floor(Math.random() * 10000000000));
    let day = objectDate.getDate();
    let month = objectDate.getMonth() + 1;
    let year = objectDate.getFullYear(); 
    let format = `${month}/${day}/${year}`;
    return format;
}

createApp({
    data(){
        return {
            users: [],
        }
    },
    methods:{
        display(){
            console.log(this.users[0].postDate);
        }
    },
    async created(){
        const res = await fetch('https://randomuser.me/api/?results=8');
        const {results} = await res.json();
        const finalResults = results.map(()=>{
            return {
                ...results,
                likesNum: createRandomNum(0, 200),
                postDate: getRandomDate(),
            }
        });
        this.users = finalResults;
    }
}).mount('#app');
