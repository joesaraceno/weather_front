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
