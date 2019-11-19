const data = [
  { id: 1, title: "Hello" },
  { id: 2, title: "Mixi" }
];

let input = "Hello";

let output = data.filter(item => {
  return item.title === input;
});

console.log(output);
