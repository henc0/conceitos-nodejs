const express = require("express"); // add library plugins to node
const cors = require("cors"); // Cross-origin resource sharing
//allows restricted resources on a web page to be requested from another domain outside
const { uuid } = require("uuidv4"); // random ID
const app = express(); // variable to run function express

app.use(express.json()); // use value active plugins
app.use(cors());

const repositories = []; // variable with empty array (to add objects)

app.get("/repositories", (request, response) => {
  return response.json(repositories); // load page repositories static
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body; // all variable have request.body
  const repository = {
    // OBJECT
    id: uuid(), // random id user dynamic
    title, // static (title: title = title,)
    url, // static   (property: value)
    techs, // static
    likes: 0, // static starting in 0
  };
  repositories.push(repository); // add array

  return response.json(repository); // return response in format json
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params; // :id changing
  const { title, url, techs } = request.body; // example.com or /title or /techs
  //Array.findIndex()
  const repository = repositories.findIndex(
    //returns the index of the first element in the array
    (repository) => repository.id === id // repository.request.params = id(uuid);
  );
  // condition - when dont have id return error 400
  if (repository < 0) {
    return response.status(400).json({ err: "Repository not found" });
  }
  const oldRepository = repositories[repository]; // pass an empty variable to old variable

  const updateRepository = {
    ...oldRepository, // ... take all information about variable
    title,
    url,
    techs,
  };

  repositories[repository] = updateRepository;

  return response.json(updateRepository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repository = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repository < 0) {
    return response.status(400).json({ err: "Repository not found" });
  }

  repositories.splice(repository, 1); // removing or replacing existing elements and/or adding new elements

  return response.status(204).send(); // return status 204
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repository = repositories.find((repository) => repository.id === id);
  if (!repository) {
    return response.status(400).send();
  }
  repository.likes += 1; // count +1 in likes property

  return response.json(repository);
});

module.exports = app;
