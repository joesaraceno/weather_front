const serverUrl = 'api.thingspeak.com';
const channelId = '288483';

// https://api.thingspeak.com/channels/288483/fields/1.json?results=5


export async function getTemperatureFeeds () {
  try {
    const readings = await fetch(`https://${serverUrl}/channels/${channelId}/fields/1.json?results=5`);
    return await readings.json();
  } catch (err) {
    return new Error(err);
  }
}