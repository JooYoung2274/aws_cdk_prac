// import { S3 } from 'aws-sdk';

import { SQS } from 'aws-sdk';

async function sqsExampleHandler(event: any, context: any) {
    const sqs = new SQS({ apiVersion: '2022-09-26' });

    const params = {
        MessageBody: 'My msg body',
        QueueUrl: 'sqs URL 입력',
    };

    const response = await sqs.sendMessage(params).promise();
    return {
        statusCode: 200,
        body: JSON.stringify(response),
    };
}

export { sqsExampleHandler };

// 디펜던시가 포함된 Lambda-nodejs 코드
// npm install --save-dev esbuild@0 해당 라이브러리를 통해 사용 가능함.
// 웹팩설정보다 훨씬 편함
