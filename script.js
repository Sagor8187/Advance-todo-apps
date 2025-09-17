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
           let now = new Date();
           let time = now.toLocaleTimeString(); 
           let taskspan = document.createElement("span")
           taskspan.innerText=`${text} (added : ${time})`
           let timerspan = document.createElement("span")
           timerspan.style.marginLeft ="10px"
           timerspan.style.color ="red"
           li.appendChild(taskspan)
           li.appendChild(timerspan)
           let dltbtn = document.createElement("button")
           dltbtn.innerText = "❌"


           dltbtn.addEventListener("click",()=>{
            clearInterval(timer)
            tasklist.removeChild(li)

            let deleteitem = document.createElement("li")
            deleteitem.innerText =`${text} -- deleted manual at (${new Date().toLocaleTimeString()})`
            deletelist.appendChild(deleteitem)
           })

           let compbtn = document.createElement("button")
           compbtn.innerText = "✅"
           compbtn.style.marginLeft ="10px"
           compbtn.addEventListener("click",()=>{
            clearInterval(timer)
            if(tasklist.contains(li)){
                tasklist.removeChild(li);

                let completelist = document.createElement("li")
                completelist.innerText =`${text} -- complete (${new Date().toLocaleTimeString()})`
                completeitem.appendChild(completelist)
            }
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
            let seceond = timeleft % 60
            let formate = `${minit.toString().padStart(2,"0")}:${seceond.toString().padStart(2,"0")}`
            timerspan.innerText=`(Remaining :${formate})`

            if(timeleft <=0){
                clearInterval(timer)
                if(tasklist.contains(li)){
                    tasklist.removeChild(li)
                    alert(`${text} is remove `)

                    let deleteitem = document.createElement("li")
                    deleteitem.innerText =`${text} -- deleted auto at (${new Date().toLocaleTimeString()})`
                    deletelist.appendChild(deleteitem)
                    
                }
            }
            timeleft--


           },1000)
        })