const testing = (input) => {
   const iterations = +input[0];
   const opinions = input.split("\n").slice(1).map(element => element.split(' '))
   
   let data = {}

   opinions.forEach(opinion => {
      if (data[opinion[0]] === undefined ) {
         data[opinion[0]] = +opinion[1]
      }
      else {
         data[opinion[0]] += +opinion[1]
      }
   });

   const values = Object.values(data)
   data = Object.entries(data)

   const maxValue = values.reduce((a, b) => Math.max(a, b))
   const result = data.find(e => e[1] == maxValue)

   return [iterations, data, result]

}

const solution = testing(
`6
987 5
512 2
985 5
123 3
987 4
123 5
986 4
987 5
985 5
985 5`
)

console.log( solution )