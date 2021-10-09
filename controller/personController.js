const excelToJson = require('convert-excel-to-json');
const Person = require("../model/personSchema");

module.exports =async function uploadController(req,res){
    await Person.deleteMany({})
    const excelData = excelToJson({
        source: req.file.buffer,
        sheets:[{
            name: 'Sheet1',
            header:{
                rows: 1
            },
            columnToKey: {
                A :"Name of the Candidate",
                B :"Email" ,
                C :"Mobile No.",
                D :"Date of Birth",
                E :"Work Experience",
                F :"Resume Title",
                G :"Current Location",
                H :"Postal Address",
                I :"Current Employer",
                J :"Current Designation"
            }
        }]
    });
    // console.log(excelData.Sheet1)
    await Person.insertMany(excelData.Sheet1,{ordered: false},()=>{
        res.redirect("http://localhost:8000/thankyou.html");
    })
}