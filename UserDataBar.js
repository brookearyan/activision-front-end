import React from "react";
import { HorizontalBar, Doughnut, Pie } from "react-chartjs-2";

const UserBarData = props => {

  if (!props.categoryArray){
    return <div> loading </div>
  }

  if (!props.userInfo){
    return <div> loading </div>
  }

  // console.log("Inside CategoryDATA", props.categoryArray)
  // console.log("Inside UserDATA", props.userInfo.categories)


  const userCategories = props.userInfo.categories.map(category => {
    return category.name
  })

  const uniqueCatKeys = () => {
    // console.log('uniqueCAT')
    let newObj = {}
      for (let i = 0; i < userCategories.length; i++) {
        if (!newObj[`${userCategories[i]}`]) {
        newObj[`${userCategories[i]}`] = 1
    }   else {
        newObj[`${userCategories[i]}`] += 1
    }
  }
  // console.log("HERE", Object.keys(newObj))
  let newObjKeys = Object.keys(newObj)
  // uniqueCatValues(newObj);
  return newObjKeys
}

const uniqueCatValues = () => {
  // console.log('uniqueCAT')
  let newObj = {}
    for (let i = 0; i < userCategories.length; i++) {
      if (!newObj[`${userCategories[i]}`]) {
      newObj[`${userCategories[i]}`] = 1
  }   else {
      newObj[`${userCategories[i]}`] += 1
  }
}
// console.log("HERE", Object.values(newObj))
let newObjValues = Object.values(newObj)
// uniqueCatValues(newObj);
return newObjValues
}

// const uniqueCatValues = obj => {
//   console.log("inside uniqueCatValues");
//   console.log("obj is", obj);
//   console.log("--------------------------");
//   let objValues = Object.values(obj);
//   return objValues;
// }
// REFACTOR TO REDUCE FUNCTION
  // console.log("TESTING", uniqueCatKeys())
  //
  //
  // console.log("THIS", userCategories)


  const data = {
  		// labels: [props.coinHisto.map(coin => timeConverter(coin.time))],
      labels: [].concat(uniqueCatKeys()),
      datasets: [
        {
          label: 'frequency',
          data:[
            // 10,
            // 3,
            // 6,
            // 4,
            // 7,
            // 2
          ].concat(uniqueCatValues()),

          backgroundColor: [
            'rgba(0, 3, 51, 0.6)',
            'rgba(12, 12, 80, 0.6)',
            'rgba(28, 28, 114, 0.6)',
            'rgba(45, 45, 134, 0.6)',
            'rgba(64, 64, 152, 0.6)',
            'rgba(86, 86, 174, 0.6)',
            'rgba(108, 108, 192, 0.6)'
          ],
          borderWidth:1,
          borderColor: '#777',
          hoverBorderWidth:3,
          hoverBorderColor:'#000'
        }
      ]
  	};

  const options = {
    title:{
      display:true,
      text: 'number of events',
      fontSize: 15,
      fontWeight: 'normal'
    },
    legend: {
      display: true,
      position: 'below'
    }
  }


  return (
  		<div>
  			<HorizontalBar data={data} options={options} />
  		</div>
  	)

}

export default UserBarData;
