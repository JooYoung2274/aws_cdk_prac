#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CdkPracStack } from "../lib/cdk-prac-stack";

const app = new cdk.App();
new CdkPracStack(app, "CdkPracStack", {});
