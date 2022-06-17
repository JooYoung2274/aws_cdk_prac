import { CfnParameter, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { CfnOutput, Duration } from "aws-cdk-lib";

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkPracStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // 만료기간을 이렇게 지정할수 있음.
    // minValue, maxValue는 배포할 때 지정할 수 있는 duration의 범위를 지정함.
    // cdk deploy --parameters duration=11 이면 1~10범위를 넘기 때문에 에러.
    const duration = new CfnParameter(this, "duration", {
      type: "Number",
      default: 6,
      minValue: 1,
      maxValue: 10,
    });

    // new Bucket(this, "someBucket"); 이것도 가능
    // lifecycleRules 처럼 객체타입으로 S3에 대한 세팅(?!)을 해줄 수 있음
    //     const myBucket = new Bucket(this, "someBucket", {
    //       lifecycleRules: [
    //         {
    //           expiration: Duration.days(5),
    //         },
    //       ],
    //     });
    const myBucket = new Bucket(this, "someBucket", {
      lifecycleRules: [
        {
          expiration: Duration.days(duration.valueAsNumber), // 숫자 직접 입력대신 변수로
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

    new ec2.Instance(this, "myInstance", {
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T2, // instance Type 설정
        ec2.InstanceSize.MICRO // T2.MICRO로 설정함
      ),
      machineImage: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2, //
        edition: ec2.AmazonLinuxEdition.STANDARD,
        virtualization: ec2.AmazonLinuxVirt.HVM,
        storage: ec2.AmazonLinuxStorage.GENERAL_PURPOSE,
      }),

      vpc: ec2.Vpc.fromLookup(this, "vpc", {
        isDefault: true,
      }),
    });

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkPracQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
