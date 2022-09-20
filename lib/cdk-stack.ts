import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';

export class SpaceStack extends Stack {
    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        // lambda handler 의 경우 보통 services 로 따로 빼서 구성.
        // 그럼 service layer 에서 repository layer 분리해도 되는건가?
        // 단순 코드만 분리하는게 아니라 의존성 주입 패턴을 만들 수 있는건가? --> 런타임때 주입시켜줘야하는데 배포하면서 런타임이 도는건지 모르겠음. 나중에 테스트 해봐야함.
        const helloLambda = new LambdaFunction(this, 'helloLambda', {
            runtime: Runtime.NODEJS_14_X,
            code: Code.fromAsset(join(__dirname, '..', 'services', 'hello')), // fromAsset() 말고도 docker에서 함수를 가져오는 기능이랑 다른것들도 있음.
            handler: 'hello.main',
        });
    }
}
