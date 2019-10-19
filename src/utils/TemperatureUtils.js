const serverUrl = 'api.thingspeak.com';
const channelId = '288483';

export async function getTemperatureFeeds () {
  try {
    const readings = await fetch(`https://${serverUrl}/channels/${channelId}/fields/1.json?results=6&metadata=true`);
    return await readings.json();
  } catch (err) {
    return new Error(err);
  }
}

export function determineColor(temp) {
  switch(true) {
    case (temp < 20): 
      return 'white';
    case (temp < 40):
      return 'blue';
    case (temp < 60): 
      return 'purple';
    case (temp < 70):
      return 'green';
    case (temp < 80):
      return 'yellow';
    case (temp < 90):
      return 'orange';
    case (temp < 100): 
      return 'orange';
    default:
      return 'red';
  }
};

export function determineChartColor (temp) {
  const color = determineColor(temp);
  switch(color) {
    case ('white'):
      return '#D6D6D6';
    case ('blue'):
      return '#6262FF';
    case ('purple'):
      return '#80006B';
    case ('green'):
      return '#58A758';
    case ('yellow'):
      return '#FFBA00';
    case ('orange'):
      return '#FF7B00';
    case ('red'):
      return '#CE3131';
    default:
      throw new Error("no color defined")
  }
}
