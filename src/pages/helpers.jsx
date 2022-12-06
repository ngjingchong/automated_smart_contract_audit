

export function firstLetterUppercase(string, delimeter, spliter) {
  var words = string.split(delimeter)

  words.map((w,index) => (
    words[index] = w.charAt(0).toUpperCase() + w.slice(1)
  ));

  return words.join(spliter)
}

export function matrixDeviation (matrix) {
  const base_score = 4
  const sum_score = matrix.reduce((total, currentValue) => total = total + currentValue,0)
  
  // console.log(matrix)
  // console.log(sum_score)
  return sum_score/(base_score * matrix.length)*base_score
}