import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { CfnOutput, Duration } from "aws-cdk-lib";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkPracStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // new Bucket(this, "someBucket"); 이것도 가능
    const myBucket = new Bucket(this, "someBucket", {
      lifecycleRules: [
        {
          expiration: Duration.days(5),
        },
      ],
    });

    new CfnOutput(this, "myBucket", {
      value: myBucket.bucketName,
    });

    const dynamodbTable = new dynamodb.Table(this, "jooTable", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING }, // 물음표 없는게 필수속성
      replicationRegions: ["us-east-1", "us-east-2", "us-west-2"],
      billingMode: dynamodb.BillingMode.PROVISIONED, // 결제 방법
    });

    dynamodbTable
      .autoScaleWriteCapacity({
        minCapacity: 1,
        maxCapacity: 10,
      })
      .scaleOnUtilization({ targetUtilizationPercent: 75 }); // Auto Scaling
    
    
    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkPracQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
