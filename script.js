const numElements=document.getElementById("numElements");
const speedEl=document.getElementById("speed");

const algorithm=document.getElementById("algorithm");

const elementsContainer=document.getElementById('elements');

const sortBtn=document.getElementById("sort");


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
    // console.log(elementNode);



  })

}




function mountDom(){
  
  // console.log(numberOfElements);


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
    // console.log(elementNode);



  })

  elementsDom=document.querySelectorAll('.element');
  

  // console.log(numbers)

}


// function bubbleSort(){
//   const elementArr=document.querySelectorAll(".element");
//   let i=0,j=0;
//   const outerloop=setInterval(()=>{
//     j=0;
//     if(i===numberOfElements-1){
//       clearInterval(outerloop);
//     }


//     const innerloop=setInterval(()=>{
//       [elementArr[j].style.height,elementArr[j+1].style.height]=[`${numbers[j]}px`,`${numbers[j+1]}px`];
//       // console.log(j);
//       j=j+1;
//       if(j===numElements-i-1){
//         clearInterval(innerloop);
//       }
//     },400)

//     i=i+1;
    
//   },200)
  
  

// }


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
  algorithm.disabled=true;
}

function makeEnable(){
  sortBtn.disabled=false;
  numElements.disabled=false;
  algorithm.disabled=false;
}
   









// event listeners


speedEl.addEventListener("change",(e)=>{
  speed=e.target.value;
  console.log(speed);
  
})

numElements.addEventListener("change",(e)=>{

  for(let i=0;i<numberOfElements;i++){
    numbers.pop();
  }

  numberOfElements=e.target.value;
  
  mountDom();


})

sortBtn.addEventListener("click",()=>{
    makeDisable();
    console.log("hello");
    
    const animations=bubbleSort();
    // console.log(animations);
    console.log(numbers);
    var i=0,count=0;
    try{


    var loop=setInterval(()=>{
      if(i===animations.length-1){
        makeEnable();
        sorted();
        clearInterval(loop);
        
      }

      setTimeout(()=>{

        
        elementsDom[animations[i][0]].classList.remove("yellow");
        elementsDom[animations[i][1]].classList.remove("yellow");
          elementsDom[animations[i][0]].classList.add("red");
        elementsDom[animations[i][1]].classList.add("red");
        
        
                

        // elementsDom[animations[i][0]].classList.add("yellow");
        // elementsDom[animations[i][1]].classList.add("yellow");
        // elementsDom[animations[i][1]].classList.remove("yellow");
        // elementsDom[animations[i][0]].classList.remove("yellow");
        setTimeout(()=>{
          
        },speed)
        if(animations[i][2]===true){
          elementsDom[animations[i][0]].style.height=`${numbers[animations[i][1]]}px`;
          elementsDom[animations[i][1]].style.height=`${numbers[animations[i][0]]}px`;

          elementsDom[animations[i][0]].innerText=`${numbers[animations[i][1]]}`;
          elementsDom[animations[i][1]].innerText=`${numbers[animations[i][0]]}`;

          console.log(animations[i][0]," ",animations[i][1]);
          let temp=numbers[animations[i][0]];
          numbers[animations[i][0]]=numbers[animations[i][1]];
          numbers[animations[i][1]]=temp;
          // [numbers[animations[i][0]],numbers[animations[i][1]]]=[numbers[animations[i][1]],numbers[animations[i][0]]]


          
        }
        setTimeout(()=>{
          elementsDom[animations[i][0]].classList.remove("red");
        elementsDom[animations[i][1]].classList.remove("red");

        elementsDom[animations[i][0]].classList.add("yellow");
        elementsDom[animations[i][1]].classList.add("yellow");
        },speed);

        
        



        // updateDom();
        i++;
        count++;
              
      


      },speed);



      
      

    },speed)
  }
  catch(err){
    // clearInterval(loop);
    makeEnable();
    // console.log(err);
  }
  
})

