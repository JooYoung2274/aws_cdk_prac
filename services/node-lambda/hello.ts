// import { S3 } from 'aws-sdk';
import { v4 } from 'uuid';

// const s3Client = new S3();

async function handler(event: any, context: any) {
    // const buckets = await s3Client.listBuckets().promise();

    // console.log(event);
    return {
        statusCode: 200,
        body: 'Here are your buckets' + v4(),
    };
}

export { handler };

// 디펜던시가 포함된 Lambda-nodejs 코드
// npm install --save-dev esbuild@0 해당 라이브러리를 통해 사용 가능함.
// 웹팩설정보다 훨씬 편함
