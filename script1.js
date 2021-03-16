const largeNum = 10000000;


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

let graph = {
    "V1": {
        "V2": 8,
        "V4": 4,
        "V5": 10
    },
    "V2": {
        "V1": 8,
        "V3": 4
    },
    "V3": {
        "V2": 4,
        "V4": 7,
        "V7": 6
    },
    "V4": {
        "V1": 4,
        "V3": 7,
        "V5": 8,
        "V7": 6
    },
    "V5": {
        "V1": 10,
        "V4": 7,
        "V6": 5
    },
    "V6": {
        "V5": 5,
        "V7": 1,
        "V8": 2
    },
    "V7": {
        "V3": 1,
        "V4": 4,
        "V6": 3,
        "V8": 5
    },
    "V8": {
        "V6": 2,
        "V7": 5
    }
}

let cars = Object.keys(EVs);

const cities = Object.keys(graph);

cars.forEach(car => {
    let EV = EVs[car];
    const maxDist = EV.max / EV.discharging;

    // start Dijkstra
    const distances = {}, parents = {};
    const iterate = [];
    cities.forEach(city => {
        distances[city] = largeNum;
        if (city !== EV.source) iterate.push(city);
    });
    distances[EV.source] = 0;
    parents[EV.source] = null;
    Object.keys(graph[EV.source]).forEach(nCity => {
        distances[nCity] = graph[EV.source][nCity];
        parents[nCity] = EV.source;
    });
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
            if (graph[minCity][nCity] > maxDist) return;
            let upd = min + graph[minCity][nCity];
            if (upd < distances[nCity]) {
                distances[nCity] = upd;
                parents[nCity] = minCity;
            }
        });
    }
    let chain = [EV.destination];
    while (parents[chain[0]]) chain.unshift(parents[chain[0]]);
    let time = 0;
    time += distances[EV.destination] / EV.speed;
    let requiredBattery = distances[EV.destination] * EV.discharging - EV.init_battery;
    time += requiredBattery / EV.charging;

    console.log(`Car ${car} [${EV.source} - ${EV.destination}]: Path: ${chain.join(', ')} in ${time}`);
});