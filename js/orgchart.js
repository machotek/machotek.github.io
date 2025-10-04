document.addEventListener("DOMContentLoaded", () => {
  const people = document.querySelectorAll(".person");

  people.forEach(person => {
    person.addEventListener("click", () => {
      alert(`You clicked on ${person.querySelector("p").innerText}`);
    });
  });
});
