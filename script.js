const numElements=document.getElementById("numElements");
const speedEl=document.getElementById("speed");
const algorithm=document.getElementById("algorithm");
const elementsContainer=document.getElementById('elements');
const sortBtn=document.querySelectorAll(".sort");
const randomize=document.getElementById("randomize");
const bubbleBtn=document.getElementById("bubble");
const selectionBtn=document.getElementById("selection");
const insertionBtn=document.getElementById("insertion");
const quickBtn=document.getElementById("quick");
const mergeBtn=document.getElementById("merge");
// let algo=algorithm.value;
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


function selectionSort(){
  let auxillaryArray=[...numbers];
  const animations=[];
  for(let i=0;i<numberOfElements-1;i++){
    let minidx=i;
    for(let j=i+1;j<numberOfElements;j++){
      animations.push([minidx,j,false]);
      if(auxillaryArray[j]<auxillaryArray[minidx]){
        
        minidx=j;
      }
    }
    let temp=auxillaryArray[minidx];
    auxillaryArray[minidx]=auxillaryArray[i];
    auxillaryArray[i]=temp;
    animations.push([minidx,i,true]);
    

  }

  return animations;
}

function bubbleSortWithAnimation(animations){
  makeDisable();
  
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
}


function selectionSortWithAnimation(animations){

  makeDisable();
  
  var i=0,count=0;
  try{
  var loop=setInterval(()=>{
    if(i===animations.length){
      makeEnable();
      sorted();
      clearInterval(loop);
    }

    setTimeout(()=>{

      removeClass(elementsDom[animations[i][0]],"red");
      removeClass(elementsDom[animations[i][1]],"red");

      removeClass(elementsDom[animations[i][0]],"yellow");
      removeClass(elementsDom[animations[i][1]],"yellow");

 

      if(animations[i][2]===true){
        // addClass(elementsDom[animations[i][0]],"red");
        addClass(elementsDom[animations[i][1]],"red"); 

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

        setTimeout(()=>{
          removeClass(elementsDom[animations[i][0]],"red");
          removeClass(elementsDom[animations[i][1]],"red");
        },speed)

      }

      else{
        setTimeout(()=>{
          addClass(elementsDom[animations[i][0]],"yellow");
          addClass(elementsDom[animations[i][1]],"yellow");

        },speed)
      }
      setTimeout(()=>{

      },speed);
      i++;
      count++;
    },speed);
  },speed)
}
catch(err){
  makeEnable();
}

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
  sortBtn.forEach((btn)=>
    btn.disabled=true
  )
  numElements.disabled=true;
  speedEl.disabled=true;
  // algorithm.disabled=true;
  randomize.disabled=true;
}

function makeEnable(){
  sortBtn.forEach((btn)=>
  btn.disabled=false
)
  numElements.disabled=false;
  speedEl.disabled=false;
  // algorithm.disabled=false;
  randomize.disabled=false;
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

// algorithm.addEventListener("change",(e)=>{
//   algo=e.target.value;
// })


bubbleBtn.addEventListener("click",()=>{
  animations=bubbleSort();
  console.log("bubble");
  bubbleSortWithAnimation(animations);
})


selectionBtn.addEventListener("click",()=>{
  animations=selectionSort();
  console.log("selection");
  selectionSortWithAnimation(animations);
})

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

// sortBtn.addEventListener("click",()=>{

//     console.log(algo)
//     if(algo===1){
//       animations=bubbleSort();
//       console.log("bubble");
//       bubbleSortWithAnimation(animations);
//     }

        

//       if(algo===2){
//         animations=selectionSort();
//         console.log("selection");
//         selectionSortWithAnimation(animations);
//       }

        


    
// })

