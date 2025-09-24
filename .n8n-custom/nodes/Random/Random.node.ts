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
		icon: 'file:icon.svg',
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
			try {
				const min = this.getNodeParameter('min', i) as number;
				const max = this.getNodeParameter('max', i) as number;

				// validação de parâmetros
				if (min > max) {
					throw new Error('Minimum value cannot be greater than the maximum value.');
				}

				if (min === max) {
					// o requisito do desafio especifica um intervalo inclusivo, o que torna [X, X] um caso válido que deve retornar X.
					// por isso, é necessário contornar a API externa neste caso.
					returnData.push({
						json: {
							randomNumber: min,
						},
					});

					continue;
				}

				const options: IHttpRequestOptions = {
					method: 'GET',
					url: `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`,
					json: false,
				};

				const response = await this.helpers.httpRequest(options);
				const randomNumber = parseInt(response as string, 10);

				if (isNaN(randomNumber)) {
					throw new Error(`The API returned an invalid response: ${response}`);
				}

				returnData.push({
					json: {
						randomNumber: randomNumber,
					},
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: error.message },
						pairedItem: { item: i },
					});
				} else {
					throw error;
				}
			}
		}
		return [returnData];
	}
}
