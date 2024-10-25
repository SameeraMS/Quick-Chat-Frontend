import { getChannelsByUser } from '../services/channelService';

const checkIsChannelExist = async (userId: string, otherId: string): Promise<string> => {
  try {
    // Fetch channels from the service
    const response = await getChannelsByUser(userId);

    // Ensure the response and channels are valid
    if (!response || !Array.isArray(response.channels)) {
      console.error("Invalid channels data:", response);
      return ''; // Return empty string or handle accordingly
    }

    const { channels } = response; // Destructure the channels array
    let channelId = '';

    // Iterate through channels to find the matching one
    for (let i = 0; i < channels.length; i++) {
      const channel = channels[i];

      // Ensure the channel has participants and they are in the expected format
      if (Array.isArray(channel.participants)) {
        // Check if otherId is a participant and the channel has exactly 2 participants
        if (channel.participants.includes(otherId) &&
            channel.participants.length === 2 &&
            !channel.name) {
          channelId = channel.id; // Store the found channel ID
          break; // Exit loop once a matching channel is found
        }
      } else {
        console.error("Invalid participants data for channel:", channel);
      }
    }

    return channelId; // Return the found channel ID or an empty string if not found
  } catch (error) {
    console.error("Error fetching channels:", error);
    return ''; // Handle error and return empty string or null
  }
};

export default checkIsChannelExist;
