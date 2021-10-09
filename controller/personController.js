const excelToJson = require('convert-excel-to-json');
const Person = require("../model/personSchema");
const async = require("async")

module.exports = async function uploadAsyncController(req,res){
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

    let mails=[];
    async.eachSeries(excelData.Sheet1, async (Row, callback) => {
        if(Row["Name of the Candidate"]!==""&&Row["Email"]!==""){
            if(mails.indexOf(Row["Email"])===-1){
                try{
                    let Name=Row["Name of the Candidate"]
                    const newData = await new Person({
                        "Name of the Candidate": Name,
                        "Email": Row["Email"],
                        "Mobile No.": Row["Mobile No."],
                        "Date of Birth": Row["Date of Birth"].toISOString(),
                        "Work Experience": Row["Work Experience"],
                        "Resume Title": Row["Resume Title"],
                        "Current Location": Row["Current Location"],
                        "Postal Address": Row["Postal Address"],
                        "Current Employer": Row["Current Employer"],
                        "Current Designation": Row["Current Designation"]
                    });
                    await newData.save();
                    mails.push(Row["Email"]);
                }catch(e){
                    callback(e);
                }
            }
        }
        callback();
      }, function(err){
          if(err){
            console.log(err);
            res.send("something bed happen, ERROR!")
        }
        else{
            // res.json({"No. of Rows Added": mails.length});
            res.redirect("http://localhost:8000/thankyou.html");
          }
      });
}