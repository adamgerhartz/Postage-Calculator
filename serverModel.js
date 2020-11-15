import postage from './data.js';

export default class ServerModel {
	calculateRate(data) {
		const weight = data.weight;
		const type = data.type;
		const rate = postage[data.type][data.weight];
		if (rate === undefined) {
			return 'Error: Something went wrong';
		}
		return rate;
	}
}