// Merge sort for every university 
function MergeSort(array){
  if (array.length <= 1){
    return array;
  };
  const middle = Math.floor(array.length / 2);
  //console.log("Hi MergeSort");
  return Merge(MergeSort(array.slice(0, middle)), MergeSort(array.slice(middle)));
}
  
function Merge(left, right){
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  while(leftIndex < left.length && rightIndex < right.length){
    // console.log("Hi Merge");
    let leftValue = Number(left[leftIndex].ResearchOutput) + left[leftIndex].SFRatio + left[leftIndex].InterStu + left[leftIndex].FCount;
    let rightValue = Number(right[rightIndex].ResearchOutput) + right[rightIndex].SFRatio + right[rightIndex].InterStu + right[rightIndex].FCount;
    if(leftValue > rightValue){
      result.push(left[leftIndex]);
      leftIndex++;
      //console.log("Hi Left");
      //console.log(leftValue, rightValue);
    } 
    else{
      result.push(right[rightIndex]);
      rightIndex++;
      //console.log("Hi right");
      //console.log(leftValue, rightValue);
    }
  }
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}