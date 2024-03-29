import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Stack } from 'aws-cdk-lib';

// dynamodb table 생성
export class GenericTable {
    private name: string;
    private primaryKey: string;
    private stack: Stack;
    private table: Table;

    public constructor(name: string, primaryKey: string, stack: Stack) {
        this.name = name;
        this.primaryKey = primaryKey;
        this.stack = stack;
        this.initialize();
    }

    private initialize() {
        this.createTable();
    }
    private createTable() {
        this.table = new Table(this.stack, this.name, {
            partitionKey: {
                name: this.primaryKey,
                type: AttributeType.STRING,
            },
            tableName: this.name,
        });
    }
}
