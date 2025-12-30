let addbtn = document.getElementById("addbtn")
let tasklist = document.getElementById("tasklist")
let input = document.getElementById("taskinput")
let timervalue = document.getElementById("timervalue")
let deletelist =document.getElementById("delete")
let completeitem = document.getElementById("complete")

addbtn.addEventListener("click",() =>{

   let text = input.value.trim();
   if (text === "") return alert("Please add task")

   let li = document.createElement("li")
   li.style.transition=".3s"

   let now = new Date();
   let time = now.toLocaleTimeString(); 

   let taskspan = document.createElement("span")
   taskspan.innerText=`${text} (added : ${time})`

   let timerspan = document.createElement("span")
   timerspan.style.marginLeft ="10px"
   timerspan.style.color ="yellow"

   li.appendChild(taskspan)
   li.appendChild(timerspan)

   // delete button
   let dltbtn = document.createElement("button")
   dltbtn.innerText = "❌"

   dltbtn.addEventListener("click",()=>{

    clearInterval(timer)

    li.style.transform="translateX(60px)"
    li.style.opacity="0"

    setTimeout(()=>{
        if(tasklist.contains(li)){
            tasklist.removeChild(li)

            let deleteitem = document.createElement("li")
            deleteitem.innerText =`${text} -- deleted manually at (${new Date().toLocaleTimeString()})`
            deletelist.appendChild(deleteitem)
        }
    },200)

   })

   // complete button
   let compbtn = document.createElement("button")
   compbtn.innerText = "✅"

   compbtn.addEventListener("click",()=>{

    clearInterval(timer)

    li.style.boxShadow="0 0 15px lightgreen"
    li.style.transform="translateY(-3px)"

    setTimeout(()=>{
        if(tasklist.contains(li)){
            tasklist.removeChild(li)

            let completelist = document.createElement("li")
            completelist.innerText =`${text} -- completed at (${new Date().toLocaleTimeString()})`
            completeitem.appendChild(completelist)
        }
    },200)

   })

   li.appendChild(compbtn)
   li.appendChild(dltbtn)
   tasklist.appendChild(li)

   input.value =""

   let useminit = parseInt(timervalue.value);
   if (isNaN(useminit)||useminit <= 0) useminit=1
   timervalue.value=""

   let timeleft = useminit*60

   let timer =  setInterval(()=>{

    let minit = Math.floor(timeleft/60)
    let sec = timeleft % 60

    let formate = `${minit.toString().padStart(2,"0")}:${sec.toString().padStart(2,"0")}`

    timerspan.innerText=`⏳ ${formate}`

    if(timeleft <=0){
        clearInterval(timer)

        li.style.opacity=".3"
        li.style.transform="translateX(-40px)"

        setTimeout(()=>{

            if(tasklist.contains(li)){
                tasklist.removeChild(li)

                let deleteitem = document.createElement("li")
                deleteitem.innerText =`${text} -- auto deleted at (${new Date().toLocaleTimeString()})`
                deletelist.appendChild(deleteitem)
            }
        },200)
    }

    timeleft--
   },1000)
})
