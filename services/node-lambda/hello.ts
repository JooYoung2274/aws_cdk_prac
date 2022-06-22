import { v4 } from "uuid";

async function handler(event: any, context: any) {
  return {
    statusCode: 200,
    body: "Hello from lambda" + v4,
  };
}

export { handler };

// 디펜던시가 포함된 Lambda-nodejs 코드
// npm install --save-dev esbuild@0 해당 라이브러리를 통해 사용 가능함.
