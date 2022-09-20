#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { SpaceStack } from '../lib/cdk-stack';

const app = new cdk.App();
new SpaceStack(app, 'Space-finder', {
    stackName: 'SpaceFinder',
});
