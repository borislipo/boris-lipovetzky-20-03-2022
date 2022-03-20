export const autoCompleteData = [
    {
        "Version": 1,
        "Key": "182536",
        "Type": "City",
        "Rank": 10,
        "LocalizedName": "Athens",
        "Country": {
            "ID": "GR",
            "LocalizedName": "Greece"
        },
        "AdministrativeArea": {
            "ID": "I",
            "LocalizedName": "Attica"
        }
    },
    {
        "Version": 1,
        "Key": "316938",
        "Type": "City",
        "Rank": 10,
        "LocalizedName": "Ankara",
        "Country": {
            "ID": "TR",
            "LocalizedName": "Turkey"
        },
        "AdministrativeArea": {
            "ID": "06",
            "LocalizedName": "Ankara"
        }
    },
    {
        "Version": 1,
        "Key": "126995",
        "Type": "City",
        "Rank": 11,
        "LocalizedName": "Alexandria",
        "Country": {
            "ID": "EG",
            "LocalizedName": "Egypt"
        },
        "AdministrativeArea": {
            "ID": "ALX",
            "LocalizedName": "Alexandria"
        }
    },
    {
        "Version": 1,
        "Key": "56912",
        "Type": "City",
        "Rank": 13,
        "LocalizedName": "Anqing",
        "Country": {
            "ID": "CN",
            "LocalizedName": "China"
        },
        "AdministrativeArea": {
            "ID": "AH",
            "LocalizedName": "Anhui"
        }
    },
    {
        "Version": 1,
        "Key": "59083",
        "Type": "City",
        "Rank": 15,
        "LocalizedName": "Anyang",
        "Country": {
            "ID": "CN",
            "LocalizedName": "China"
        },
        "AdministrativeArea": {
            "ID": "HA",
            "LocalizedName": "Henan"
        }
    },
    {
        "Version": 1,
        "Key": "102138",
        "Type": "City",
        "Rank": 15,
        "LocalizedName": "Anshan",
        "Country": {
            "ID": "CN",
            "LocalizedName": "China"
        },
        "AdministrativeArea": {
            "ID": "LN",
            "LocalizedName": "Liaoning"
        }
    },
    {
        "Version": 1,
        "Key": "202438",
        "Type": "City",
        "Rank": 15,
        "LocalizedName": "Ahmedabad",
        "Country": {
            "ID": "IN",
            "LocalizedName": "India"
        },
        "AdministrativeArea": {
            "ID": "GJ",
            "LocalizedName": "Gujarat"
        }
    },
    {
        "Version": 1,
        "Key": "2093",
        "Type": "City",
        "Rank": 20,
        "LocalizedName": "Algiers",
        "Country": {
            "ID": "DZ",
            "LocalizedName": "Algeria"
        },
        "AdministrativeArea": {
            "ID": "16",
            "LocalizedName": "Alger"
        }
    },
    {
        "Version": 1,
        "Key": "126831",
        "Type": "City",
        "Rank": 20,
        "LocalizedName": "Addis Ababa",
        "Country": {
            "ID": "ET",
            "LocalizedName": "Ethiopia"
        },
        "AdministrativeArea": {
            "ID": "AA",
            "LocalizedName": "Addis Ababa"
        }
    },
    {
        "Version": 1,
        "Key": "178551",
        "Type": "City",
        "Rank": 20,
        "LocalizedName": "Accra",
        "Country": {
            "ID": "GH",
            "LocalizedName": "Ghana"
        },
        "AdministrativeArea": {
            "ID": "AA",
            "LocalizedName": "Greater Accra"
        }
    }
]


export const currentWeatherData = [
    {
        "LocalObservationDateTime": "2022-03-20T16:48:00+02:00",
        "EpochTime": 1647787680,
        "WeatherText": "Cloudy",
        "WeatherIcon": 7,
        "HasPrecipitation": false,
        "PrecipitationType": null,
        "IsDayTime": true,
        "Temperature": {
            "Metric": {
                "Value": 5.0,
                "Unit": "C",
                "UnitType": 17
            },
            "Imperial": {
                "Value": 41.0,
                "Unit": "F",
                "UnitType": 18
            }
        },
        "MobileLink": "http://www.accuweather.com/en/gr/athens/182536/current-weather/182536?lang=en-us",
        "Link": "http://www.accuweather.com/en/gr/athens/182536/current-weather/182536?lang=en-us"
    }
]

