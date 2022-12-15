import got from 'got';

/*
get data from endpoint in json format and parse it into a usable rendering format
*/

// set endpoint
const dataLoc = "https://dev-cs5513f.pantheonsite.io/wp-json/twentytwentyone-child/v1/goal-list";

export async function getInfo2() {
  let element;
  let jsonContent;
  let name = [];

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


  // use map() on array to extract properties into new array of obj values
  return jsonArrObj.map(item => {
    return {
      params: {
        id: item.ID.toString(),
        title: item.post_title,
        status: item.post_status,
        category: item.category,
        details: item.details,
        timeframe: item.timeframe,
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