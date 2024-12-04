const express = require('express')
const app = express()

// Read,Write files - File System (Build in) Node.js
let fs = require('fs/promises') 

// ทำ Async แบบ Serial โดยใช้ promise-based 
async function createRobotFile () {

    
    const head = await fs.readFile('head.txt','utf8')
    const body = await fs.readFile('body.txt','utf8')
    const leg = await fs.readFile('leg.txt','utf8')
    const feet = await fs.readFile('feet.txt','utf8')
    
    const text = head + '\n' + body + '\n' + leg + '\n' + feet + '\n'
    await fs.writeFile('robot.txt', text , 'utf8')
 }

 // call fuction
 createRobotFile()
 
// Callback Hell!!!
// fs.readFile('head.txt','utf8',(err,data) => {
    // var text = data + '\n'
    // fs.readFile('body.txt','uft8',(err,data) =>{
       // text += data + '\n'
        // fs.readFile('leg.txt','uft8',(err,data) =>{
           // text += data + '\n'
           // fs.readFile('feet.txt','uft8',(err,data) =>{
               // text += data + '\n'
              //  fs.writeFile('robot.txt',text,'uft8',(err) => {
                   // if (err) console.error ("Cannot Write File")
                   // else console.log("Write file robot.txt complete!")
              //  })
          //  })
       // })
  //  })
// })

app.listen(3000, () => {
    console.log("Server started on port 3000")
})