export const fiveDayForecastData = {
    "Headline": {
        "EffectiveDate": "2022-03-23T19:00:00+03:00",
        "EffectiveEpochDate": 1648051200,
        "Severity": 4,
        "Text": "A cm or two of snow Wednesday evening",
        "Category": "snow",
        "EndDate": "2022-03-24T01:00:00+03:00",
        "EndEpochDate": 1648072800,
        "MobileLink": "http://www.accuweather.com/en/tr/ankara/316938/daily-weather-forecast/316938?unit=c&lang=en-us",
        "Link": "http://www.accuweather.com/en/tr/ankara/316938/daily-weather-forecast/316938?unit=c&lang=en-us"
    },
    "DailyForecasts": [
        {
            "Date": "2022-03-20T07:00:00+03:00",
            "EpochDate": 1647748800,
            "Temperature": {
                "Minimum": {
                    "Value": -6.6,
                    "Unit": "C",
                    "UnitType": 17
                },
                "Maximum": {
                    "Value": 5.2,
                    "Unit": "C",
                    "UnitType": 17
                }
            },
            "Day": {
                "Icon": 20,
                "IconPhrase": "Mostly cloudy w/ flurries",
                "HasPrecipitation": true,
                "PrecipitationType": "Snow",
                "PrecipitationIntensity": "Light"
            },
            "Night": {
                "Icon": 33,
                "IconPhrase": "Clear",
                "HasPrecipitation": false
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/tr/ankara/316938/daily-weather-forecast/316938?day=1&unit=c&lang=en-us",
            "Link": "http://www.accuweather.com/en/tr/ankara/316938/daily-weather-forecast/316938?day=1&unit=c&lang=en-us"
        },
        {
            "Date": "2022-03-21T07:00:00+03:00",
            "EpochDate": 1647835200,
            "Temperature": {
                "Minimum": {
                    "Value": -3.3,
                    "Unit": "C",
                    "UnitType": 17
                },
                "Maximum": {
                    "Value": 5.2,
                    "Unit": "C",
                    "UnitType": 17
                }
            },
            "Day": {
                "Icon": 13,
                "IconPhrase": "Mostly cloudy w/ showers",
                "HasPrecipitation": true,
                "PrecipitationType": "Rain",
                "PrecipitationIntensity": "Light"
            },
            "Night": {
                "Icon": 38,
                "IconPhrase": "Mostly cloudy",
                "HasPrecipitation": false
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/tr/ankara/316938/daily-weather-forecast/316938?day=2&unit=c&lang=en-us",
            "Link": "http://www.accuweather.com/en/tr/ankara/316938/daily-weather-forecast/316938?day=2&unit=c&lang=en-us"
        },
        {
            "Date": "2022-03-22T07:00:00+03:00",
            "EpochDate": 1647921600,
            "Temperature": {
                "Minimum": {
                    "Value": -0.3,
                    "Unit": "C",
                    "UnitType": 17
                },
                "Maximum": {
                    "Value": 6.0,
                    "Unit": "C",
                    "UnitType": 17
                }
            },
            "Day": {
                "Icon": 8,
                "IconPhrase": "Dreary",
                "HasPrecipitation": false
            },
            "Night": {
                "Icon": 38,
                "IconPhrase": "Mostly cloudy",
                "HasPrecipitation": false
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/tr/ankara/316938/daily-weather-forecast/316938?day=3&unit=c&lang=en-us",
            "Link": "http://www.accuweather.com/en/tr/ankara/316938/daily-weather-forecast/316938?day=3&unit=c&lang=en-us"
        },
        {
            "Date": "2022-03-23T07:00:00+03:00",
            "EpochDate": 1648008000,
            "Temperature": {
                "Minimum": {
                    "Value": -1.2,
                    "Unit": "C",
                    "UnitType": 17
                },
                "Maximum": {
                    "Value": 5.6,
                    "Unit": "C",
                    "UnitType": 17
                }
            },
            "Day": {
                "Icon": 12,
                "IconPhrase": "Showers",
                "HasPrecipitation": true,
                "PrecipitationType": "Rain",
                "PrecipitationIntensity": "Light"
            },
            "Night": {
                "Icon": 19,
                "IconPhrase": "Flurries",
                "HasPrecipitation": true,
                "PrecipitationType": "Snow",
                "PrecipitationIntensity": "Moderate"
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/tr/ankara/316938/daily-weather-forecast/316938?day=4&unit=c&lang=en-us",
            "Link": "http://www.accuweather.com/en/tr/ankara/316938/daily-weather-forecast/316938?day=4&unit=c&lang=en-us"
        },
        {
            "Date": "2022-03-24T07:00:00+03:00",
            "EpochDate": 1648094400,
            "Temperature": {
                "Minimum": {
                    "Value": -3.7,
                    "Unit": "C",
                    "UnitType": 17
                },
                "Maximum": {
                    "Value": 7.1,
                    "Unit": "C",
                    "UnitType": 17
                }
            },
            "Day": {
                "Icon": 7,
                "IconPhrase": "Cloudy",
                "HasPrecipitation": true,
                "PrecipitationType": "Rain",
                "PrecipitationIntensity": "Light"
            },
            "Night": {
                "Icon": 36,
                "IconPhrase": "Intermittent clouds",
                "HasPrecipitation": false
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/tr/ankara/316938/daily-weather-forecast/316938?day=5&unit=c&lang=en-us",
            "Link": "http://www.accuweather.com/en/tr/ankara/316938/daily-weather-forecast/316938?day=5&unit=c&lang=en-us"
        }
    ]
}