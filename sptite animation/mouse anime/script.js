let cadre  = document.querySelector('.cadre')
let ctx = cadre.getContext('2d')


cadre.width = innerWidth
cadre.height = innerHeight

let mouse = {
    x : null,
    y : null,
    radius : 50
}

ctx.fillStyle = 'green'
ctx.font = '30px Verdana'
ctx.fillText('LIFE',0,30)
const textCoordinates = ctx.getImageData(0 ,0 ,100,100)
ctx.fill()

console.log(textCoordinates)

window.addEventListener('mousemove',function(event){
     mouse.x = event.x    
     mouse.y = event.y

})


class Particule{
    constructor(x,y){
        this.x = x
        this.y = y
        this.r = 2
        this.baseX = this.x
        this.baseY = this.y 
        this.density = (Math.random() * 10) + 5
    }

    draw(context){
        context.beginPath()
        context.arc(this.x,this.y,this.r,0,Math.PI* 2)
        context.fillStyle = 'blue'
        context.fill()
        context.closePath()
    }

    collision(){

       let dX = mouse.x - this.x
       let dY = mouse.y - this.y
       let distance = Math.sqrt(dX * dX + dY * dY)
       let forcDirectionX = dX / distance * 3
       let forcDirectionY = dY/distance  * 3
       let maxDistance = mouse.radius
       let force = (maxDistance - distance) / maxDistance
       let directionX = forcDirectionX * force * this.density
       let directionY = forcDirectionY * force * this.density

       if(distance < mouse.radius){
           this.x += directionX
           this.y += directionY

       }else{
           if(this.x != this.baseX){
        let dX = this.x - this.baseX
        this.x -= dX/5
    }

        if(this.y != this.baseY){
            let dy = this.y - this.baseY
            this.y -= dy/5
        }
       }
       
    }
}
let tabParticules = []

function Init(){
 tabParticules = []

for(let y = 0, y2 = textCoordinates.height; y < y2 ; y++){
    for(let x = 0 ,x2 = textCoordinates.width ;x < x2 ;x++){
        if(textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128){
            let positionX = x
            let positionY = y
            tabParticules.push(new Particule(positionX  * 10, positionY * 10))
        }
    }
}

}

Init()
console.log(tabParticules)
function Animate(){
    ctx.clearRect(0,0,innerWidth,innerHeight)
    tabParticules.forEach(el =>{
        el.draw(ctx)
        el.collision()
    })
    requestAnimationFrame(Animate)
}

Animate()



// tabParticules = []
// let nombparticules = 700
// for(let i = 0 ; i < nombparticules ; i++){
//     tabParticules.push(new Particule())
// }