const notes = [
    {
      id: 1,
      content: 'HTML is easy',
      important: true
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false
    },
    {
      id: 3,
      content: 'GET and POST are the most important methods of HTTP protocol',
      important: true
    }
]
  
const result = notes.map(note => note.id)
console.log(result)
// 1.  [1, 2, 3] will be printed to the console. 
// 2. map always creates a new array.
// 3. the elements of the new array are created from the elements of the original array by mapping.
// 4. the mapping is done using the function given as a parameter to the map method.
// 5. the function is note => note.id
// 6. the full form is 
/*
(note) => {
    return note.id
}
*/
