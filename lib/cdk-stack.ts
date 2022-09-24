import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { GenericTable } from '../repository/GenericTable';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import * as s3n from 'aws-cdk-lib/aws-s3-notifications';
import * as path from 'path';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class SpaceStack extends Stack {
    // api gateway setting
    // private api = new RestApi(this, 'SpaceApi');

    // dynamodb setting
    // private spacesTable = new GenericTable('SpacesTable', 'spaceId', this);

    // private s3TestBucket = new Bucket(this, 'test', {
    //     bucketName: 'test',
    // });

    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        // lambda handler 의 경우 보통 services 로 따로 빼서 구성.
        // 그럼 service layer 에서 repository layer 분리해도 되는건가?
        // 단순 코드만 분리하는게 아니라 의존성 주입 패턴을 만들 수 있는건가? --> 런타임때 주입시켜줘야하는데 배포하면서 런타임이 도는건지 모르겠음. 나중에 테스트 해봐야함.
        // const helloLambda = new LambdaFunction(this, 'helloLambda', {
        //     runtime: Runtime.NODEJS_14_X,
        //     code: Code.fromAsset(join(__dirname, '..', 'services', 'hello')), // fromAsset() 말고도 docker에서 함수를 가져오는 기능이랑 다른것들도 있음.
        //     handler: 'hello.main',
        // });

        // const helloLambdaNodeJs = new NodejsFunction(this, 'helloLambdaNodeJs', {
        //     entry: join(__dirname, '..', 'services', 'node-lambda', 'hello.ts'),
        //     handler: 'handler',
        // });

        // // s3 권한 줘야 sdk 사용 가능
        // const s3ListPolicy = new PolicyStatement();
        // s3ListPolicy.addActions('s3:ListAllMyBuckets');
        // s3ListPolicy.addResources('*');
        // helloLambdaNodeJs.addToRolePolicy(s3ListPolicy);

        // api gateway setting
        // const helloLambdaIntegration = new LambdaIntegration(helloLambda);
        // const helloLambdaResource = this.api.root.addResource('hello');
        // helloLambdaResource.addMethod('GET', helloLambdaIntegration);

        const bucket = new s3.Bucket(this, 'Bucket');
        const fn = new lambda.Function(this, 'MyFunction', {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: 'hello.main',
            code: lambda.Code.fromAsset(path.join(__dirname, '..', 'services', 'hello')),
        });

        bucket.addEventNotification(s3.EventType.OBJECT_CREATED, new s3n.LambdaDestination(fn));
    }
}
