import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";
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

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkPracQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
