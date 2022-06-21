import { Duration, Stack, StackProps } from "aws-cdk-lib";
import * as sns from "aws-cdk-lib/aws-sns";
import * as subs from "aws-cdk-lib/aws-sns-subscriptions";
import * as sqs from "aws-cdk-lib/aws-sqs";
import { Construct } from "constructs";

import {
  Code,
  Function as LambdaFunction,
  Runtime,
} from "aws-cdk-lib/aws-lambda";

import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";

import { join } from "path";
import { GenericTable } from "./GenericTable";

export class CdkStack extends Stack {
  private api = new RestApi(this, "SpaceApi");

  //dynamodb class를 따로 만들어서 (genericTable.ts) 가져와서 생성.
  private spaceTable = new GenericTable("SpaceTable", "spaceId", this);

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const helloLambda = new LambdaFunction(this, "helloLambda", {
      runtime: Runtime.NODEJS_16_X,
      code: Code.fromAsset(join(__dirname, "..", "services", "hello")),
      handler: "hello.main",
    });

    const helloLambdaIntegration = new LambdaIntegration(helloLambda);
    const helloLambdaResource = this.api.root.addResource("hello");
    helloLambdaResource.addMethod("GET", helloLambdaIntegration);
  }
}
