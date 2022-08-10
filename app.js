function getRandomValue(max,min){
    return Math.floor(Math.random(max-min)+min)
}

const app = Vue.createApp({
    data(){
        return{
            monsterHealth:100,
            playerHealth:100,
            currentRound:0,
            winner:null,
            logMessage:[]
        }
    },
    watch:{
        monsterHealth(value){
            if(value <= 0 && this.playerHealth <=0){
                this.winner = "Drawn"
            }else if(value != 0 && this.playerHealth <=0){
                this.winner = "monster"
            }
            
        },
        playerHealth(value){
            if(value <= 0 && this.monsterHealth <=0){
                this.winner = "Drawn"
            }else if(value != 0 && this.monsterHealth <=0){
                this.winner = "player"
            }
        }
    },
    methods: {
        startNewGame(){
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.winner = null;
            this.currentRound = 0;
            this.logMessage = []
        },
        attackMonster(){
            this.currentRound++
            const attackValue = getRandomValue(12,5);
            this.monsterHealth -= attackValue
            this.attackPlayer()
            this.addLogMessege('player','attack',attackValue)
        },
        attackPlayer(){
            const attackValue = getRandomValue(15,8);
            this.playerHealth -= attackValue
            this.addLogMessege('monster','attack',attackValue)
        },
        specialAttack(){
            this.currentRound++
            const attackValue = getRandomValue(25,10);
            this.monsterHealth -= attackValue;
            this.attackPlayer()
            this.addLogMessege('player','attack',attackValue)
        },
        healPlayer(){
            this.currentRound++
            const attackValue = getRandomValue(8,20);
            if(this.playerHealth + attackValue > 100){
                this.playerHealth = 100;
            }else{
                this.playerHealth += attackValue;
            }
            this.attackPlayer(); 
            this.addLogMessege('player','heal',attackValue)
        },
        surrender(){
            this.winner="monster";
            this.playerHealth = 0
        },
        addLogMessege(who,what,value){
            return this.logMessage.unshift({
                actionBy: who,
                actionType : what,
                actionValue: value
            })
        }
    },
    computed:{
        monsterVarStyles(){
            if(this.monsterHealth <= 0 ){
                return {width : '0%'}
            }
            return {width:this.monsterHealth + "%"}
        },
        playerVarStyles(){
            if(this.playerHealth <= 0 ){
                return {width : '0%'}
            }
            return {width:this.playerHealth + "%"}
        },
        mayUseSpecialAttack(){
            return this.currentRound % 3 !== 0;
        },
        mayUserHeal(){
            return this.currentRound % 3 !==0;
        }

    }

})

app.mount('#game')