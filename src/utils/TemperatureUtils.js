const serverUrl = 'api.thingspeak.com';
const channelId = '288483';

export async function getTemperatureFeeds () {
  try {
    const readings = await fetch(`https://${serverUrl}/channels/${channelId}/fields/1.json?results=6`);
    return await readings.json();
  } catch (err) {
    return new Error(err);
  }
}