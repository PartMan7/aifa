let EVs = {
	"P1": {
		"source": "V1",
		"destination": "V8",
		"init_battery": 5,
		"charging": 2,
		"discharging": 3,
		"max": 100,
		"speed": 12
	},
	"P2": {
		"source": "V2",
		"destination": "V8",
		"init_battery": 20,
		"charging": 10,
		"discharging": 11,
		"max": 200,
		"speed": 20
	},
	"P3": {
		"source": "V3",
		"destination": "V6",
		"init_battery": 4,
		"charging": 1,
		"discharging": 2,
		"max": 120,
		"speed": 15
	},
	"P4": {
		"source": "V4",
		"destination": "V1",
		"init_battery": 4,
		"charging": 2,
		"discharging": 3,
		"max": 100,
		"speed": 12
	}
}

const graph = {
	V1: { V2: 8, V4: 4, V5: 10 },
	V2: { V1: 8, V3: 4 },
	V3: { V2: 4, V4: 7, V7: 6 },
	V4: { V1: 4, V3: 7, V5: 8, V7: 6 },
	V5: { V1: 10, V4: 8, V6: 5 },
	V6: { V5: 5, V7: 1, V8: 2 },
	V7: { V3: 6, V4: 6, V6: 1, V8: 5 },
	V8: { V6: 2, V7: 5 }
}

const cities = Object.keys(graph), largeNum = 10000000;

let h;

function heuristic(vehicles) {

	// This heuristic function simply solves the case when the constraint of charging only one car per
	// station is removed. It uses Dijkstra's algorithm to find the minimum time in this case, 
	// since with the constraint removed, every car's optimal path can be calculated independently.
	// The heuristic value is simply the maximum of the optimal times for each car.

	return vehicles.map(car => {
		let EV = EVs[car];
		const maxDist = EV.max / EV.discharging;

		// Start Dijkstra
		const distances = {}, parents = {}, iterate = [];
		cities.forEach(city => {
			distances[city] = largeNum;
			iterate.push(city);
		});
		distances[EV.source] = 0;
		parents[EV.source] = null;
		while (iterate.length) {
			let min = largeNum, minCity = null;
			iterate.forEach(city => {
				let dist = distances[city];
				if (dist < min) {
					min = dist;
					minCity = city;
				}
			});
			iterate.splice(iterate.indexOf(minCity), 1);
			Object.keys(graph[minCity]).forEach(nCity => {
				if (graph[minCity][nCity] > maxDist) return; // Ignore edges that are too long
				let upd = min + graph[minCity][nCity];
				if (upd < distances[nCity]) {
					distances[nCity] = upd;
					parents[nCity] = minCity;
				}
			});
		}
		let chain = [EV.destination]; // Get Dijkstra's optimal path
		while (parents[chain[0]]) chain.unshift(parents[chain[0]]);
		let time = 0;
		time += distances[EV.destination] / EV.speed; // Transport time
		let requiredBattery = distances[EV.destination] * EV.discharging - EV.init_battery;
		time += requiredBattery / EV.charging; // Required charging time
		// console.log(`Car ${car} [${EV.source} - ${EV.destination}]:`
		// + ` Path: ${chain.join(', ')} in ${time}`); // Logging

		return time;
	}).reduce((a, b) => a < b ? b : a, 0);
}

const _init = Date.now(), _iterations = 10000;

for (let i = 0; i < _iterations; i++) h = heuristic(Object.keys(EVs));

console.log(h, (Date.now() - _init), (Date.now() - _init) / _iterations);
