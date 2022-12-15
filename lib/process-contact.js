import got from 'got';

/*
get data from endpoint in json format and parse it into a usable rendering format
*/

// set endpoint
const dataLoc = "https://dev-cs5513f.pantheonsite.io/wp-json/twentytwentyone-child/v1/contact-list";

export async function getInfo() {
  let jsonContent;

  try {
    jsonContent = await got(dataLoc);
  }catch(error){
    jsonContent.body=[];
  }  

  // parse acf_fields to remove custom fields and punctuations
  console.log(jsonContent.body);
  const jsonArrObj = JSON.parse(jsonContent.body); 
  console.log("1111111111");
  console.log(jsonArrObj);
  console.log("222222222");

  let y;
  let t;
  for (y=0; y<jsonArrObj.length; y++) {
    t=('{"'+jsonArrObj[y].acf_fields+'"}').replaceAll(':','":"').replaceAll(',','","').replaceAll('https','https:');
    console.log(t);
    jsonArrObj[y].acf_fields = JSON.parse(t);
  }
  console.log("333333333");
//  console.log(a);
  console.log(jsonArrObj);
  console.log("444444444");
  console.log(jsonArrObj[0].acf_fields.fname);
//  console.log(x);
//  console.log(x[0].fname);

  // use map() on array to extract properties into new array of obj values
  return jsonArrObj.map(item => {
    return {
      params: {
        id: item.ID.toString(),
        title: item.post_title,
        status: item.post_status,
        fname: item.acf_fields.fname,
        lname: item.acf_fields.lname,
        color: item.acf_fields.favcolor,
        imgurl: item.acf_fields.imgurl,
        imgalt: item.acf_fields.imgalt
      }
    }
  });
}

// get IDs from json data at endpoint to be used in dynamic path
export async function getIds() {
  let jsonString;
  try {
    jsonString = await got(dataLoc);
  }catch(error){
    jsonString.body=[];
    console.log(error);
  }
  // convert string into json array object
  const jsonObj = JSON.parse(jsonString.body);

  // use map() on array to extract just id properties into new array of obj values
  return jsonObj.map(item => {
    return {
      params: {
        id: item.ID.toString()
      }
    }
  });
}

 // get rest of data by ID
export async function getFavoriteData(idSelected) {
  let element;
  let jsonString;
  try {
    jsonString = await got(dataLoc);
  }catch(error){
    jsonString.body=[];
    console.log(error);
  }

  // convert data from file into json array object without html tags
  const jsonObj = JSON.parse(jsonString.body);

  let y;
  let t;
  for (y=0; y<jsonObj.length; y++) {
    t=('{"'+jsonObj[y].acf_fields+'"}').replaceAll(':','":"').replaceAll(',','","').replaceAll('https','https:');
    console.log(t);
    jsonObj[y].acf_fields = JSON.parse(t);
  }

  // find object value that matches the ID
  const objMatch = jsonObj.filter(obj => {
    // convert the id to a string
    return obj.ID.toString() === idSelected;
  });

  // extract object value in filtered array if any
  let objFound;
  // if there are more than one set of matched record
  // then only return the dynamic page for the first record
  if (objMatch.length > 0) {
    objFound = objMatch[0];
  // otherwise empty the array of data  
  } else {
    objFound = {};
  }

  // return object value found
  return objFound;
}