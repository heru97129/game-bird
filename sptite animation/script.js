let cadre = document.querySelector('.cadre')
let ctx = cadre.getContext('2d')

cadre.width = innerWidth
cadre.height = innerHeight

// image burn sprite 
let image = document.querySelector('.bird')

let text  =  document.querySelector('.score')

// text lif left 
let textlife  =  document.querySelector('.life')

// image img 
let ennemyImg = document.querySelector('.ennemy')

// image bat 
let ennemybat = document.querySelector('.bat')

console.log(ennemyImg)
//  btn reset 
let btn = document.querySelector('.reset')

// frame 1 = 22

// frame 2 = 155

// frame 3 = 87

// max frame 90

//  reset the game 
btn.addEventListener('click',()=>{
    return document.location.reload(true)
})


//  THE BIRD CLASS
class Bird{

    constructor(x,y){
        this.x = 0
        this.y = innerHeight/2
        this.frame = 65.5
        this.typeFrame = [22,87,155]
        this.framechose 
        this.bol = false
        this.compte = 0
        this.comptelife = 5
    }

    draw(context){

        if(this.framechose === undefined){
            this.framechose = this.typeFrame[2]
        }
        context.drawImage(image,18 + this.frame ,this.framechose ,65,62,this.x,this.y,104,104);
    }
// wigs's movement of the bird
    update(){
       
        if(this.frame > 390){
            this.frame = 0
        }else{
            this.frame += 65
        }       
    }

    movefoward(number){
        this.framechose = this.typeFrame[1]

        if(this.x < 0){
         this.x = 0
        }
        
        if(this.x > innerWidth){
            this.x = -104

        }

        this.x += 20
    }

    movebackward(){
        this.framechose = this.typeFrame[1]

        if(this.x < 0){
         this.x = 0
        }
        
        if(this.x > innerWidth){
            this.x = -104

        }

        this.x -= 20
    }

    moveUp(){
      if(this.y < 0)[
          this.y = 0
      ]
     this.framechose = this.typeFrame[2]
     this.y -= 20
     console.log(this.y)
    }

    moveDown(){
        if(this.y >= innerHeight){
            this.y = innerHeight - 154
        }
        this.framechose = this.typeFrame[2]
        this.y += 20
      

       if(this.y >= innerHeight -104){
        this.y = innerHeight - 104
    }
}


//  collision with the ghost
intersection(bX,bY,element){
    if(bX < 0){
        this.bol = false
    }
    if(bX < this.x + 65 &&  bX > this.x  - 65 &&  bY  > this.y - 62 &&  bY < this.y + 70 && !this.bol ){
       console.log('hey')
       this.compte++
       console.log(this.compte)
       tabPart.splice(element,1)
       text.textContent = `THE SCORE IS : ${this.compte}`
       if(this.compte == 10){
     text.textContent = `You win Bravo `
      text.style =` 
    color:green;
    postion absolute; 
    top:45%;
    left:50%;
    transform : translate(-50%,50%);
    font-size : 4em;
    text-align : center  
    ` 
    btn.style = `
    display:block;
    position: absolute;
    top: 65%;
    left:45%;
    transform: translateX(-65%,45%);
    `
 
    return anime = cancelAnimationFrame(Animate)

}

       this.bol = true


    }

  }

// collision with the bat 
  intersectionBat(bX,bY,element){
    if(bX < 0){
        this.bol = false
    }
    if(bX < this.x + 65 &&  bX > this.x  - 65 &&  bY  > this.y - 62 &&  bY < this.y + 70 && !this.bol ){
       console.log('hey')
       this.comptelife--
    //    tabbat.splice(element,1)
       textlife.textContent = `LIFE LEFT : ${this.comptelife}`
       textlife.style = `
        color : red 
       `
       if(this.comptelife == 0){ text.textContent = `You loose dummy `
      text.style =` 

    color:red ;
    postion absolute; 
    top:45%;
    left:50%;
    transform : translate(-50%,50%);
    font-size : 4em;
    text-align : center
 
    ` 
    btn.style = `
    display:block;
    position: absolute;
    top: 65%;
    left:45%;
    transform: translateX(-65%,45%);
    `
    return anime = cancelAnimationFrame(Animate)
}

       this.bol = true


    }else{
        textlife.style = `
        color : black
       `     
    }

  }
}


//  GHOST ENNEMY 
class Ennemy{
   constructor(x,y){
       this.x = x 
       this.y = y
       this.bol = false
       this.compte = 0
   }

   draw(context){
       context.drawImage(ennemyImg,this.x,this.y,50,50)

   }

   update(){
       if(this.x < 0){
           this.x = Math.random() * innerWidth  + innerWidth - 100
           this.y = Math.random() * innerHeight           
       }
       this.x -= 110
   }
  

   
}

// BAT ENNEMY 
class Bat extends Ennemy {
    constructor(x,y){
        super()
        this.x = x
        this.y = y 
    }

    draw(context){
        context.drawImage(ennemybat,this.x,this.y,50,50)
 
    }
}

// bat Ennemy  ARRAY

let tabbat = []

// Ennemy food array 
let tabPart = []
let numberPart = 10

// ADD NEW PARTICULE IN ARRAY 
for(let i = 0 ; i < numberPart ; i++){
    // ghost
    tabPart.push(new Ennemy(Math.random() * innerWidth  + innerWidth - 100,Math.random() * innerHeight))
     if(i > 3){
        // bullet or bat 
    tabbat.push(new Bat(Math.random() * innerWidth  + innerWidth - 100,Math.random() * innerHeight))
       }
}

//  bird's object 
let bird = new Bird(0,0)

// CONTROL THE BIRD'S MOUVEMENT 
window.addEventListener('keydown',(e)=>{
    if(e.key == 'ArrowRight'){

     bird.movefoward(1)
   }

   if(e.key == 'ArrowLeft'){
  bird.movebackward()
  }

  if(e.key == 'ArrowUp'){
      bird.moveUp(-1)

      }

      if(e.key == 'ArrowDown'){
          bird.moveDown(1)
  
          }
})


let number = 0

// RECURSIVE FUNCTION 
function Animate(){


    if( number % 8 === 0 ){
        ctx.clearRect(0,0,innerWidth,innerHeight)
        // movement of the bird 
        bird.draw(ctx)
        bird.update()
// collision with ghost
        tabPart.forEach((el,i) =>{
            bird.intersection(el.x,el.y,i)

        })

        // ghost's movement 
        tabPart.forEach(el =>{

            el.draw(ctx)
            el.update()
        }) 

        // collision with bullet or bat and movement 
        tabbat.forEach((el,i)=>{
            bird.intersectionBat(el.x,el.y,i)

            el.draw(ctx)
            el.update()
        })
 
             
 
        
    }


   
    number += 1
    requestAnimationFrame(Animate)
}

Animate()

