export const SCENARIOS = [
  {
    id: 'flash-flood',
    name: 'Flash Flood Emergency',
    region: 'Valley Catchment Basin 4B',
    severity: 'CAT-4 INUNDATION',
    timeToImpact: '14 MIN',
    accentColor: '#ef4444',
    beaconFreq: '142.85 MHz',
    rawAlert: 'NWS ADVISORY: CRITICAL RUNOFF DETECTED. WATER ELEVATION RISING +4.2FT/HR AT BASIN GAUGE 19.',
    actionable: 'Move to high ground immediately. Avoid road underpasses and bridges.'
  },
  {
    id: 'wildfire',
    name: 'Rapid Wildfire Incursion',
    region: 'North Ridge Sector 9',
    severity: 'EXTREME FIRE PROPAGATION',
    timeToImpact: '8 MIN',
    accentColor: '#f97316',
    beaconFreq: '154.22 MHz',
    rawAlert: 'CAL-FIRE DISPATCH: ACCELERATING FIRELINE 35MPH GUSTS DETECTED. EVACUATION ZONE B ACTIVE.',
    actionable: 'Evacuate West via Highway 101. Close windows, shut gas mains, carry emergency kit.'
  },
  {
    id: 'cyclone',
    name: 'Severe Coastal Cyclone',
    region: 'Eastern Shoreline Grid 02',
    severity: 'CATEGORY 5 HURRICANE',
    timeToImpact: '35 MIN',
    accentColor: '#06b6d4',
    beaconFreq: '162.40 MHz',
    rawAlert: 'MET-OFFICE WARNING: CYCLONIC EYEWALL APPROACHING WITH SUSTAINED GUSTS 135KT.',
    actionable: 'Take shelter in an interior room on the lowest floor away from glass.'
  }
];
