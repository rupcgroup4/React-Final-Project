export const graph = {
  nodes: {
    BKK: {
      id: 'BKK',
      label: 'Bangkok',
      coords: [13.693062, 100.752044],
      destination: [],
    },
    ZRH: {
      id: 'ZRH',
      label: 'Zurich',
      coords: [47.450604, 8.561746],
    },
    DEN: {
      id: 'DEN',
      label: 'Denver',
      coords: [39.851382, -104.673098],
    },
    ORY: {
      id: 'ORY',
      label: 'Paris',
      coords: [48.728283, 2.3597],
    },
    PHL: {
      id: 'PHL',
      label: 'Philadelphia',
      coords: [39.876413, -75.243305],
    },
    SHA: {
      id: 'SHA',
      label: 'Shanghai',
      coords: [31.19779, 121.333473],
    },
    DFW: {
      id: 'DFW',
      label: 'Dallas',
      coords: [32.897462, -97.036128],
    },
    LGW: {
      id: 'LGW',
      label: 'London',
      coords: [51.150836, -0.177416],
    },
    SFO: {
      id: 'SFO',
      label: 'San Francisco',
      coords: [37.615215, -122.389881],
    },
    MNL: {
      id: 'MNL',
      label: 'Manila',
      coords: [14.511205, 121.019208],
    },
    MAN: {
      id: 'MAN',
      label: 'Manchester',
      coords: [53.362908, -2.273354],
    },
    LGA: {
      id: 'LGA',
      label: 'New York',
      coords: [40.774252, -73.871617],
    },
    OSL: {
      id: 'OSL',
      label: 'Oslo',
      coords: [60.194192, 11.100411],
    },
    XMN: {
      id: 'XMN',
      label: 'Xiamen',
      coords: [24.543064, 118.134178],
    },
    SZX: {
      id: 'SZX',
      label: 'Shenzhen',
      coords: [22.639444, 113.810833],
    },
    AMS: {
      id: 'AMS',
      label: 'Amsterdam',
      coords: [52.309069, 4.763385],
    },
  },
  edges: [
    {
      from: 'BKK',
      to: 'ZRH',
      departureTime: '2022-11-25T13:20:00.000',
      arrivalTime: '2022-11-25T19:25:00.000',
    },
    {
      from: 'BKK',
      to: 'MNL',
      departureTime: '2022-11-25T15:15:00.000',
      arrivalTime: '2022-11-25T19:30:00.000',
    },
    {
      from: 'BKK',
      to: 'SZX',
      departureTime: '2022-11-25T12:55:00.000',
      arrivalTime: '2022-11-25T16:40:00.000',
    },
    {
      from: 'BKK',
      to: 'AMS',
      departureTime: '2022-11-25T00:40:00.000',
      arrivalTime: '2022-11-25T07:15:00.000',
    },
    {
      from: 'ZRH',
      to: 'BKK',
      departureTime: '2022-11-25T13:15:00.000',
      arrivalTime: '2022-11-26T06:10:00.000',
    },
    {
      from: 'ZRH',
      to: 'PHL',
      departureTime: '2022-11-25T10:15:00.000',
      arrivalTime: '2022-11-25T13:06:00.000',
    },
    {
      from: 'ZRH',
      to: 'LGW',
      departureTime: '2022-11-25T19:55:00.000',
      arrivalTime: '2022-11-25T20:35:00.000',
    },
    {
      from: 'ZRH',
      to: 'SFO',
      departureTime: '2022-11-25T13:15:00.000',
      arrivalTime: '2022-11-25T16:15:00.000',
    },
    {
      from: 'ZRH',
      to: 'MAN',
      departureTime: '2022-11-25T17:10:00.000',
      arrivalTime: '2022-11-25T18:05:00.000',
    },
    {
      from: 'ZRH',
      to: 'OSL',
      departureTime: '2022-11-25T17:15:00.000',
      arrivalTime: '2022-11-25T19:40:00.000',
    },
    {
      from: 'ZRH',
      to: 'AMS',
      departureTime: '2022-11-25T06:55:00.000',
      arrivalTime: '2022-11-25T08:45:00.000',
    },
    {
      from: 'DEN',
      to: 'PHL',
      departureTime: '2022-11-25T23:59:00.000',
      arrivalTime: '2022-11-26T05:24:00.000',
    },
    {
      from: 'DEN',
      to: 'DFW',
      departureTime: '2022-11-25T06:00:00.000',
      arrivalTime: '2022-11-25T08:57:00.000',
    },
    {
      from: 'DEN',
      to: 'SFO',
      departureTime: '2022-11-25T09:45:00.000',
      arrivalTime: '2022-11-25T11:33:00.000',
    },
    {
      from: 'DEN',
      to: 'LGA',
      departureTime: '2022-11-25T11:21:00.000',
      arrivalTime: '2022-11-25T17:00:00.000',
    },
    {
      from: 'ORY',
      to: 'LGW',
      departureTime: '2022-11-25T19:35:00.000',
      arrivalTime: '2022-11-25T19:40:00.000',
    },
    {
      from: 'ORY',
      to: 'SFO',
      departureTime: '2022-11-25T17:50:00.000',
      arrivalTime: '2022-11-25T20:10:00.000',
    },
    {
      from: 'PHL',
      to: 'ZRH',
      departureTime: '2022-11-25T18:40:00.000',
      arrivalTime: '2022-11-26T08:15:00.000',
    },
    {
      from: 'PHL',
      to: 'DEN',
      departureTime: '2022-11-25T10:40:00.000',
      arrivalTime: '2022-11-25T12:57:00.000',
    },
    {
      from: 'PHL',
      to: 'DFW',
      departureTime: '2022-11-25T06:50:00.000',
      arrivalTime: '2022-11-25T09:32:00.000',
    },
    {
      from: 'PHL',
      to: 'SFO',
      departureTime: '2022-11-25T08:26:00.000',
      arrivalTime: '2022-11-25T11:57:00.000',
    },
    {
      from: 'PHL',
      to: 'AMS',
      departureTime: '2022-11-25T21:23:00.000',
      arrivalTime: '2022-11-26T10:40:00.000',
    },
    {
      from: 'SHA',
      to: 'XMN',
      departureTime: '2022-11-25T13:50:00.000',
      arrivalTime: '2022-11-25T15:50:00.000',
    },
    {
      from: 'SHA',
      to: 'SZX',
      departureTime: '2022-11-25T11:30:00.000',
      arrivalTime: '2022-11-25T14:00:00.000',
    },
    {
      from: 'DFW',
      to: 'DEN',
      departureTime: '2022-11-25T21:13:00.000',
      arrivalTime: '2022-11-25T22:17:00.000',
    },
    {
      from: 'DFW',
      to: 'PHL',
      departureTime: '2022-11-25T16:30:00.000',
      arrivalTime: '2022-11-25T20:39:00.000',
    },
    {
      from: 'DFW',
      to: 'SFO',
      departureTime: '2022-11-25T07:30:00.000',
      arrivalTime: '2022-11-25T09:30:00.000',
    },
    {
      from: 'DFW',
      to: 'LGA',
      departureTime: '2022-11-25T16:41:00.000',
      arrivalTime: '2022-11-25T21:00:00.000',
    },
    {
      from: 'LGW',
      to: 'ZRH',
      departureTime: '2022-11-25T07:10:00.000',
      arrivalTime: '2022-11-25T09:55:00.000',
    },
    {
      from: 'LGW',
      to: 'ORY',
      departureTime: '2022-11-25T13:15:00.000',
      arrivalTime: '2022-11-25T15:25:00.000',
    },
    {
      from: 'LGW',
      to: 'OSL',
      departureTime: '2022-11-25T17:40:00.000',
      arrivalTime: '2022-11-25T20:50:00.000',
    },
    {
      from: 'LGW',
      to: 'AMS',
      departureTime: '2022-11-25T18:25:00.000',
      arrivalTime: '2022-11-25T20:40:00.000',
    },
    {
      from: 'SFO',
      to: 'ZRH',
      departureTime: '2022-11-25T19:50:00.000',
      arrivalTime: '2022-11-26T15:45:00.000',
    },
    {
      from: 'SFO',
      to: 'DEN',
      departureTime: '2022-11-25T11:15:00.000',
      arrivalTime: '2022-11-25T14:50:00.000',
    },
    {
      from: 'SFO',
      to: 'PHL',
      departureTime: '2022-11-25T22:56:00.000',
      arrivalTime: '2022-11-26T07:12:00.000',
    },
    {
      from: 'SFO',
      to: 'DFW',
      departureTime: '2022-11-25T18:25:00.000',
      arrivalTime: '2022-11-25T23:55:00.000',
    },
    {
      from: 'SFO',
      to: 'MNL',
      departureTime: '2022-11-25T21:35:00.000',
      arrivalTime: '2022-11-27T04:40:00.000',
    },
    {
      from: 'SFO',
      to: 'ORY',
      departureTime: '2022-11-25T21:35:00.000',
      arrivalTime: '2022-11-27T04:40:00.000',
    },
    {
      from: 'MNL',
      to: 'BKK',
      departureTime: '2022-11-25T00:10:00.000',
      arrivalTime: '2022-11-25T02:45:00.000',
    },
    {
      from: 'MNL',
      to: 'SFO',
      departureTime: '2022-11-25T22:10:00.000',
      arrivalTime: '2022-11-25T18:35:00.000',
    },
    {
      from: 'MNL',
      to: 'XMN',
      departureTime: '2022-11-25T18:00:00.000',
      arrivalTime: '2022-11-25T20:20:00.000',
    },
    {
      from: 'MAN',
      to: 'ZRH',
      departureTime: '2022-11-25T08:45:00.000',
      arrivalTime: '2022-11-25T11:45:00.000',
    },
    {
      from: 'MAN',
      to: 'OSL',
      departureTime: '2022-11-25T14:55:00.000',
      arrivalTime: '2022-11-25T17:50:00.000',
    },
    {
      from: 'MAN',
      to: 'AMS',
      departureTime: '2022-11-25T18:40:00.000',
      arrivalTime: '2022-11-25T20:55:00.000',
    },
    {
      from: 'LGA',
      to: 'DEN',
      departureTime: '2022-11-25T20:15:00.000',
      arrivalTime: '2022-11-25T22:55:00.000',
    },
    {
      from: 'LGA',
      to: 'DFW',
      departureTime: '2022-11-25T17:45:00.000',
      arrivalTime: '2022-11-25T20:54:00.000',
    },
    {
      from: 'OSL',
      to: 'ZRH',
      departureTime: '2022-11-25T08:15:00.000',
      arrivalTime: '2022-11-25T10:45:00.000',
    },
    {
      from: 'OSL',
      to: 'LGW',
      departureTime: '2022-11-25T13:05:00.000',
      arrivalTime: '2022-11-25T14:35:00.000',
    },
    {
      from: 'OSL',
      to: 'MAN',
      departureTime: '2022-11-25T13:10:00.000',
      arrivalTime: '2022-11-25T14:15:00.000',
    },
    {
      from: 'OSL',
      to: 'AMS',
      departureTime: '2022-11-25T06:30:00.000',
      arrivalTime: '2022-11-25T08:30:00.000',
    },
    {
      from: 'XMN',
      to: 'SHA',
      departureTime: '2022-11-25T11:00:00.000',
      arrivalTime: '2022-11-25T12:50:00.000',
    },
    {
      from: 'XMN',
      to: 'LGW',
      departureTime: '2022-11-25T11:00:00.000',
      arrivalTime: '2022-11-25T12:50:00.000',
    },
    {
      from: 'XMN',
      to: 'MNL',
      departureTime: '2022-11-25T14:30:00.000',
      arrivalTime: '2022-11-25T16:55:00.000',
    },
    {
      from: 'SZX',
      to: 'BKK',
      departureTime: '2022-11-25T09:00:00.000',
      arrivalTime: '2022-11-25T11:00:00.000',
    },
    {
      from: 'SZX',
      to: 'SHA',
      departureTime: '2022-11-25T08:00:00.000',
      arrivalTime: '2022-11-25T10:10:00.000',
    },
    {
      from: 'AMS',
      to: 'BKK',
      departureTime: '2022-11-25T20:25:00.000',
      arrivalTime: '2022-11-26T13:20:00.000',
    },
    {
      from: 'AMS',
      to: 'ZRH',
      departureTime: '2022-11-25T14:55:00.000',
      arrivalTime: '2022-11-25T16:30:00.000',
    },
    {
      from: 'AMS',
      to: 'LGW',
      departureTime: '2022-11-25T21:30:00.000',
      arrivalTime: '2022-11-25T21:45:00.000',
    },
    {
      from: 'AMS',
      to: 'MAN',
      departureTime: '2022-11-25T16:20:00.000',
      arrivalTime: '2022-11-25T16:35:00.000',
    },
    {
      from: 'AMS',
      to: 'OSL',
      departureTime: '2022-11-25T20:20:00.000',
      arrivalTime: '2022-11-25T22:05:00.000',
    },
  ],
};
