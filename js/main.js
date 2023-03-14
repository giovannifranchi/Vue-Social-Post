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
            likedPosts: [],
        }
    },
    methods:{
        addLike(index){
            if(!this.users[index].hasClicked){
                this.users[index].hasClicked = true;
                this.users[index].likesNum++;
                this.likedPosts.push(this.users[index]);
            }else{
                this.users[index].hasClicked = false;
                this.users[index].likesNum--;
                this.likedPosts = this.likedPosts.filter((liked)=>{
                    return liked !== this.users[index];
                });
            }
            console.log(this.likedPosts);
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
                hasClicked: false,
            }
        });
        this.users = finalResults;
    }
}).mount('#app');
