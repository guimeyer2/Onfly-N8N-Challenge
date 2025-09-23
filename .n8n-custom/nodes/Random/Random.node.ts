import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestOptions,
} from 'n8n-workflow';

export class Random implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Random',
		name: 'random',
		icon: 'fa:dice', // adicionar ícone
		group: ['transform'],
		version: 1,
		description: 'Generates a true random number using random.org API',
		defaults: {
			name: 'Random',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'True Random Number Generator',
						value: 'generate',
						action: 'Generate a true random number',
					},
				],
				default: 'generate',
			},
			{
				displayName: 'Minimum Value',
				name: 'min',
				type: 'number',
				default: 1,
				required: true,
				displayOptions: {
					show: {
						operation: ['generate'],
					},
				},
				description: 'The minimum possible value (inclusive)',
			},
			{
				displayName: 'Maximum Value',
				name: 'max',
				type: 'number',
				default: 100,
				required: true,
				displayOptions: {
					show: {
						operation: ['generate'],
					},
				},
				description: 'The maximum possible value (inclusive)',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const min = this.getNodeParameter('min', i) as number;
			const max = this.getNodeParameter('max', i) as number;

			const options: IHttpRequestOptions = {
				method: 'GET',
				url: `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`,
				json: false,
			};

			const response = await this.helpers.httpRequest(options);
			const randomNumber = parseInt(response as string, 10);

			returnData.push({
				json: {
					randomNumber: randomNumber,
				},
			});
		}
		return [returnData];
	}
}
