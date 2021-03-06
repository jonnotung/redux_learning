const countryUtils = {};

countryUtils.removeEmptyEntries = (data) => {
    const entries = data.data;

    const cleanedEntries = [];
    for (const index in entries) {
        
        if(entries[index].Id) {
            cleanedEntries.push(entries[index]);
        }
    }
    return cleanedEntries;
}


//expects output of parser - object with key Country
//returns an object with keys = country names, values = # of people
countryUtils.isolateCountries = (data) => {
    
    const countries = {};

    for(const index in data) {
        let currCountry = data[index].Country;

        if (! (currCountry in countries)) {
            countries[currCountry] = 1;
        } else {
            countries[currCountry] = countries[currCountry] + 1;
        }
    }
    return countries;
};

countryUtils.getCountryNames = (data) => {
    const countryNames = [];

    for(let country in data) {
        if (country !== "undefined" && !countryNames.includes(country)) {
            countryNames.push(country);
        }
    }
    return countryNames;
}

//expects an object with keys = country names, values = # of people
//returns an array of objects of form country name: # of people
countryUtils.toArray = (data) => {
    const countries = [];

    for (let country in data) {
        
        const currentCountry = {
            name: country,
            count: data[country]
        }
        countries.push(currentCountry);
        
    }
    return countries;
}

//expects an object with keys = country names, values = count of people from file
countryUtils.getDistribution = (data) => {
    const dist = {};

    for(let country in data) {
        const thisCount = data[country];
        if(! (thisCount in dist)) {
            dist[thisCount] = 1;
        } else {
            dist[thisCount] = dist[thisCount] + 1;
        }
    }
    
    return dist;
}

//expects an array of objects with keys name and count
countryUtils.getTen = (dataArray) => {
    const arrayCopy = [...dataArray].sort( (a, b) => {
        return b.count - a.count;
    } );
    return [arrayCopy.slice(0, 10), arrayCopy.slice(arrayCopy.length - 10, arrayCopy.length)];
}

countryUtils.countGender = (data, selection) => {
    const countries = [
        {gender: "Female", count: 0},
        {gender: "Male", count: 0}
    ];

    let totalPeople = 0;

    for(const row of data) {
        if (row.Id && (selection === "all countries" || row.Country === selection)) {
            totalPeople++;
            if(row.Gender === "Female") {
                countries[0].count = countries[0].count + 1;
            } else {
                countries[1].count = countries[1].count + 1;
            }
            
        }
    }

    countries[0].count = countries[0].count / totalPeople;
    countries[1].count = countries[1].count / totalPeople;
    countries.push(totalPeople);

    return countries;
}

countryUtils.isolateCarMake = (data, selection) => {
    const cars= {};

    for (const row of data) {
        if(row.Id && (selection === "all countries" || row.Country === selection)) {
            let currCar = row["Car Make"];
            
            if (!(currCar in cars)) {
                cars[currCar] = 1;
            } else {
                cars[currCar] = cars[currCar] + 1;
            }
        }
    }
    
    const carArr = countryUtils.toArray(cars).sort((a, b) => {
        return b.count - a.count;
    });

    return carArr.slice(0, 10);
}

export default countryUtils;