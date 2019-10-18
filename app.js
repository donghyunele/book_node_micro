/*
get, post 요청에 대해 모두 스택이 반환되는 이유는 다음 경로가 있는 경우
전달하도록 next()를 호출했기 때문이다.
*/
let express = require('express')
let app = express();
let body = require('body-parser')
let route = express.Router()
let stack = [];

app.use(body.text({ type: "*/*" }));

route.post("/", (req, res, next) => {
  stack.push(req.body);

  return next();
})

route.delete("/", (req, res, next) => {
  stack.pop();
  
  return next();
})

route.get("/:index", (req, res) => {
  if (req.params.index >= 0 && req.params.index < stack.length) {
    return res.end("" + stack[req.params.index]);
  }
  res.status(404).end();
});

route.use((req,res) => {
  res.send(stack);
})

app.use("/stack", route);

app.listen(3000)
