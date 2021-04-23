const numElements=document.getElementById("numElements");
const speedEl=document.getElementById("speed");
const algorithm=document.getElementById("algorithm");
const elementsContainer=document.getElementById('elements');
const sortBtn=document.getElementById("sort");
const randomize=document.getElementById("randomize");
var speed=speedEl.value;
let numberOfElements=numElements.value;
let numbers=[];
let elementsDom;

mountDom();

function updateDom(){
  elementsContainer.innerHTML="";
  numbers.forEach((number,id)=>{
    let elementNode=document.createElement("div");
    elementNode.classList.add("element");
    elementNode.classList.add("normal");
    elementNode.style.height=`${number}px`;
    elementNode.innerText=`${number}`;
    elementsContainer.appendChild(elementNode);
  })

}

function mountDom(){
  for(let i=0;i<numberOfElements;i++){
    numbers[i]=(Math.floor((Math.random() * 400) + 1));
  }

  elementsContainer.innerHTML="";
   
  numbers.forEach((number,id)=>{
    let elementNode=document.createElement("div");
    elementNode.classList.add("element");
    elementNode.classList.add("normal");
    elementNode.style.height=`${number}px`;
    elementNode.innerText=`${number}`;
    elementsContainer.appendChild(elementNode);
  })
  elementsDom=document.querySelectorAll('.element');
}


function bubbleSort(){
  let auxillaryArray=[...numbers];
  const animations=[];
  for(let i=0;i<numberOfElements-1;i++){
    for(let j=0;j<numberOfElements-i-1;j++){
      
      if(auxillaryArray[j]>auxillaryArray[j+1]){
        animations.push([j,j+1,true]);
        let temp=auxillaryArray[j];
        auxillaryArray[j]=auxillaryArray[j+1];
        auxillaryArray[j+1]=temp;
      }
      else{
        animations.push([j,j+1,false]);
      }

    }
  }
  return animations;
}

sorted=()=>{
  elementsContainer.innerHTML="";
  numbers.forEach((number,id)=>{
    let elementNode=document.createElement("div");
    elementNode.classList.add("element");
    elementNode.classList.add("green");
    elementNode.style.height=`${number}px`;
    elementNode.innerText=`${number}`;
    elementsContainer.appendChild(elementNode); 
  }) 

}

function makeDisable(){
  sortBtn.disabled=true;
  numElements.disabled=true;
  speedEl.disabled=true;
  algorithm.disabled=true;
  // randomize.style.display=none;
}

function makeEnable(){
  sortBtn.disabled=false;
  numElements.disabled=false;
  speedEl.disabled=false;
  algorithm.disabled=false;
  // randomize.style.display=block;
}
   

function resetArray(arr){
  let len=arr.length;
  for(let i=0;i<len;i++){
    arr.pop()

  }
}


function addClass(domElement,color){
  domElement.classList.add(color);
}

function removeClass(domElement,color){
  domElement.classList.remove(color);
}


function setHeight(domElement,height){
  domElement.style.height=`${height}px`;
}

function setText(domElement,height){
  domElement.innerText=`${height}`;
}





// event listeners


randomize.addEventListener("click",()=>{
  mountDom();
})

speedEl.addEventListener("change",(e)=>{
  speed=e.target.value;
  console.log(speed);
  
})

numElements.addEventListener("change",(e)=>{
  resetArray(numbers);
  numberOfElements=e.target.value;
  mountDom();
})

sortBtn.addEventListener("click",()=>{
    makeDisable();
    const animations=bubbleSort();
    var i=0,count=0;
    try{
    var loop=setInterval(()=>{
      if(i===animations.length){
        makeEnable();
        sorted();
        clearInterval(loop);
      }

      setTimeout(()=>{
        removeClass(elementsDom[animations[i][0]],"yellow");
        removeClass(elementsDom[animations[i][1]],"yellow");

        addClass(elementsDom[animations[i][0]],"red");
        addClass(elementsDom[animations[i][1]],"red");

        if(animations[i][2]===true){

          // updating dom bar
          setHeight(elementsDom[animations[i][0]],numbers[animations[i][1]]);
          setHeight(elementsDom[animations[i][1]],numbers[animations[i][0]]);
          
          // updating dom text
          setText(elementsDom[animations[i][0]],numbers[animations[i][1]]);
          setText(elementsDom[animations[i][1]],numbers[animations[i][0]]);

          // actual swapping of numbers in array
          let temp=numbers[animations[i][0]];
          numbers[animations[i][0]]=numbers[animations[i][1]];
          numbers[animations[i][1]]=temp;
 
        }
        setTimeout(()=>{
          removeClass(elementsDom[animations[i][0]],"red");
          removeClass(elementsDom[animations[i][1]],"red");

          addClass(elementsDom[animations[i][0]],"yellow");
          addClass(elementsDom[animations[i][1]],"yellow"); 
        },speed);
        i++;
        count++;
      },speed);
    },speed)
  }
  catch(err){
    makeEnable();
  }
  
})

